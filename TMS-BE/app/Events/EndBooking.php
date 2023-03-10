<?php

namespace App\Events;

use App\Models\Booking;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class EndBooking
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $booking;
    public $monthYear = '';

    /**
     * Create a new event instance.
     * @param $booking
     * @return void
     */
    public function __construct(Booking $booking)
    {
        $this->booking = $booking;
        $this->monthYear = date('Y-m');
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return \Illuminate\Broadcasting\Channel|array
     */
    public function broadcastOn()
    {
        return new PrivateChannel('channel-name');
    }
}
