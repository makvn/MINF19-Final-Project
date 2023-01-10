import { useNavigate } from 'react-router-dom';
import { LoginForm } from '@/features/auth';
import { AuthLayout } from '@/features/admin';

export const Login = () => {
  const navigate = useNavigate();

  return (
    <div>
      <AuthLayout>
        {/* <Header /> */}
        {/* <Breadcrumb title={'Login'} paths={BREADCRUMB} /> */}
        {/* </div> */}
        <LoginForm onSuccess={() => navigate('/')} />
      </AuthLayout>
    </div>
  );
};
