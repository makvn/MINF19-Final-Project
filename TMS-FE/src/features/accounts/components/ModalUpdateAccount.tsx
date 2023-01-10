import { ErrorMessage } from '@/component/Form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

type UpdateValues = {
  firstName: string;
  lastName: string;
  email: string;
};

const schema = z.object({
  email: z.string().min(1, 'Required'),
  firstName: z.string().min(1, 'Required'),
  lastName: z.string().min(1, 'Required'),
});

interface IProps {
  onClose: () => void;
}

export const ModalUpdateAccount = ({ onClose }: IProps) => {
  const methods = useForm<UpdateValues>({
    resolver: schema && zodResolver(schema),
  });

  return (
    <div>
      <form
        className={'lt-form'}
        onSubmit={methods.handleSubmit((values) => {
          console.log('values');
        })}
      >
        <h4>Account Information</h4>

        <div className="row">
          <div className={'col-md-6 col-sm-12'}>
            <div className="form-group">
              <input className="form-control" placeholder="Email Address " {...methods.register('email')} />
              <ErrorMessage message={methods.formState.errors['email']?.message} />
              <div className="input-addon">
                <i className="fa fa-envelope-o" aria-hidden="true" />
              </div>
            </div>
          </div>
          <div className="col-md-6 col-sm-12">
            <div className="form-group">
              <input className="form-control" placeholder="Email Address " {...methods.register('email')} />
              <ErrorMessage message={methods.formState.errors['email']?.message} />
              <div className="input-addon">
                <i className="fa fa-envelope-o" aria-hidden="true" />
              </div>
            </div>
          </div>
          <div className="col-md-6 col-sm-12">
            <div className="form-group">
              <input className="form-control" placeholder="Email Address " {...methods.register('email')} />
              <ErrorMessage message={methods.formState.errors['email']?.message} />
              <div className="input-addon">
                <i className="fa fa-envelope-o" aria-hidden="true" />
              </div>
            </div>
          </div>
          <div className="col-md-6 col-sm-12">
            <div className="form-group">
              <input className="form-control" placeholder="Email Address " {...methods.register('email')} />
              <ErrorMessage message={methods.formState.errors['email']?.message} />
              <div className="input-addon">
                <i className="fa fa-envelope-o" aria-hidden="true" />
              </div>
            </div>
          </div>
          <div className="col-md-6 col-sm-12">
            <div className="form-group">
              <input className="form-control" placeholder="Email Address " {...methods.register('email')} />
              <ErrorMessage message={methods.formState.errors['email']?.message} />
              <div className="input-addon">
                <i className="fa fa-envelope-o" aria-hidden="true" />
              </div>
            </div>
          </div>
          <div className="col-md-6 col-sm-12">
            <div className="form-group">
              <input className="form-control" placeholder="Email Address " {...methods.register('email')} />
              <ErrorMessage message={methods.formState.errors['email']?.message} />
              <div className="input-addon">
                <i className="fa fa-envelope-o" aria-hidden="true" />
              </div>
            </div>
          </div>
        </div>
        <div className="row justify-content-end" style={{ gap: 5 }}>
          <div className="col-md-2 col-sm-12">
            <div className="d-flex justify-content-end">
              <button type={'button'} className={'w-100 d-block btn btn-secondary p-2'} onClick={onClose}>
                Close
              </button>
            </div>
          </div>
          <div className="col-md-2 col-sm-12">
            <div className="d-flex justify-content-end">
              <button type={'submit'} className={'w-100 d-block btn btn-primary p-2'}>
                Add
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
