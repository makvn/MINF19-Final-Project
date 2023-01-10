<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
Route::group([
    'middleware' => ['api'],
    'prefix' => 'auth',
], function ($router) {
    Route::post('login', 'AuthController@login')->name('login');
    Route::post('logout', 'AuthController@logout')->name('logout');
    Route::post('refresh', 'AuthController@refresh')->name('user.refresh');
    Route::get('me', 'AuthController@me')->name('user.me');
});
Route::group([
    'middleware' => ['api'],
], function ($router) {
    Route::post('register', 'AuthController@register')->name('user.register');
});
Route::group([
    'middleware' => ['api', 'jwt.auth'],
], function ($router) {
    Route::resource('vehicle', 'VehicleController');
    Route::resource('user', 'UserController');
    Route::post('vehicle/book/{vehicle}', 'VehicleController@book')->name('vehicle.book');
    Route::post('vehicle/update-end-booking/{vehicle}', 'VehicleController@updateEndBooking')->name('vehicle.end_book');
    Route::post('vehicle/update-status/{vehicle}', 'VehicleController@updateStatus')->name('vehicle.updateStatus');
    Route::post('vehicle/update-registry/{vehicle}', 'VehicleController@updateRegistry')->name('vehicle.updateRegistry');

    Route::get('statistics/per-month', 'StatisticsController@perMonth')->name('statistics.perMonth');
    Route::get('statistics/total', 'StatisticsController@total')->name('statistics.total');
});
