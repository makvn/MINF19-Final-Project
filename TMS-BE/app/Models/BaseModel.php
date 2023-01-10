<?php


namespace App\Models;


use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;

/**
 * Class BaseModel
 * @property integer id
 * @method static create($params)
 * @package App\Models
 */
class BaseModel extends Model
{
    public static function boot()
    {
        parent::boot();

        // create a event to happen on updating
        static::updating(function ($table) {
            if ($table->isFillable('updated_by')) {
                $table->updated_by = Auth::id();
            }
        });

        // create a event to happen on saving
        static::saving(function ($table) {
            if ($table->isFillable('created_by')) {
                $table->created_by = $table->created_by ?: Auth::id();
            }

            if ($table->isFillable('updated_by')) {
                $table->updated_by = Auth::id();
            }
        });
    }

    public function userCreated()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function userUpdated()
    {
        return $this->belongsTo(User::class, 'updated_by');
    }
}
