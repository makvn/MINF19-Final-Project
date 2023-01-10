<?php

namespace App\Http\Controllers;

use App\Events\EndBooking;
use App\Events\VehicleBooked;
use App\Helper\RequestHelper;
use App\Helper\ResponseHelper;
use App\Helper\RoleHelper;
use App\Http\Requests\BookVehicleRequest;
use App\Http\Requests\EndBookingRequest;
use App\Http\Requests\SetVehicleRegistryRequest;
use App\Http\Requests\StoreVehicleRequest;
use App\Http\Requests\UpdateStatusVehicleRequest;
use App\Http\Resources\VehicleCollection;
use App\Http\Resources\VehicleResource;
use App\Models\Booking;
use App\Models\User;
use App\Models\Vehicle;
use App\Models\VehicleRegistry;
use App\Services\VehicleFilter;
use App\Services\VehicleSearch;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Swoole\Http\Status;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;

class VehicleController extends Controller
{
    public function __construct()
    {
        $this->middleware(['jwt.auth:api'], ['except' => ['index', 'show']]);
        $this->authorizeResource(Vehicle::class);
    }

    /**
     * Display a listing of the resource.
     * @param $request
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $filter = new VehicleFilter();
        $eloFilter = $filter->transform($request);
        $relation = ['userBooked'];
        $search = new VehicleSearch();
        $eloSearch = $search->transform($request);
        $query = Vehicle::query();
        $mappingRelation = [
            'includeDriver' => 'driver',
            'includeCurrentBooking' => 'currentBooking',
            'includeVehicleRegistry' => 'vehicleRegistry',
        ];
        foreach ($mappingRelation as $requestName => $relationName) {
            if ($request->has($requestName)) {
                $relation[] = $relationName;
            }
        }
        if ($request->has('onlyBooked')) {
            $query->whereNotNull('current_booking_id');
        }

        $query->with($relation);
        if ($eloFilter) {
            $query->where($eloFilter);
        }
        if ($eloSearch) {
            $query->where(function ($q) use ($eloSearch) {
                foreach ($eloSearch as $search) {
                    $q->orWhere($search[0], $search[1], $search[2]);
                }
            });
        }

        $vehicles = $query->paginate(RequestHelper::getPerPage($request));
        return ResponseHelper::success('', new VehicleCollection($vehicles));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create() {}

    /**
     * Store a newly created resource in storage.
     *
     * @param  StoreVehicleRequest $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreVehicleRequest $request)
    {
        $input = $request->all();
        /** @var User $user */
        $user = Auth::user();
        if ($user->getRole() == RoleHelper::ROLE_DRIVER) {
            $input['driver_id'] = Auth::id();
        }
        $input['status'] = Vehicle::STATUS_PENDING;
        $vehicle = Vehicle::create($input);
        return ResponseHelper::success('Created Vehicle Successfully', (new VehicleResource($vehicle)));
    }

    /**
     * Display the specified resource.
     *
     * @param \App\Models\Vehicle $vehicle
     * @param Request $request
     * @return \Illuminate\Http\Response
     */
    public function show(Vehicle $vehicle, Request $request)
    {
        $this->loadAllRelation($vehicle);
        return ResponseHelper::success('', new VehicleResource($vehicle));
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Vehicle  $vehicle
     */
    public function edit(Vehicle $vehicle) {}

    /**
     * Update the specified resource in storage.
     *
     * @param StoreVehicleRequest $request
     * @param \App\Models\Vehicle $vehicle
     * @return \Illuminate\Http\Response
     */
    public function update(StoreVehicleRequest $request, Vehicle $vehicle)
    {
        $input = $request->only([
            'brand',
            'type',
            'car_number',
            'weight',
            'type_of_fuel',
            'date_registration',
            'date_expire',
            'document_id',
            'year_manufacture'
        ]);
        $input['status'] = Vehicle::STATUS_PENDING;
        $vehicle->update($input);
        $this->loadAllRelation($vehicle);
        return ResponseHelper::success('Updated Successfully', (new VehicleResource($vehicle)));
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Vehicle  $vehicle
     * @return \Illuminate\Http\Response
     */
    public function destroy(Vehicle $vehicle)
    {
        if ($vehicle->currentBooking) {
            throw new BadRequestHttpException('Vehicle is on booking, cannot delete.');
        }
        $vehicle->delete();

        return ResponseHelper::success('Deleted Successfully');
    }

    public function book(BookVehicleRequest $request, Vehicle $vehicle)
    {
        if ($vehicle->status != Vehicle::STATUS_ACTIVE) {
            return ResponseHelper::error('Vehicle must be Approved', 400);
        }

        if ($vehicle->getBookingStatus() != Vehicle::STATUS_BOOKING_AVAILABLE) {
            return ResponseHelper::error('Vehicle must be Available', 400);
        }

        $input = $request->only([
            'customer_name',
            'customer_phone',
            'pickup_place',
            'datetime_start',
        ]);

        $input['vehicle_id'] = $vehicle->id;

        try {
            DB::beginTransaction();
            /** @var Booking $booking */
            $booking = Booking::create($input);

            $vehicle->update([
                'book_by' => Auth::id(),
                'book_at' => Carbon::now(),
                'current_booking_id' => $booking->id
            ]);
            DB::commit();
        } catch (\Throwable $exception) {
            DB::rollBack();
            throw $exception;
        }

        VehicleBooked::dispatch($booking);
        $this->loadAllRelation($vehicle);
        return ResponseHelper::success('Book Successfully', new VehicleResource($vehicle));
    }

    public function updateStatus(UpdateStatusVehicleRequest $request, Vehicle $vehicle)
    {
        if ($vehicle->status == Vehicle::STATUS_ACTIVE) {
            return ResponseHelper::error('Vehicle must not be Approved', 400);
        }
        $status = $request->get('status');
        $params = [
            'status' => $status,
        ];
        if ($status == Vehicle::STATUS_ACTIVE) {
            $params['status_active_at'] = Carbon::now();
            $params['status_active_by'] = Auth::id();
        }
        $vehicle->update($params);

        $this->loadAllRelation($vehicle);
        return ResponseHelper::success('Update Status Successfully', new VehicleResource($vehicle));
    }

    public function updateEndBooking(EndBookingRequest $request, Vehicle $vehicle)
    {
        if ($vehicle->status != Vehicle::STATUS_ACTIVE) {
            return ResponseHelper::error('Vehicle must be Approved', 400);
        }

        if ($vehicle->getBookingStatus() != Vehicle::STATUS_BOOKING_BOOKED) {
            return ResponseHelper::error('Vehicle must be Booked', 400);
        }
        try {
            DB::beginTransaction();
            $endTime = Carbon::now();
            $vehicle->currentBooking->update([
                'datetime_end' => $endTime,
                'amount' => $request->get('amount')
            ]);

            $vehicle->update([
                'book_by' => null,
                'book_at' => null,
                'current_booking_id' => null,
                'last_booking_end_time' => $endTime
            ]);
            DB::commit();
        } catch (\Throwable $exception) {
            DB::rollBack();
            throw $exception;
        }

        EndBooking::dispatch($vehicle->currentBooking);
        $this->loadAllRelation($vehicle);
        return ResponseHelper::success('Update Successfully', new VehicleResource($vehicle));
    }

    public function updateRegistry(SetVehicleRegistryRequest $request, Vehicle $vehicle)
    {
        try {
            $input = $request->only(['chassis_number', 'engine_number', 'date_range', 'issued_by', 'expired_date']);
            DB::beginTransaction();
            if (! $vehicle->vehicleRegistry) {
                $vehicleRegistry = VehicleRegistry::create(array_merge(
                    $input, ['vehicle_id' => $vehicle->id]
                ));
                $vehicle->vehicle_registry_id = $vehicleRegistry->id;
                $vehicle->save();
            } else {
                $vehicle->vehicleRegistry->update($input);
            }
            DB::commit();
        } catch (\Throwable $exception) {
            DB::rollBack();
            throw $exception;
        }
        $this->loadAllRelation($vehicle);
        return ResponseHelper::success('Update Successfully', new VehicleResource($vehicle));
    }

    private function loadAllRelation(Vehicle $vehicle)
    {
        $vehicle->load(['userBooked', 'driver', 'currentBooking', 'vehicleRegistry']);
    }
}
