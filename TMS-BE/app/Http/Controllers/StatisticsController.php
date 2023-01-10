<?php
namespace App\Http\Controllers;


use App\Helper\ResponseHelper;
use App\Models\SummaryPerMonth;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;

class StatisticsController extends Controller
{
    public function perMonth(Request $request)
    {
        $request->validate([
            'month' => 'date_format:Y-m'
        ]);

        $monthInput = $request->get('month', date('Y-m'));
        $arrayMonths = [$monthInput];
        for ($i = 1; $i <= 11; $i++) {
            $arrayMonths[] = date('Y-m', strtotime(sprintf('%s - %d months', $monthInput, $i)));
        }

        /** @var SummaryPerMonth[]|Collection $rows */
        $rows = SummaryPerMonth::query()
            ->whereIn('month_year', $arrayMonths)
            ->whereIn('type', [SummaryPerMonth::TYPE_USER, SummaryPerMonth::TYPE_BOOKING])
            ->get();

        $result = [
            SummaryPerMonth::TYPE_USER => [],
            SummaryPerMonth::TYPE_BOOKING => [],
        ];

        $types = [SummaryPerMonth::TYPE_USER, SummaryPerMonth::TYPE_BOOKING];
        foreach ($arrayMonths as $month) {
            foreach ($types as $type) {
                $filter = $this->filterFunc($type, $month);
                $row = $rows->filter($filter)->first();
                $result[$type][$month] = $row ? intval($row->total) : 0;
            }
        }

        return ResponseHelper::success('Successfully', $result);
    }

    private function filterFunc($type, $month = null)
    {
        return function ($row) use ($type, $month) {
            $condition = $row->type == $type;
            if ($month) {
                $condition = $condition && $row->month_year == $month;
            }
            /** @var SummaryPerMonth $row */
            return $condition;
        };
    }

    public function total(Request $request)
    {
        $request->validate([
            'month' => 'date_format:Y-m'
        ]);

        $monthInput = $request->get('month', date('Y-m'));

        $arrayMonths = [$monthInput];
        for ($i = 1; $i <= 11; $i++) {
            $arrayMonths[] = date('Y-m', strtotime(sprintf('%s - %d months', $monthInput, $i)));
        }
        $rows = SummaryPerMonth::query()
            ->whereIn('month_year', $arrayMonths)
            ->groupBy('type')
            ->select([
                'type',
                DB::raw('SUM(total) AS total_data')
            ])
            ->get();

        $totalUser = $rows->filter($this->filterFunc(SummaryPerMonth::TYPE_USER))->first();
        $totalBooking = $rows->filter($this->filterFunc(SummaryPerMonth::TYPE_BOOKING))->first();
        $totalAmount = $rows->filter($this->filterFunc(SummaryPerMonth::TYPE_AMOUNT))->first();
        $result = [];
        $result[SummaryPerMonth::TYPE_USER] = $totalUser ? intval($totalUser->total_data) : 0;
        $result[SummaryPerMonth::TYPE_BOOKING] = $totalBooking ? intval($totalBooking->total_data) : 0;
        $result[SummaryPerMonth::TYPE_AMOUNT] = $totalAmount ? floatval($totalAmount->total_data) : 0;

        return ResponseHelper::success('Successfully', $result);
    }

    public function setup()
    {
        $query = User::query()
            ->join('model_has_roles', 'model_id', '=', 'users.id')
            ->join('roles', 'role_id', '=', 'roles.id')
            ->select('users.*')
        ;
    }
}
