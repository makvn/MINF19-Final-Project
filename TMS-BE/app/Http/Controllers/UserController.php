<?php

namespace App\Http\Controllers;

use App\Events\DriverCreated;
use App\Helper\RequestHelper;
use App\Helper\ResponseHelper;
use App\Helper\RoleHelper;
use App\Http\Requests\StoreUserRequest;
use App\Http\Resources\UserCollection;
use App\Http\Resources\UserResource;
use App\Models\User;
use App\Services\ApiSearch;
use App\Services\UserFilter;
use App\Services\UserSearch;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Role;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     * @param Request $request
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $filter = new UserFilter();
        $eloFilter = $filter->transform($request);
        $query = User::query()
            ->join('model_has_roles', 'model_id', '=', 'users.id')
            ->join('roles', 'role_id', '=', 'roles.id')
            ->select('users.*')
        ;

        if ($eloFilter) {
            $query->where($eloFilter);
        }

        $search = new UserSearch();
        $eloSearch = $search->transform($request);
        if ($eloSearch) {
            $query->where(function ($q) use ($eloSearch) {
                foreach ($eloSearch as $search) {
                    $q->orWhere($search[0], $search[1], $search[2]);
                }
            });
        }
        $users = $query->paginate(RequestHelper::getPerPage($request));

        return ResponseHelper::success('', new UserCollection($users));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  StoreUserRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreUserRequest $request)
    {
        $input = $request->all();
        $input['status'] = User::STATUS_ACTIVE;
        $input['password'] = Hash::make($input['password']);
        /** @var User $user */
        $user = User::create($input);
        if ($user->getRole()) {
            $user->removeRole($user->getRole());
        }

        $user->assignRole($input['role']);
        if ($input['role'] == RoleHelper::ROLE_DRIVER) {
            DriverCreated::dispatch($user);
        }
        return ResponseHelper::success('User created Successfully', new UserResource($user));
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  User $user
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, User $user)
    {
        $input = $request->only([
            'last_name',
            'first_name',
            'dob',
            'affiliation',
            'status',
            'password'
        ]);
        if ($input['password']) {
            $input['password'] = Hash::make($input['password']);
        }

        if (
            !empty($input['role'])
            && Auth::user()->getRole() == RoleHelper::ROLE_SUPPER_ADMIN
        ) {
            if ($user->getRole()) {
                $user->removeRole($user->getRole());
            }
            $user->assignRole($input['role']);
        }

        $user->update($input);

        return ResponseHelper::success('Update Successfully', new UserResource($user));
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
