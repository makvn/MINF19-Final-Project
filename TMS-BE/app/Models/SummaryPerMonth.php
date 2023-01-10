<?php
namespace App\Models;

/**
 * Class SummaryPerMonth
 * @property string month_year
 * @property string type
 * @property float total
 * @package App\Models
 */
class SummaryPerMonth extends BaseModel
{
    const TYPE_AMOUNT = 'amount';
    const TYPE_BOOKING = 'booking';
    const TYPE_USER = 'user';

    protected $table = 'summary_per_month';
    protected $fillable = [
        'month_year',
        'total',
        'type',
    ];
}
