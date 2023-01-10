<?php

namespace App\Http\Middleware;

use App\Helper\ResponseHelper;
use App\Models\User;
use Closure;
use Illuminate\Http\Request;

class UserAdmin
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next)
    {
        /** @var User $user */
        $user = $request->user();
        if ($user->isAdmin()) {
            return $next($request);
        } else {
            return ResponseHelper::error('Not Allowed', 403);
        }
    }
}
