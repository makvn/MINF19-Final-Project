<?php

namespace App\Providers;

use App\Events\DriverCreated;
use App\Events\EndBooking;
use App\Events\VehicleBooked;
use App\Listeners\UpsertSummaryTableBooked;
use App\Listeners\UpsertSummaryTableEndBooking;
use App\Listeners\UpsertSummaryTableUser;
use Illuminate\Auth\Events\Registered;
use Illuminate\Auth\Listeners\SendEmailVerificationNotification;
use Illuminate\Foundation\Support\Providers\EventServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Event;

class EventServiceProvider extends ServiceProvider
{
    /**
     * The event listener mappings for the application.
     *
     * @var array<class-string, array<int, class-string>>
     */
    protected $listen = [
        Registered::class => [
            SendEmailVerificationNotification::class,
        ],
        DriverCreated::class => [
            UpsertSummaryTableUser::class,
        ],
        VehicleBooked::class => [
            UpsertSummaryTableBooked::class
        ],
        EndBooking::class => [
            UpsertSummaryTableEndBooking::class
        ]
    ];

    /**
     * Register any events for your application.
     *
     * @return void
     */
    public function boot()
    {
        //
    }
}
