<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class VehicleRegistryResource extends JsonResource
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
            'chassis_number' => $this->chassis_number,
            'engine_number' => $this->engine_number,
            'date_range' => $this->date_range,
            'issued_by' => $this->issued_by,
            'expired_date' => $this->expired_date,
            'created_at' => $this->created_at,
            'created_by' => new UserResource($this->userCreated)
        ];
    }
}
