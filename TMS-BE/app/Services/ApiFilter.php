<?php
namespace App\Services;


use Illuminate\Http\Request;

class ApiFilter
{
    protected $params = [];
    protected $columnMap = [];
    protected $operatorMap = [
        'eq' => '=',
        'lt' => '<',
        'lte' => '<=',
        'gt' => '>',
        'gte' => '>=',
        'ne' => '<>',
    ];

    protected function getColumnMap()
    {
        return $this->columnMap;
    }

    public function transform(Request $request)
    {
        $eloQuery = [];
        $columnMap = $this->getColumnMap();
        foreach ($this->params as $param => $operators) {
            $query = $request->query($param);

            if (!isset($query)) continue;

            $column = $columnMap[$param] ?? $param;

            foreach ($operators as $operator) {
                if (isset($query[$operator])) {
                    $eloQuery[] = [$column, $this->operatorMap[$operator], $query[$operator]];
                }
            }
        }

        return $eloQuery;
    }
}
