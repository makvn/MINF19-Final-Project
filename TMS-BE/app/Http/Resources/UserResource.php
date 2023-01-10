<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{

    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        /** @var Carbon $createdAt */
        $createdAt = $this->created_at;
        $result = [
            'id' => $this->id,
            'last_name' => $this->last_name,
            'first_name' => $this->first_name,
            'affiliation' => $this->affiliation,
            'email' => $this->email,
            'dob' => $this->dob,
            'status' => $this->status,
            'role' => $this->getRole(),
            'created_at' => $createdAt ? $createdAt->format('Y-m-d H:i:s') : null,
        ];

        return $result;
    }
}
