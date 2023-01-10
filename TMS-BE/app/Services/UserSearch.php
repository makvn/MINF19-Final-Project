<?php
namespace App\Services;


class UserSearch extends ApiSearch
{
    protected $allowedColumn = ['last_name', 'first_name', 'email'];
}
