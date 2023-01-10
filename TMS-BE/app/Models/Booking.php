<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * Class Booking
 * @property string customer_name
 * @property string customer_phone
 * @property string pickup_place
 * @property float amount
 * @property string|\DateTimeInterface datetime_start
 * @property string|\DateTimeInterface datetime_end
 * @property integer vehicle_id
 * @property integer created_by
 * @property integer updated_by
 * @property Vehicle vehicle
 * @package App\Models
 */
class Booking extends BaseModel
{
    use HasFactory;

    protected $fillable = [
        'customer_name',
        'customer_phone',
        'pickup_place',
        'amount',
        'datetime_start',
        'datetime_end',
        'vehicle_id',
        'created_by',
        'updated_by',
    ];

    public function vehicle()
    {
        return $this->belongsTo(Vehicle::class, 'vehicle_id');
    }
}
