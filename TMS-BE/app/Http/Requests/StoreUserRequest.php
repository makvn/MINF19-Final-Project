<?php
namespace App\Http\Requests;

use App\Helper\ResponseHelper;
use App\Helper\RoleHelper;
use App\Models\User;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;

class StoreUserRequest extends FormRequest
{
    public function authorize()
    {
        /** @var User $user */
        $user = Auth::user();
        $userUpdated = $this->route('user');
        return $user->getRole() == RoleHelper::ROLE_SUPPER_ADMIN
            || ( $userUpdated && Auth::id() == $userUpdated);
    }

    public function rules()
    {
        $userId = $this->route('user');
        $rules = [
            'first_name' => 'required|string',
            'last_name' => 'required|string',
            'email' => 'required|email|unique:users',
            'password' => 'required|string|min:6|max:50',
            'dob' => 'date',
            'role' => sprintf('in:%s,%s', RoleHelper::ROLE_ADMIN, RoleHelper::ROLE_DRIVER)
        ];

        if ($userId) {
            $rules['email'] = $rules['email'].','.$userId;
            $rules['password'] = 'string|min:6|max:50';
        }

        return $rules;
    }

    protected function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(
            ResponseHelper::error($validator->getMessageBag()->first(), 400)
        );
    }
}
