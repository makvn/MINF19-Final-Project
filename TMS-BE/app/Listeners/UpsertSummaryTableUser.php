<?php

namespace App\Listeners;

use App\Events\DriverCreated;
use App\Models\SummaryPerMonth;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Support\Facades\DB;

class UpsertSummaryTableUser
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
     * @param  \App\Events\DriverCreated  $event
     * @return void
     */
    public function handle(DriverCreated $event)
    {
        SummaryPerMonth::query()
            ->upsert([
                'month_year' => $event->monthYear,
                'type' => SummaryPerMonth::TYPE_USER,
                'total' => 1
            ], ['month_year', 'type'], [
                'total' => DB::raw('total + 1')
            ])
        ;
    }
}
