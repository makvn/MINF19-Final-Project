import * as z from 'zod';
import { useAuth } from '@/lib/auth';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from 'react-router-dom';
import { ErrorMessage } from '@/component/Form/ErrorMessage';
import { LoginCredentialsDTO } from '@/features/auth';
import { Spin } from '@/component/Spin';
import { showError } from '@/utils/global';

const schema = z.object({
  email: z.string().email('Email address not valid.').min(1, 'Email address is required'),
  password: z.string().min(1, 'Password is required'),
});

type LoginValues = LoginCredentialsDTO;

type LoginFormProps = {
  onSuccess: () => void;
};

export const LoginForm = ({ onSuccess }: LoginFormProps) => {
  const { login, isLoggingIn } = useAuth();
  const methods = useForm<LoginValues>({
    resolver: schema && zodResolver(schema),
  });

  const handleLogin = (values: LoginValues) => {
    login(values, { onSuccess, onError: showError });
  };

  return (
    <div>
      {/* /.lt-breadcrumb */}
      <div className="lt-page-content bg-color">
        <div className="lt-section">
          <div className="section-content lt-account section-padding">
            <div className="account-content bg-white">
              <h2>Login Into Account</h2>
              <form className="lt-form" onSubmit={methods.handleSubmit(handleLogin)}>
                <div className="form-group">
                  <input className="form-control" placeholder="Email Address " {...methods.register('email')} />
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
                <button type={'submit'} className="btn btn-primary d-block">
                  Login
                </button>
                <div className="account-link justify-content-between d-flex">
                  <span>
                    Don’t have an account?{' '}
                    <Link to="/auth/register" className="color">
                      Sign up
                    </Link>
                  </span>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Spin isVisible={isLoggingIn} />
    </div>
  );
};
