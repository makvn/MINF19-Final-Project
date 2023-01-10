<?php

namespace App\Http\Requests;

use App\Helper\ResponseHelper;
use App\Helper\RoleHelper;
use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;


class SetVehicleRegistryRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        /** @var User $user */
        $user = Auth::user();
        return in_array($user->getRole(), [
            RoleHelper::ROLE_ADMIN,
            RoleHelper::ROLE_SUPPER_ADMIN,
        ]);
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'chassis_number' => 'required|string',
            'engine_number' => 'required|string',
            'date_range' => 'required|date',
            'issued_by' => 'required|string',
            'expired_date' => 'required|date',
        ];
    }

    protected function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(
            ResponseHelper::error($validator->getMessageBag()->first(), 400)
        );
    }
}
