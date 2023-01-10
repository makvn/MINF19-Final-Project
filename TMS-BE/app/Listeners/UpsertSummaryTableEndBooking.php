<?php

namespace App\Listeners;

use App\Events\EndBooking;
use App\Models\SummaryPerMonth;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Support\Facades\DB;

class UpsertSummaryTableEndBooking
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
     * @param  \App\Events\EndBooking  $event
     * @return void
     */
    public function handle(EndBooking $event)
    {
        SummaryPerMonth::query()
            ->upsert([
                'month_year' => $event->monthYear,
                'type' => SummaryPerMonth::TYPE_AMOUNT,
                'total' => $event->booking->amount
            ], ['month_year', 'type'], [
                'total' => DB::raw('total + '.$event->booking->amount)
            ])
        ;
    }
}
