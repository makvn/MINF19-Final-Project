<?php
/**
 * Created by PhpStorm.
 * User: tranquockiet
 * Date: 11/21/22
 * Time: 5:09 PM
 */

namespace App\Helper;


use Illuminate\Http\Request;

class RequestHelper
{
    const PER_PAGE_VALUE_DEFAULT = 15;
    protected static $perPageValueAllowed = [10, 15, 20, 50];

    public static function getPerPage(Request $request)
    {
        $value = $request->get('per_page');
        if (in_array($value, static::$perPageValueAllowed)) {
            return $value;
        }

        return static::PER_PAGE_VALUE_DEFAULT;
    }
}
