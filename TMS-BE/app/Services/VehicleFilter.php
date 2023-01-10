<?php
namespace App\Services;


class VehicleFilter extends ApiFilter
{
    protected $params = [
        'type_of_fuel' => ['eq'],
        'type' => ['eq'],
        'brand' => ['eq'],
        'weight' => ['lt', 'gt', 'lte', 'gte', 'eq', 'ne'],
        'status' => ['eq', 'ne'],
        'car_number' => ['eq'],
        'driver_id' => ['eq', 'ne'],
    ];

    protected $columnMap = [
        'driver.id' => 'driver_id'
    ];
}
