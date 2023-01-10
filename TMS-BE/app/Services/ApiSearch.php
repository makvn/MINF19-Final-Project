<?php


namespace App\Services;


use Illuminate\Http\Request;

class ApiSearch
{
    protected $allowedColumn = [];
    protected $columnMap = [];

    public function transform(Request $request)
    {
        $eloQuery = [];
        $query = $request->query('search');

        if (!isset($query['value'])) {
            return [];
        }
        $value = $query['value'];
        $columns = $query['column'] ?? [];
        if ($value && !$columns) {
            $columns = $this->allowedColumn;
        }
        $columnsSearched = array_filter($columns, function ($col) {
            return in_array($col, $this->allowedColumn);
        });

        foreach ($columnsSearched as $col) {
            $col = $this->columnMap[$col] ?? $col;
            $eloQuery[] = [$col, 'like', '%'.strtolower($value).'%'];
        }

        return $eloQuery;
    }
}
