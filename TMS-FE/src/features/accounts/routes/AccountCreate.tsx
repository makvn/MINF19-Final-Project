import { AuthLayout } from '@/features/admin';
import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { PERMISSION_APP, showError, showSuccess } from '@/utils/global';
import { useRequest } from 'ahooks';
import { createUser } from '@/features/accounts/api/users';
import { ErrorMessage } from '@/component/Form';
import { Spin } from '@/component/Spin';
import moment from 'moment';

export type AccountCreateProps = {
  email: string;
  password: string;
  user_name: string;
  first_name: string;
  last_name: string;
  retype_password?: string;
  phone?: string;
  gender?: string;
  role?: string;
  dob?: string;
};
const schema = z
  .object({
    email: z.string().min(1, 'Email address is required').email('Email address not valid.'),
    password: z.string().min(1, 'Password is required'),
    user_name: z.string().min(1, 'User Name is required'),
    first_name: z.string().min(1, 'First Name is required'),
    last_name: z.string().min(1, 'Last Name is required'),
    retype_password: z.string().min(1, 'Retype Password is required'),
    role: z.string().optional(),
    gender: z.string().optional(),
    phone: z.string().optional(),
  })
  .refine((data) => data.password === data.retype_password, {
    message: "Password doesn't match",
    path: ['retype_password'],
  });
export const AccountCreate = () => {
  const [dateDob, setDateDob] = useState<Date | any>();
  const methods = useForm<AccountCreateProps>({
    resolver: schema && zodResolver(schema),
  });
  const { run: runCreateUser, loading } = useRequest(createUser, {
    manual: true,
    onError: showError,
    onSuccess: () => {
      setDateDob(undefined);
      methods.reset();
      showSuccess('Create Account User Success!');
    },
  });
  const handleCreate = (values: AccountCreateProps) => {
    const body = values || {};
    if (dateDob) {
      body.dob = moment(dateDob).format('YYYY-MM-DD');
    }
    delete body.retype_password;
    runCreateUser(body);
  };

  return (
    <div>
      <AuthLayout>
        <div className="main">
          <div className="main-title">
            <h1 className="db-title">Create New Account</h1>
          </div>

          <div className="main-header">
            <div className="search-box">
              <form onSubmit={methods.handleSubmit(handleCreate)} className="lt-form">
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <input placeholder="User Name" className="form-control" {...methods.register('user_name')} />
                      <ErrorMessage message={methods.formState.errors['user_name']?.message} />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <input placeholder="First Name" className="form-control" {...methods.register('first_name')} />
                      <ErrorMessage message={methods.formState.errors['first_name']?.message} />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <input placeholder="Last Name" className="form-control" {...methods.register('last_name')} />
                      <ErrorMessage message={methods.formState.errors['last_name']?.message} />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <input
                        type="email"
                        placeholder="Email"
                        id="email"
                        className="form-control"
                        {...methods.register('email')}
                      />
                      <ErrorMessage message={methods.formState.errors['email']?.message} />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <input
                        type="password"
                        id="password"
                        placeholder="Password"
                        className="form-control"
                        {...methods.register('password')}
                      />
                      <ErrorMessage message={methods.formState.errors['password']?.message} />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <input
                        type="password"
                        id="retype_password"
                        placeholder="Retype Password"
                        className="form-control"
                        {...methods.register('retype_password')}
                      />
                      <ErrorMessage message={methods.formState.errors['retype_password']?.message} />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <input type="phone" {...methods.register('phone')} placeholder="Phone" className="form-control" />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <select
                        defaultValue={'Male'}
                        placeholder="Gender"
                        className="form-control"
                        {...methods.register('gender')}
                      >
                        <option value={'Male'}>Male</option>
                        <option value={'Female'}>Female</option>
                        <option value={'Other'}>Other</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <DatePicker
                        className="form-control"
                        clearButtonClassName={'form-datepicker-clear'}
                        selected={dateDob ? dateDob : undefined}
                        placeholderText={'Date of birth'}
                        onChange={(date: any) => setDateDob(date)}
                        isClearable
                        maxDate={new Date()}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <select
                        defaultValue={PERMISSION_APP.ADMIN}
                        placeholder="Role"
                        id={'role'}
                        className="form-control"
                        {...methods.register('role')}
                      >
                        <option value={PERMISSION_APP.SUPER_ADMIN}>Supper Admin</option>
                        <option value={PERMISSION_APP.ADMIN}>Admin</option>
                        <option value={PERMISSION_APP.DRIVER}>Driver</option>
                      </select>
                    </div>
                  </div>

                  <div className="col-md-6"></div>
                  <div className={'col-md-12'}>
                    <button className={'btn btn-primary'} type={'submit'}>
                      Create
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </AuthLayout>

      <Spin isVisible={loading} />
    </div>
  );
};
