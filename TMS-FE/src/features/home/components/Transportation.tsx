import placeholderImg from '@/assets/images/property/1.jpg';
import { useAuth } from '@/lib/auth';
import { Link } from 'react-router-dom';
import { BookingItem } from './Home';

interface TransportationProps {
  isHasPermission: boolean;
  bookingDetail: BookingItem;
  handleBooking?: (bookingDetail: BookingItem) => void;
}
export const Transportation = (props: TransportationProps) => {
  const { isHasPermission, handleBooking, bookingDetail } = props;
  const { user } = useAuth();
  return (
    <div className="col-md-6 col-lg-3">
      <div className="property">
        <div className="thumb">
          <img src={placeholderImg} alt="Property" className="img-fluid" />
          <div className="overlay">
            <div className="property-status">
              {isHasPermission ? (
                <button
                  style={{
                    height: 30,
                    borderWidth: 0,
                    borderRadius: 4,
                    paddingLeft: 15,
                    paddingRight: 15,
                    backgroundColor: '#179bee',
                  }}
                  onClick={() => handleBooking?.(bookingDetail)}
                >
                  Book
                </button>
              ) : null}
              {!user ? <Link to="/auth/register">Sign up/Login</Link> : null}
            </div>
          </div>
        </div>
        <div className="property-info">
          <div className="info-top">
            <h2>{`Car Brand : ${bookingDetail?.brand}`}</h2>
            <div className="meta">
              <ul className="global-list">
                <li>{`Type: ${bookingDetail?.type}`}</li>
                <li>{`Car Number:  ${bookingDetail?.carNumber}`}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
