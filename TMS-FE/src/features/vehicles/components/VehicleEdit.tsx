import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ErrorMessage } from '@/component/Form/ErrorMessage';
import { useEffect, useState } from 'react';
import { showError, showSuccess } from '@/utils/global';
import { useRequest } from 'ahooks';
import { getDetailVehicle, updateVehicle } from '@/features/admin/api/vehicles';
import moment from 'moment';
import { numericString } from './VehicleCreate';
import DatePicker from 'react-datepicker';
import { Spin } from '@/component/Spin';

export const schemaEditVehicle = z.object({
  brand: z.string().min(1, 'Brand is required'),
  type_of_fuel: z.string().min(1, 'Type of Fuel is required'),
  document_id: z.string().min(1, 'Document Id is required'),
  weight: numericString(z.number().min(1, 'Weight is required')),
  address: z.string().min(1, 'Address is required'),
  type: z.string().min(1, 'Type of Car is required'),
  car_number: z.string().min(1, 'Car Number is required'),
  year_manufacture: z.string().min(1, 'Year Manufacture is required'),
});

type VehicleEditFormProps = {
  onSuccess: () => void;
  onClose: () => void;
  requestDetail: any;
};
export type VehicleEditForm = {
  brand: string;
  type_of_fuel: string;
  type: string;
  document_id: string;
  date_registration: string;
  weight: number;
  address: string;
  date_expire: string;
  year_manufacture: number;
  car_number: string;
  driver_id?: string;
  driver_email?: string;
  driver_name?: string;
};
export const VehicleEdit = ({ requestDetail, onClose, onSuccess }: VehicleEditFormProps) => {
  const methods = useForm<VehicleEditForm>({
    defaultValues: {
      brand: requestDetail?.brand,
      document_id: requestDetail?.documentId,
      weight: requestDetail?.weight,
      address: requestDetail?.address,
      car_number: requestDetail?.carNumber,
      type: requestDetail?.type,
      type_of_fuel: requestDetail?.typeOfFuel,
      year_manufacture: requestDetail?.yearManufacture,
    },
    resolver: schemaEditVehicle && zodResolver(schemaEditVehicle),
  });
  const [dateRegister, setDateRegister] = useState<Date | any>();
  const [errorDateRegister, setErrorDateRegister] = useState<boolean>(false);
  const [dateExpire, setDateExpire] = useState<Date | any>();
  const [errorDateExpire, setErrorDateExpire] = useState<boolean>(false);

  const { run: runUpdateVeficles, loading } = useRequest(updateVehicle, {
    manual: true,
    onError: showError,
    onSuccess: () => {
      methods.reset();
      showSuccess('Update Vehicle Success!');
      onSuccess();
    },
  });

  const {
    data: dataDriver,
    run: runGetDriver,
    loading: loadingDetail,
  } = useRequest(getDetailVehicle, {
    manual: true,
    onError: showError,
  });

  useEffect(() => {
    if (requestDetail) {
      requestDetail?.dateRegistration &&
        setDateRegister(moment(requestDetail?.dateRegistration, 'YYYY-MM-DD').toDate());
      requestDetail?.dateExpire && setDateExpire(moment(requestDetail?.dateExpire, 'YYYY-MM-DD').toDate());
      runGetDriver(requestDetail?.id);
    }
  }, [requestDetail]);

  useEffect(() => {
    if (dataDriver) {
      const driver = dataDriver?.data?.driver;
      driver?.id && methods.setValue('driver_email', driver?.email);
      driver?.id && methods.setValue('driver_name', (driver?.lastName || '') + ' ' + (driver?.firstName || ''));
    }
  }, [dataDriver]);

  const handleSubmitData = () => {
    const values = methods.getValues();
    if (!dateRegister) {
      setErrorDateRegister(true);
    }
    if (!dateExpire) {
      setErrorDateExpire(true);
    }
    if (
      !dateExpire ||
      !dateRegister ||
      !values?.brand ||
      !values?.document_id ||
      !values?.weight ||
      !values?.car_number ||
      !values?.year_manufacture ||
      !values?.type ||
      !values?.type_of_fuel
    )
      return;
    handleSubmit(values);
  };
  const handleSubmit = (values: VehicleEditForm) => {
    if (loading) return;
    const body = values || {};
    body.date_registration = moment(dateRegister).format('YYYY-MM-DD');
    body.date_expire = moment(dateExpire).format('YYYY-MM-DD');
    body.weight = parseFloat(body.weight + '');
    body.driver_id = dataDriver?.data?.driver?.id;
    body.year_manufacture = parseFloat(body.year_manufacture + '');
    runUpdateVeficles(requestDetail?.id, values);
  };

  return (
    <div>
      <div style={{ minWidth: 750 }} className="account-content bg-white">
        <h4>Update Vehicle </h4>
        <form
          style={{ marginTop: 20 }}
          className="lt-form"
          onSubmit={methods.handleSubmit((e) => {
            handleSubmit(e);
          })}
        >
          <div className="row">
            <div className="col-md-6">
              <span>Brand</span>
              <input placeholder="Brand" className="form-control" {...methods.register('brand')} />
              <ErrorMessage message={methods.formState.errors['brand']?.message} />
            </div>
            <div className="col-md-6">
              <div data-toggle="tooltip" data-placement="bottom" title="Driver Id" className="form-group">
                <span>Driver Email</span>
                <input
                  style={{ backgroundColor: 'lightgrey' }}
                  disabled
                  placeholder="Driver Email"
                  className="form-control"
                  {...methods.register('driver_email')}
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <div data-toggle="tooltip" data-placement="bottom" title="Driver Id" className="form-group">
                <span>Driver Name</span>
                <input
                  style={{ backgroundColor: 'lightgrey' }}
                  disabled
                  placeholder="Driver Name"
                  className="form-control"
                  {...methods.register('driver_name')}
                />
              </div>
            </div>
            <div className="col-md-6">
              <span>Year Manufacture</span>
              <input
                type={'text'}
                placeholder="Year Manufacture"
                className="form-control"
                {...methods.register('year_manufacture')}
              />
              <ErrorMessage message={methods.formState.errors['year_manufacture']?.message} />
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <span>Document Id</span>
              <input placeholder="Document Id" className="form-control" {...methods.register('document_id')} />
              <ErrorMessage message={methods.formState.errors['document_id']?.message} />
            </div>
            <div className="col-md-6">
              <span>Weight</span>
              <input type={'text'} placeholder="Weight" className="form-control" {...methods.register('weight')} />
              <ErrorMessage message={methods.formState.errors['weight']?.message} />
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <span>Regisration Date</span>
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
            <div className="col-md-6">
              <span>Exipre Date</span>
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

          <div className="row">
            <div className="col-md-6">
              <span>Car Number</span>
              <input placeholder="Car Number" className="form-control" {...methods.register('car_number')} />
              <ErrorMessage message={methods.formState.errors['car_number']?.message} />
            </div>
            <div className="col-md-6">
              <span>Type of Car</span>
              <input placeholder="Type of Car" className="form-control" {...methods.register('type')} />
              <ErrorMessage message={methods.formState.errors['type']?.message} />
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <span>Type of Fuel</span>
              <input placeholder="Type of Fuel" className="form-control" {...methods.register('type_of_fuel')} />
              <ErrorMessage message={methods.formState.errors['type_of_fuel']?.message} />
            </div>
          </div>

          <div style={{ marginTop: 25, justifyContent: 'center' }} className="row">
            <button
              style={{
                height: 45,
                color: '#179bee',
                backgroundColor: 'white',
                marginRight: 20,
                paddingTop: 10,
                paddingBottom: 10,
              }}
              onClick={onClose}
              className="btn btn-primary d-block"
            >
              Close
            </button>
            <button
              style={{ height: 45, paddingTop: 10, paddingBottom: 10 }}
              className="btn btn-primary d-block"
              onClick={handleSubmitData}
            >
              Update
            </button>
          </div>
        </form>
      </div>
      <Spin isVisible={loadingDetail || loading} />
    </div>
  );
};
