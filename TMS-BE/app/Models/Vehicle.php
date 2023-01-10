<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * Class Vehicle
 * @property string brand
 * @property string type
 * @property string car_number
 * @property float weight
 * @property string type_of_fuel
 * @property string status
 * @property integer created_by
 * @property integer updated_by
 * @property integer driver_id
 * @property string status_active_at
 * @property integer status_active_by
 * @property integer book_by
 * @property string book_at
 * @property string|\DateTimeInterface last_booking_end_time
 * @property integer current_booking_id
 * @property Booking currentBooking
 * @property Booking[] historyBooking
 * @property VehicleRegistry vehicleRegistry
 * @property string document_id
 * @property string|\DateTimeInterface date_registration
 * @property string|\DateTimeInterface date_expire
 * @property string year_manufacture
 * @package App\Models
 */
class Vehicle extends BaseModel
{
    use HasFactory, SoftDeletes;

    const STATUS_ACTIVE = 'AC';
    const STATUS_INACTIVE = 'IA';
    const STATUS_PENDING = 'PE';

    const STATUS_BOOKING_AVAILABLE = 'Available';
    const STATUS_BOOKING_RETURN = 'Return';
    const STATUS_BOOKING_BOOKED = 'Booked';

    const ALLOW_STATUS = [
        self::STATUS_ACTIVE,
        self::STATUS_INACTIVE,
        self::STATUS_PENDING,
    ];

    protected $fillable = [
        'brand',
        'type',
        'car_number',
        'weight',
        'type_of_fuel',
        'status',
        'created_by',
        'updated_by',
        'driver_id',
        'status_active_at',
        'status_active_by',
        'book_by',
        'book_at',
        'current_booking_id',
        'last_booking_end_time',
        'date_registration',
        'date_expire',
        'year_manufacture',
        'document_id'
    ];

    protected $dates = ['deleted_at'];

    public function driver()
    {
        return $this->belongsTo(User::class, 'driver_id');
    }

    public function userBooked()
    {
        return $this->belongsTo(User::class, 'book_by');
    }

    public function currentBooking()
    {
        return $this->belongsTo(Booking::class, 'current_booking_id');
    }

    public function historyBooking()
    {
        return $this->hasMany(Booking::class, 'vehicle_id');
    }

    public function vehicleRegistry()
    {
        return $this->hasOne(VehicleRegistry::class, 'id', 'vehicle_registry_id');
    }

    public function getBookingStatus()
    {
        if ($this->current_booking_id) {
            return static::STATUS_BOOKING_BOOKED;
        }
        $now = Carbon::now()->getTimestamp();
        if ($this->last_booking_end_time instanceof \DateTimeInterface) {
            $endTime = $this->last_booking_end_time->getTimestamp();
        } else {
            $endTime = strtotime($this->last_booking_end_time);
        }
        $returnTime = $endTime + 60 * 60 * 12;
        return $now <= $returnTime ? static::STATUS_BOOKING_RETURN : static::STATUS_BOOKING_AVAILABLE;
    }
}
