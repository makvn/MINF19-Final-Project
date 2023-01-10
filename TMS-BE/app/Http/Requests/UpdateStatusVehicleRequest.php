<?php
namespace App\Http\Requests;

use App\Helper\ResponseHelper;
use App\Helper\RoleHelper;
use App\Models\User;
use App\Models\Vehicle;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Support\Facades\Auth;

class UpdateStatusVehicleRequest extends FormRequest
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
            'status' => sprintf('required|in:%s,%s', Vehicle::STATUS_ACTIVE, Vehicle::STATUS_INACTIVE)
        ];
    }

    protected function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(
            ResponseHelper::error($validator->getMessageBag()->first(), 400)
        );
    }
}
