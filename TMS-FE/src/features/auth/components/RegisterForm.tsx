import * as React from 'react';
import { Link } from 'react-router-dom';
import * as z from 'zod';
import { useAuth } from '@/lib/auth';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { RegisterCredentialsDTO } from '@/features/auth';
import { ErrorMessage } from '@/component/Form/ErrorMessage';
import { showError } from '@/utils/global';
import { Spin } from '@/component/Spin';

const schema = z.object({
  email: z.string().min(1, 'Required'),
  firstName: z.string().min(1, 'Required'),
  lastName: z.string().min(1, 'Required'),
  password: z.string().min(1, 'Required'),
  affiliation: z.string().min(1, 'Required'),
});

type RegisterValues = RegisterCredentialsDTO;

type RegisterFormProps = {
  onSuccess: () => void;
};

export const RegisterForm = ({ onSuccess }: RegisterFormProps) => {
  const { register, isRegistering } = useAuth();

  const methods = useForm<RegisterValues>({
    resolver: schema && zodResolver(schema),
  });

  const handleRegister = (values: RegisterValues) => {
    register(values, { onSuccess, onError: showError });
  };

  return (
    <div className="lt-page-content bg-color">
      <div className="lt-section">
        <div className="section-content lt-account section-padding">
          <div className="account-content bg-white">
            <h2>Sign Up For Account</h2>
            <form className="lt-form" onSubmit={methods.handleSubmit(handleRegister)}>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Affiliation"
                  {...methods.register('affiliation')}
                />
                <div className="input-addon">
                  <i className="fa fa-link" aria-hidden="true" />
                </div>
              </div>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Fist Name"
                  {...methods.register('firstName')}
                />
                <div className="input-addon">
                  <i className="fa fa-user-o" aria-hidden="true" />
                </div>
              </div>
              <div className="form-group">
                <input type="text" className="form-control" placeholder="Last Name" {...methods.register('lastName')} />
                <div className="input-addon">
                  <i className="fa fa-user-o" aria-hidden="true" />
                </div>
              </div>
              <div className="form-group">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Email Address "
                  {...methods.register('email')}
                />
                <ErrorMessage message={methods.formState.errors['email']?.message} />

                <div className="input-addon">
                  <i className="fa fa-envelope-o" aria-hidden="true" />
                </div>
              </div>
              <div className="form-group">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  {...methods.register('password')}
                />
                <div className="input-addon">
                  <i className="fa fa-lock" aria-hidden="true" />
                </div>
              </div>
              {/* <div className="form-group"> */}
              {/*   <input type="password" className="form-control" placeholder="Repeat-Password" /> */}
              {/*   <div className="input-addon"> */}
              {/*     <i className="fa fa-lock" aria-hidden="true" /> */}
              {/*   </div> */}
              {/* </div> */}
              {/* <div className="form-group"> */}
              {/*   <select className="form-control"> */}
              {/*     <option value="subscriber">Subscriber Type </option> */}
              {/*     <option value="visitor">Visitor</option> */}
              {/*     <option value="customer">Customer</option> */}
              {/*   </select> */}
              {/* </div> */}
              {/* <div className="form-group tnc"> */}
              {/*   <input type="checkbox" name="tnc" id="tnc" /> */}
              {/*   <label htmlFor="tnc"> */}
              {/*     I agree with <Link href="#">* terms &amp; conditions</Link> */}
              {/*   </label> */}
              {/* </div> */}
              {/* <button className="btn btn-primary d-block">Sign up</button> */}
              <button type={'submit'} className="btn w-100 btn-primary d-block">
                Sign Up
              </button>
              <div className="account-link justify-content-between d-flex">
                <span>
                  Have an account?{' '}
                  <Link to="/auth/login" className="color">
                    Login
                  </Link>
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>

      <Spin isVisible={isRegistering} /> 
    </div>
  );
};
