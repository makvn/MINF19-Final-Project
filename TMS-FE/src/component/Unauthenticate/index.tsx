import { useAuth } from '@/lib/auth';
import { Link } from 'react-router-dom';
import { AuthLayout } from '@/features/admin';

const styleButton = {
  borderWidth: 0,
  backgroundColor: '#02a4f4',
  padding: 10,
  paddingRight: 20,
  paddingLeft: 20,
  borderRadius: 4,
  marginTop: 30,
  color: 'white',
};
export const Unauthenticate = (props: any) => {
  const { user } = useAuth();
  const { children } = props;
  return user ? (
    children
  ) : (
    <div>
      <AuthLayout>
        <div style={{ textAlign: 'center', padding: 30, paddingTop: 100 }} className="main">
          <div style={{ marginBottom: 20, fontSize: 26 }}>Sorry, please login to access this page.</div>
          <Link style={styleButton} to="/auth/login" className="color">
            Login
          </Link>
        </div>
      </AuthLayout>
    </div>
  );
};
