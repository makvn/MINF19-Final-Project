<?php
/**
 * Created by PhpStorm.
 * User: tranquockiet
 * Date: 11/23/22
 * Time: 3:00 PM
 */

namespace App\Http\Resources;


use Illuminate\Http\Resources\Json\ResourceCollection;

class ApiCollection extends ResourceCollection
{
    public function toArray($request)
    {
        return [
            'data' => $this->collection,
            'meta' => [
                'total' => $this->total(),
                'count' => $this->count(),
                'per_page' => intval($this->perPage()),
                'current_page' => $this->currentPage(),
                'total_pages' => $this->lastPage()

            ]
        ];
    }
}
