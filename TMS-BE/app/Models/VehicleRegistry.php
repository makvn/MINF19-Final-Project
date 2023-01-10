<?php
namespace App\Models;


use Illuminate\Database\Eloquent\Factories\HasFactory;

/**
 * Class VehicleRegistry
 * @property string chassis_number
 * @property string engine_number
 * @property string date_range
 * @property string issued_by
 * @property string expired_date
 * @property integer vehicle_id
 * @property integer created_by
 * @property integer updated_by
 * @package App\Models
 */
class VehicleRegistry extends BaseModel
{
    use HasFactory;

    protected $table = 'vehicle_registry';

    protected $fillable = [
        'chassis_number',
        'engine_number',
        'date_range',
        'issued_by',
        'expired_date',
        'vehicle_id',
        'created_by',
        'updated_by',
    ];

    public function vehicle()
    {
        return $this->hasOne(Vehicle::class, 'id', 'vehicle_id');
    }
}
