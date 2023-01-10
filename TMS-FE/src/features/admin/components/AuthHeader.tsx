import { Link } from 'react-router-dom';
import { ADMIN_ROUTES } from '@/features/admin';
import logo from '@/assets/images/logo.png';
import logoSm from '@/assets/images/logo-sm.png';
import { useAuth } from '@/lib/auth';
import { useMemo } from 'react';
import storage from '@/utils/storage';
import { get, includes, map } from 'lodash';

export const AuthHeader = () => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    storage.clearToken();
    // window.open('auth/login');
  };
  const renderUser = useMemo(() => {
    return (
      <div className="right-content">
        <div className="tl-user-option align-self-center">
          <div className="tl-user align-self-center">
            <div className="author dropdown">
              <div
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: '50%',
                  background: 'var(--gray)',
                  cursor: 'pointer',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  fontSize: 24,
                }}
                className="dropdown-toggle"
                id="tl-dropdown"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <i className="fa fa-user" />
              </div>
              <div className="dropdown-menu" aria-labelledby="tl-dropdown">
                <button onClick={handleLogout} className="dropdown-item text-danger">
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }, [user]);
  const renderAuth = useMemo(() => {
    return (
      <div className="right-content align-self-center">
        <div className="topbar-user">
          <span style={{ color: 'white' }}>
            <Link style={{ color: 'white' }} to="/auth/login" className="color">
              Login
            </Link>{' '}
            |{' '}
            <Link style={{ color: 'white' }} to="/auth/register" className="color">
              Sign up
            </Link>
          </span>
        </div>
      </div>
    );
  }, [user]);

  return (
    <div className="tl-menu menu-absolute menu-sticky">
      <nav className="navbar navbar-expand-lg p-0">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            <img src={logo} alt="Logo" className="img-fluid logo-lg" />
            <img src={logoSm} alt="Logo" className="img-fluid logo-sm" />
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon">
              <i className="fa fa-align-justify" />
            </span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              {ADMIN_ROUTES.map((route, index) =>
                route?.children?.length ? (
                  <li key={index} className="tl-dropdown">
                    {route?.perm?.length ? (
                      includes(route?.perm, get(user, 'role', get(user, 'user.role'))) ? (
                        <Link to={''}>{route.label}</Link>
                      ) : null
                    ) : (
                      <Link to={''}>{route.label}</Link>
                    )}
                    <ul className="tl-dropdown-menu">
                      {map(route?.children, (e) =>
                        e?.perm?.length ? (
                          includes(e?.perm, get(user, 'role', get(user, 'user.role'))) ? (
                            <li key={e.path}>
                              <Link key={e.path} to={e.path}>
                                {e.label}
                              </Link>
                            </li>
                          ) : null
                        ) : (
                          <li key={e.path}>
                            <Link to={e.path}>{e.label}</Link>
                          </li>
                        ),
                      )}
                    </ul>
                    {route?.perm?.length ? (
                      includes(route?.perm, get(user, 'role', get(user, 'user.role'))) ? (
                        <i key={index} className="fa fa-angle-down icon" aria-hidden="true"></i>
                      ) : null
                    ) : (
                      <i key={index} className="fa fa-angle-down icon" aria-hidden="true"></i>
                    )}
                  </li>
                ) : route?.perm?.length ? (
                  includes(route?.perm, get(user, 'role', get(user, 'user.role'))) ? (
                    <li key={route.path}>
                      <Link to={route.path}>{route.label}</Link>
                    </li>
                  ) : null
                ) : (
                  <li key={route.path}>
                    <Link to={route.path}>{route.label}</Link>
                  </li>
                ),
              )}
            </ul>
          </div>

          {user ? renderUser : renderAuth}
        </div>
      </nav>
    </div>
  );
};
