import { AuthHeader, AuthSidebar } from '@/features/admin';
import { ReactNode, useEffect } from 'react';
import { useAuth } from '@/lib/auth';
import { useNavigate, useLocation } from 'react-router-dom';

interface TProps {
  children: ReactNode;
}

export const AuthLayout = ({ children }: TProps) => {
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname === '/auth/login' || location.pathname === '/auth/register') return;

    if (!user) {
      navigate('/auth/login');
    }
  }, [user, location.pathname]);

  return (
    <div>
      <header className="tl-header db-header">
        <AuthSidebar />
        <AuthHeader />
      </header>
      {/* /.tl-menu */}
      <div className="tl-section h-100">
        <div className="tl-dashboard bg-color">
          <div
            className="container-fluid p-0"
            style={{
              minHeight: '100vh',
            }}
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};
