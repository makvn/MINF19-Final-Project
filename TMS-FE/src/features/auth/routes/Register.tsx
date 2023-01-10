import { useNavigate } from 'react-router-dom';
import { RegisterForm } from '@/features/auth';
import { AuthLayout } from '@/features/admin';

export const Register = () => {
  const navigate = useNavigate();

  return (
    <div>
      <AuthLayout>
        <RegisterForm onSuccess={() => navigate('/')} />
      </AuthLayout>
    </div>
  );
};
