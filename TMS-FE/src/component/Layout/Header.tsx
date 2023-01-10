import { Navbar } from '@/component/Layout/Navbar';
import { Link } from 'react-router-dom';

type HeadProps = {
  title?: string;
  description?: string;
};

export const Header = ({ title = '', description = '' }: HeadProps = {}) => {
  return (
    <div>
      <header className="tl-header">
        <div className="tl-topbar">
          <div className="container">
            <div className="d-flex justify-content-between">
              <div className="left-content">
                <ul className="global-list">
                  <li>
                    <span className="icon">
                      <img src="assets/images/others/icon1.png" alt="Image" className="img-fluid" />
                    </span>
                    <a href="tel:+9985260948">+99 852 60948</a>
                  </li>
                  <li>
                    <span className="icon">
                      <img src="assets/images/others/icon2.png" alt="Image" className="img-fluid" />
                    </span>
                    <a href="@/component/Layout/Header#">info@gmail.com</a>
                  </li>
                </ul>
              </div>
              {/* /.left-content */}
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
                {/* /.topbar-user */}
              </div>
              {/* /.right-content */}
            </div>
          </div>
          {/* /.container */}
        </div>
        {/* /.tl-topbar */}
        <div className="header-middle">
          <div className="container">
            <a className="navbar-brand" href="../../../index.html">
              <img src="assets/images/logo.png" alt="Logo" className="img-fluid" />
            </a>
            <div className="contacts align-self-center">
              <ul className="global-list">
                <li>
                  <div className="info-box">
                    <div className="icon">
                      <i className="fa fa-clock-o" aria-hidden="true" />
                    </div>
                    <div className="text align-self-center">
                      <span>08:00 AM - 06: 00 PM</span>
                      <strong>Monday - Friday</strong>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="info-box">
                    <div className="icon">
                      <i className="fa fa-map-marker" aria-hidden="true" />
                    </div>
                    <div className="text align-self-center">
                      <span>183 Donato Parkway</span>
                      <strong>CA, United States</strong>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="info-box">
                    <div className="icon">
                      <i className="fa fa-phone" aria-hidden="true" />
                    </div>
                    <div className="text align-self-center">
                      <span>Service Available</span>
                      <strong>(+00)888.666.88</strong>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
            {/* /.contacts */}
          </div>
        </div>
        {/* /.header-middle */}
        <Navbar />
        {/* /.tl-menu */}
      </header>
      {/* /.tl-header */}
    </div>
  );
};
