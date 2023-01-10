<?php

namespace App\Listeners;

use App\Events\VehicleBooked;
use App\Models\SummaryPerMonth;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Support\Facades\DB;

class UpsertSummaryTableBooked
{
    /**
     * Create the event listener.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     *
     * @param  \App\Events\VehicleBooked  $event
     * @return void
     */
    public function handle(VehicleBooked $event)
    {
        SummaryPerMonth::query()
            ->upsert([
                'month_year' => $event->monthYear,
                'type' => SummaryPerMonth::TYPE_BOOKING,
                'total' => 1
            ], ['month_year', 'type'], [
                'total' => DB::raw('total + 1')
            ])
        ;
    }
}
