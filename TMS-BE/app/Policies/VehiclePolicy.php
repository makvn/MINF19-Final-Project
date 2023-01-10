<?php

namespace App\Policies;

use App\Helper\RoleHelper;
use App\Models\User;
use App\Models\Vehicle;
use Illuminate\Auth\Access\HandlesAuthorization;
use Spatie\Permission\Models\Role;

class VehiclePolicy
{
    use HandlesAuthorization;

    /**
     * Create a new policy instance.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    public function view(User $user, Vehicle $vehicle)
    {
        return true;
    }

    public function viewAny(User $user)
    {
        return true;
    }

    public function update(User $user, Vehicle $vehicle)
    {
        return $this->checkAllow($user, $vehicle);
    }

    public function delete(User $user, Vehicle $vehicle)
    {
        return $this->checkAllow($user, $vehicle);
    }

    private function checkAllow(User $user, Vehicle $vehicle)
    {
        $isAdmin = in_array($user->getRole(), [RoleHelper::ROLE_ADMIN, RoleHelper::ROLE_SUPPER_ADMIN]);
        $isOwner = $user->getKey() == $vehicle->driver_id;
        return $isAdmin || $isOwner;
    }

    public function create(User $user)
    {
        return true;
    }

}
