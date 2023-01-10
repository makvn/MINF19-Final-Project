<?php
namespace App\Services;


class VehicleSearch extends ApiSearch
{
    protected $allowedColumn = ['car_number', 'brand', 'type', 'type_of_fuel'];
}
