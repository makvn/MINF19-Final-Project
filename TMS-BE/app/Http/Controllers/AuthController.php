<?php

namespace App\Http\Controllers;

use App\Events\DriverCreated;
use App\Helper\ResponseHelper;
use App\Helper\RoleHelper;
use App\Http\Requests\RegisterDriverRequest;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Spatie\Permission\Models\Role;


class AuthController extends Controller
{
    /**
     * Create a new AuthController instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('jwt.auth', ['except' => ['login', 'register']]);
    }

    /**
     * Get a JWT via given credentials.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function login()
    {
        $credentials = request(['email', 'password']);

        if (! $token = auth()->attempt($credentials)) {
            return ResponseHelper::error('Unauthorized', 401);
        }

        if (\auth()->user()->status != User::STATUS_ACTIVE) {
            return ResponseHelper::error('User is Inactive', 403);
        }

        return $this->respondWithToken($token);
    }

    /**
     * Get the authenticated User.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function me()
    {
        /** @var User $user */
        $user = auth()->user();
        $userToArray = $user->toArray();
        return ResponseHelper::success('', (array_merge($userToArray, [
            'role' => $user->getRoleNames()->first()
        ])));
    }

    /**
     * Log the user out (Invalidate the token).
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout()
    {
        auth()->logout();

        return ResponseHelper::success('Successfully logged out');
    }

    /**
     * Refresh a token.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function refresh()
    {
        return $this->respondWithToken(auth()->refresh());
    }

    /**
     * Get the token array structure.
     *
     * @param  string $token
     *
     * @return \Illuminate\Http\JsonResponse
     */
    protected function respondWithToken($token)
    {
        return ResponseHelper::success('', [
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth()->factory()->getTTL() * 60*60*24,
            'user' => new UserResource(Auth::user())
        ]);
    }

    public function register(RegisterDriverRequest $request)
    {
        $input = array_merge($request->all(), [
            'status' => User::STATUS_ACTIVE,
        ]);
        $input['password'] = Hash::make($input['password']);
        /** @var User $user */
        $user = User::create($input);
        $user->assignRole(Role::findByName(RoleHelper::ROLE_DRIVER));
        DriverCreated::dispatch($user);
        $token = Auth::attempt($request->only('email', 'password'));
        $userResource = new UserResource($user);
        return ResponseHelper::success('Driver register successfully', array_merge(
            $userResource->toArray($request),
            ['token' => $token]
        ));
    }
}
