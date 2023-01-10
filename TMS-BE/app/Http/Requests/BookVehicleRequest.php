<?php
namespace App\Http\Requests;

use App\Helper\ResponseHelper;
use App\Helper\RoleHelper;
use App\Models\User;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Support\Facades\Auth;

class BookVehicleRequest extends FormRequest
{
    public function authorize()
    {
        /** @var User $user */
        $user = Auth::user();
        return in_array($user->getRole(), [
            RoleHelper::ROLE_ADMIN,
            RoleHelper::ROLE_SUPPER_ADMIN,
        ]);
    }

    public function rules()
    {
        return $rules = [
            'customer_name' => 'required|string|max:255',
            'customer_phone' => 'required|string|max:255',
            'pickup_place' => 'required|string|max:255',
            'datetime_start' => 'required|date|after:today',
        ];
    }

    protected function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(
            ResponseHelper::error($validator->getMessageBag()->first(), 400)
        );
    }
}
