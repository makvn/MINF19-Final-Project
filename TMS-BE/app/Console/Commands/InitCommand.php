<?php

namespace App\Console\Commands;

use App\Helper\PermissionHelper;
use App\Helper\RoleHelper;
use App\Models\SummaryPerMonth;
use App\Models\User;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class InitCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'command:init';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'init project';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $roleAdmin = $this->createRoleIfNotExists(RoleHelper::ROLE_ADMIN);
        $roleUser = $this->createRoleIfNotExists(RoleHelper::ROLE_DRIVER);
        $roleSupperAdmin = $this->createRoleIfNotExists(RoleHelper::ROLE_SUPPER_ADMIN);

        /** @var User $userAdmin */
        $userAdmin = $this->createUserAdminIfNotExists();
        $userAdmin->assignRole($roleSupperAdmin);
        return static::SUCCESS;
    }

    private function createRoleIfNotExists($roleName)
    {
        $role = Role::query()->where('name', $roleName)->first();
        if (!$role) {
            $role = Role::create(['name' => $roleName]);
        }

        return $role;
    }

    private function createPermissionIfNotExists($permissionName)
    {
        $permission = Permission::query()->where('name', $permissionName)->first();
        if (!$permission) {
            $permission = Permission::create(['name' => $permissionName]);
        }

        return $permission;
    }

    private function createUserAdminIfNotExists()
    {
        $userAdmin = User::query()->where('email', 'admin@gmail.com')->first();
        if (!$userAdmin) {
            $userAdmin = new User();
            $userAdmin->email = 'admin@gmail.com';
            $userAdmin->first_name = 'Supper';
            $userAdmin->last_name = 'Admin';
            $userAdmin->status = User::STATUS_ACTIVE;
            $userAdmin->password = Hash::make('123456');
            $userAdmin->save();
        }

        return $userAdmin;
    }
}
