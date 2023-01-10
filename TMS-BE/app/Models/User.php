<?php

namespace App\Models;

use App\Helper\RoleHelper;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\Auth;
use Laravel\Sanctum\HasApiTokens;
use Spatie\Permission\Traits\HasRoles;
use Tymon\JWTAuth\Contracts\JWTSubject;

/**
 * Class User
 * @property string last_name
 * @property string first_name
 * @property string dob
 * @property string email
 * @property string password
 * @property string affiliation
 * @property string status
 * @property integer created_by
 * @property integer updated_by
 * @method static create($params)
 * @package App\Models
 */
class User extends Authenticatable implements JWTSubject
{
    use HasApiTokens, HasFactory, Notifiable, HasRoles;

    const STATUS_ACTIVE = 'AC';
    const STATUS_INACTIVE = 'IA';

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'last_name',
        'first_name',
        'dob',
        'email',
        'password',
        'affiliation',
        'status',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    public function getJWTCustomClaims()
    {
        return [];
    }

    public function getRole()
    {
        return $this->getRoleNames()->first();
    }

    public function isAdmin()
    {
        return $this->getRole() == RoleHelper::ROLE_ADMIN;
    }

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
