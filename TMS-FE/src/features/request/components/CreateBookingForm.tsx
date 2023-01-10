import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ErrorMessage } from '@/component/Form/ErrorMessage';
import { useState } from 'react';
import { showError, showSuccess } from '@/utils/global';
import { useRequest } from 'ahooks';
import { createBookVeficles } from '@/features/admin/api/vehicles';
import DateTimePicker from 'react-datetime-picker';
import moment from 'moment';

const schema = z.object({
  customer_name: z.string().min(1, 'Customer Name is required'),
  customer_phone: z.string().min(1, 'Phone number is required'),
  pickup_place: z.string().min(1, 'Pick up Place is required'),
});

interface BookingFormValues {
  customer_name: string;
  customer_phone: string;
  pickup_place: string;
  datetime_start: string;
}

type CreateBookingFormProps = {
  onSuccess: () => void;
  onClose: () => void;
  requestDetail: any;
};

export const CreateBookingForm = ({ requestDetail, onClose, onSuccess }: CreateBookingFormProps) => {
  const methods = useForm<BookingFormValues>({
    resolver: schema && zodResolver(schema),
  });
  const [dateRegister, setDateRegister] = useState<Date | any>();
  const [errorDateRegister, setErrorDateRegister] = useState<boolean>(false);

  const { run: runCreateVeficles, loading } = useRequest(createBookVeficles, {
    manual: true,
    onError: showError,
    onSuccess: () => {
      methods.reset();
      showSuccess('Create Book Success!');
      onSuccess();
    },
  });

  const handleSubmit = (values: BookingFormValues) => {
    if (loading) return;
    const body = values || {};
    body.datetime_start = moment(dateRegister).format('YYYY-MM-DD HH:mm:ss');
    runCreateVeficles(requestDetail?.id, values);
  };

  return (
    <div>
      <div style={{ minWidth: 450 }} className="account-content bg-white">
        <h4>Create Booking </h4>
        <form
          style={{ marginTop: 20 }}
          className="lt-form"
          onSubmit={methods.handleSubmit((e) => {
            if (!dateRegister) {
              setErrorDateRegister(true);
              return;
            }
            handleSubmit(e);
          })}
        >
          <div className="form-group">
            <span>Customer Name</span>
            <input className="form-control" placeholder="Customer Name " {...methods.register('customer_name')} />
            <ErrorMessage message={methods.formState.errors['customer_name']?.message} />
          </div>
          <div className="form-group">
            <span>Phone Number</span>
            <input
              type="customer_phone"
              className="form-control"
              placeholder="Phone number"
              {...methods.register('customer_phone')}
            />
            <ErrorMessage message={methods.formState.errors['customer_phone']?.message} />
          </div>
          <div className="form-group">
            <span>Pick up Place</span>
            <input className="form-control" placeholder="Place" {...methods.register('pickup_place')} />
            <ErrorMessage message={methods.formState.errors['pickup_place']?.message} />
          </div>
          <div className="form-group">
            <span>Time</span>
            <DateTimePicker
              className="form-control"
              calendarIcon={null}
              value={dateRegister ? dateRegister : undefined}
              onChange={(date: any) => {
                setDateRegister(date);
                setErrorDateRegister(false);
              }}
              minDate={new Date()}
            />
            <ErrorMessage message={errorDateRegister ? ' Time is required' : ''} />
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
              type={'submit'}
              className="btn btn-primary d-block"
            >
              Book
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
