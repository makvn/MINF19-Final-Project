<?php
namespace App\Services;


use Illuminate\Support\Facades\DB;

class UserFilter extends ApiFilter
{
    protected $params = [
        'status' => ['eq'],
        'role' => ['eq'],
        'email' => ['eq'],
        'created_at' => ['lte', 'gte', 'eq', 'lt', 'gt']
    ];

    protected function getColumnMap()
    {
        return [
            'role' => 'roles.name',
            'created_at' => DB::raw('date(users.created_at)')
        ];
    }
}
