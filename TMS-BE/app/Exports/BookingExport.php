<?php

namespace App\Exports;

use App\Models\Booking;
use Illuminate\Support\Facades\DB;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;
use Maatwebsite\Excel\Concerns\WithHeadings;

class BookingExport implements FromCollection, WithHeadings, ShouldAutoSize
{
    protected $dateFrom;
    protected $dateTo;

    public function __construct($dateFrom, $dateTo)
    {
        $this->dateFrom = $dateFrom;
        $this->dateTo = $dateTo;
    }

    /**
    * @return \Illuminate\Support\Collection
    */
    public function collection()
    {
        $query = DB::table('bookings')
            ->join('vehicles', 'bookings.vehicle_id', '=', 'vehicles.id')
            ->join('users', 'users.id', '=', 'vehicles.driver_id')
            ->whereBetween('bookings.created_at', [
                $this->dateFrom.' 00:00:00',
                $this->dateTo.' 23:59:59'
            ])
            ->select([
                'vehicles.brand',
                'vehicles.car_number',
                'vehicles.type',
                'vehicles.weight',
                'vehicles.type_of_fuel',
                DB::raw(sprintf("concat(%s, %s)", 'users.first_name', 'users.last_name')),
                'bookings.customer_name',
                'bookings.customer_phone',
                'bookings.pickup_place',
                'bookings.datetime_start',
                'bookings.datetime_end',
            ])
        ;

        return $query->get();
    }

    public function headings(): array
    {
        return [
            'Xe - Thương hiệu',
            'Xe - Biển số',
            'Xe - Loại xe',
            'Xe - Trọng tải',
            'Xe - Loại nhiên liệu',
            'Tài xế - Tên',
            'Khách hàng - Tên',
            'Khách hàng - Số Đt',
            'Khách hàng - Địa điểm đón',
            'Chuyến đi - Thời gian đi',
            'Chuyến đi - Thời gian về',
        ];
    }
}
