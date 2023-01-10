<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class VehicleResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'brand' => $this->brand,
            'type' => $this->type,
            'car_number' => $this->car_number,
            'weight' => $this->weight,
            'type_of_fuel' => $this->type_of_fuel,
            'status' => $this->status,
            'document_id' => $this->document_id,
            'date_registration' => $this->date_registration,
            'date_expire' => $this->date_expire,
            'year_manufacture' => $this->year_manufacture,
            'driver' => $this->whenLoaded('driver', function () {
                return new UserResource($this->driver);
            }),
            'book_by' => $this->whenLoaded('userBooked', function () {
                return new UserResource($this->userBooked);
            }),
            'book_at' => $this->whenLoaded('userBooked', function () {
                return $this->book_at;
            }),
            'current_booking' => $this->whenLoaded('currentBooking', function () {
                return new BookingResource($this->currentBooking);
            }),
            'booking_status' => $this->getBookingStatus(),
            'vehicle_registry' => $this->whenLoaded('vehicleRegistry', function () {
                return new VehicleRegistryResource($this->vehicleRegistry);
            }),
         ];
    }
}
