<?php
namespace App\Http\Controllers;


use App\Exports\BookingExport;
use App\Helper\ResponseHelper;
use Illuminate\Http\Request;
use Maatwebsite\Excel\Facades\Excel;


class ExportController extends Controller
{
    public function exportBooking(Request $request)
    {
        try {
            $request->validate([
                'dateFrom' => 'required|date_format:Y-m-d',
                'dateTo' => 'required|date_format:Y-m-d|after:dateFrom',
            ]);

        } catch (\Throwable $exception) {
            return ResponseHelper::error($exception->getMessage(), 400);
        }
        $dateFrom = $request->get('dateFrom');
        $dateTo = $request->get('dateTo');
        $export = (new BookingExport($dateFrom, $dateTo));
        return Excel::download($export, 'booking.xlsx');
    }

}
