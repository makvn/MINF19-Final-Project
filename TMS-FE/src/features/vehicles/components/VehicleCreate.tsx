import { AuthLayout } from '@/features/admin';
import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { showError, showSuccess } from '@/utils/global';
import { useRequest } from 'ahooks';
import { ErrorMessage } from '@/component/Form';
import { Spin } from '@/component/Spin';
import moment from 'moment';
import { createVeficles } from '@/features/admin/api/vehicles';
import { ZodTypeAny } from 'zod';

export const numericString = (schema: ZodTypeAny) =>
  z.preprocess((a) => {
    try {
      if (typeof a === 'string') {
        return parseFloat(a);
      } else if (typeof a === 'number') {
        return a;
      } else {
        return undefined;
      }
    } catch (e) {
      return undefined;
    }
  }, schema);

export type VehicleCreateProps = {
  first_name: string;
  last_name: string;
  email: string;
  user_id?: string;
  phone: string;
  brand: string;
  driver_id: string;
  type_of_fuel: string;
  type: string;
  document_id: string;
  date_registration: string;
  weight: number;
  address: string;
  date_expire: string;
  car_number: string;
  year_manufacture: number;
};
export const schemaVehicle = z.object({
  email: z.string().min(1, 'Email address is required').email('Email address not valid.'),
  phone: z.string().min(1, 'Phone is required'),
  brand: z.string().min(1, 'Brand is required'),
  first_name: z.string().min(1, 'First Name is required'),
  last_name: z.string().min(1, 'Last Name is required'),
  driver_id: z.string().min(1, 'Driver Id is required'),
  type_of_fuel: z.string().min(1, 'Type of Fuel is required'),
  document_id: z.string().min(1, 'Document Id is required'),
  // date_registration: z.string().optional()
  weight: numericString(z.number().min(1, 'Weight is required')),
  address: z.string().min(1, 'Address is required'),
  // date_expire: z.string().min(1, 'Expirate Date is required'),
  user_id: z.string().optional(),
  type: z.string().min(1, 'Type of Car is required'),
  car_number: z.string().min(1, 'Car Number is required'),
  year_manufacture: z.string().min(1, 'Year Manufacture is required'),
});

export const VehicleCreate = () => {
  const [dateRegister, setDateRegister] = useState<Date | any>();
  const [dateExpire, setDateExpire] = useState<Date | any>();
  const [errorDateRegister, setErrorDateRegister] = useState<boolean>(false);
  const [errorDateExpire, setErrorDateExpire] = useState<boolean>(false);

  const methods = useForm<VehicleCreateProps>({
    resolver: schemaVehicle && zodResolver(schemaVehicle),
  });
  const { run: runCreateVeficles, loading } = useRequest(createVeficles, {
    manual: true,
    onError: showError,
    onSuccess: () => {
      setDateRegister(undefined);
      setDateExpire(undefined);
      methods.reset();
      showSuccess('Create New Vehicle Success!');
    },
  });
  const handleCreate = (values: VehicleCreateProps) => {
    const body = values || {};
    body.date_registration = moment(dateRegister).format('YYYY-MM-DD');
    body.date_expire = moment(dateExpire).format('YYYY-MM-DD');
    body.weight = parseFloat(body.weight + '');
    body.year_manufacture = parseFloat(body.year_manufacture + '');
    runCreateVeficles(body);
  };

  return (
    <div>
      <AuthLayout>
        <div className="main">
          <div className="main-title">
            <h1 className="db-title">Create New Vehicle</h1>
          </div>

          <div className="main-header">
            <div className="search-box">
              <form
                onSubmit={methods.handleSubmit((v) => {
                  if (!dateRegister) {
                    setErrorDateRegister(true);
                    return;
                  }
                  if (!dateExpire) {
                    setErrorDateExpire(true);
                    return;
                  }
                  handleCreate(v);
                })}
                className="lt-form"
              >
                <div className="row">
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
                      <input type="phone" {...methods.register('phone')} placeholder="Phone" className="form-control" />
                      <ErrorMessage message={methods.formState.errors['phone']?.message} />
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="form-group">
                      <input placeholder="Brand" className="form-control" {...methods.register('brand')} />
                      <ErrorMessage message={methods.formState.errors['brand']?.message} />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <input placeholder="User Id" className="form-control" {...methods.register('user_id')} />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <input placeholder="Driver Id" className="form-control" {...methods.register('driver_id')} />
                      <ErrorMessage message={methods.formState.errors['driver_id']?.message} />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <input placeholder="Document Id" className="form-control" {...methods.register('document_id')} />
                      <ErrorMessage message={methods.formState.errors['document_id']?.message} />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <input
                        type={'text'}
                        placeholder="Weight"
                        className="form-control"
                        {...methods.register('weight')}
                      />
                      <ErrorMessage message={methods.formState.errors['weight']?.message} />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <DatePicker
                        className="form-control"
                        clearButtonClassName={'form-datepicker-clear'}
                        selected={dateRegister ? dateRegister : undefined}
                        placeholderText={'Regisration Date'}
                        onChange={(date: any) => {
                          setDateRegister(date);
                          setErrorDateRegister(false);
                        }}
                        isClearable
                      />
                      <ErrorMessage message={errorDateRegister ? 'Regisration Date is required' : ''} />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <DatePicker
                        className="form-control"
                        clearButtonClassName={'form-datepicker-clear'}
                        selected={dateExpire ? dateExpire : undefined}
                        placeholderText={'Exipre Date'}
                        onChange={(date: any) => {
                          setDateExpire(date);
                          setErrorDateExpire(false);
                        }}
                        isClearable
                      />
                      <ErrorMessage message={errorDateExpire ? 'Exipre Date is required' : ''} />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <input placeholder="Address" className="form-control" {...methods.register('address')} />
                      <ErrorMessage message={methods.formState.errors['address']?.message} />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <input placeholder="Car Number" className="form-control" {...methods.register('car_number')} />
                      <ErrorMessage message={methods.formState.errors['car_number']?.message} />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <input placeholder="Type of Car" className="form-control" {...methods.register('type')} />
                      <ErrorMessage message={methods.formState.errors['type']?.message} />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <input
                        type={'text'}
                        placeholder="Year Manufacture"
                        className="form-control"
                        {...methods.register('year_manufacture')}
                      />
                      <ErrorMessage message={methods.formState.errors['year_manufacture']?.message} />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <input
                        placeholder="Type of Fuel"
                        className="form-control"
                        {...methods.register('type_of_fuel')}
                      />
                      <ErrorMessage message={methods.formState.errors['type_of_fuel']?.message} />
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
