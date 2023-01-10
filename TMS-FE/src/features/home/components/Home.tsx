import { Spin } from '@/component/Spin';
import { AuthLayout } from '@/features/admin';
import { getListVeficles } from '@/features/admin/api/vehicles';
import { Transportation } from '@/features/home';
import { CreateBookingForm } from '@/features/request/components/CreateBookingForm';
import { useAuth } from '@/lib/auth';
import { showError } from '@/utils/global';
import { isHasPermissionAdmin } from '@/utils/permission';
import { useRequest } from 'ahooks';
import { get, map } from 'lodash';
import { useEffect, useState } from 'react';
import Modal from 'react-modal';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    zIndex: 99999999999,
    backgroundColor: 'white',
  },
};
export interface BookingItem {
  id: number;
  brand: string;
  type: string;
  carNumber: string;
  weight: number;
  type_of_fuel: string;
  status: string;
  book_by: any;
  book_at: any;
  booking_status: string;
}
export const Home = () => {
  const { user } = useAuth();
  const [requestDetail, setRequestDetail] = useState<BookingItem>();
  const [showModal, setShowModal] = useState(false);

  const { run, data, loading } = useRequest(getListVeficles, {
    manual: true,
    onError: showError,
  });

  useEffect(() => {
    run({
      'status[eq]': 'AC',
    });
  }, []);

  const handleBooking = (bookingDetail: BookingItem) => {
    setRequestDetail(bookingDetail);
    setShowModal(true);
  };

  const isHasPermission = isHasPermissionAdmin(get(user, 'role', get(user, 'user.role')));
  return (
    <>
      <AuthLayout>
        <div className="main">
          <div className="lt-section">
            <div className="section-content property-content property-content-home">
              <div className="row">
                {get(data, 'data.data', [])?.length
                  ? map(get(data, 'data.data'), (e) => {
                      return (
                        <Transportation
                          handleBooking={handleBooking}
                          key={e?.id}
                          bookingDetail={e}
                          isHasPermission={isHasPermission}
                        />
                      );
                    })
                  : null}
              </div>
            </div>
          </div>
          <Modal isOpen={showModal} style={customStyles}>
            <CreateBookingForm
              onSuccess={() => {
                setRequestDetail(undefined);
                setShowModal(false);
                run({
                  'status[eq]': 'AC',
                });
              }}
              onClose={() => {
                setRequestDetail(undefined);
                setShowModal(false);
              }}
              requestDetail={requestDetail}
            />
          </Modal>
          <Spin isVisible={loading} />
        </div>
      </AuthLayout>
    </>
  );
};
