<?php

namespace App\Http\Requests;

use App\Helper\ResponseHelper;
use App\Helper\RoleHelper;
use App\Models\User;
use App\Models\Vehicle;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Support\Facades\Auth;

class StoreVehicleRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        $vehicleId = $this->route('vehicle');
        /** @var User $user */
        $user = Auth::user();
        $isDriver = $user->getRole() == RoleHelper::ROLE_DRIVER;
        if ($vehicleId && $isDriver) {
            /** @var Vehicle $vehicle */
            $vehicle = Vehicle::query()
                ->where('driver_id', Auth::id())
                ->where('status', '<>',Vehicle::STATUS_ACTIVE)
                ->find($vehicleId)
                ->first()
            ;
            return $vehicle != null;
        }

        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return $rules = [
            'brand' => 'required|string|max:255',
            'type' => 'required|string|max:255',
            'type_of_fuel' => 'required|string|max:255',
            'weight' => 'required|numeric|min:0',
            'driver_id' => 'numeric|exists:users,id',
            'car_number' => 'required|string|max:255',
            'document_id' => 'string|max:255',
            'date_expire' => 'required|date_format:Y-m-d',
            'date_registration' => 'required|date_format:Y-m-d',
            'year_manufacture' => 'required|date_format:Y',
        ];
    }


    protected function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(
            ResponseHelper::error($validator->getMessageBag()->first(), 400)
        );
    }
}
