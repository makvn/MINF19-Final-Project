import { AuthLayout } from '@/features/admin';
import { useState } from 'react';
import Modal from 'react-modal';
import { RequestTable } from '@/features/request';
import { CreateBookingForm } from './CreateBookingForm';
import { useDebounce, useRequest } from 'ahooks';
import { endBookVeficles } from '@/features/admin/api/vehicles';
import { showError, showSuccess } from '@/utils/global';
import { get } from 'lodash';
import { getStatusBooking, getStatusVehicle, STATUS_ACCOUNT, STATUS_BOOKING } from '../utils/global';
import { isHasPermissionAdmin } from '@/utils/permission';
import { useAuth } from '@/lib/auth';
import { Confirm } from '@/component/Confirm';
import { useGetVehicles } from '@/features/vehicles/api';
import { queryClient } from '@/lib/react-query';
import { CustomPagination } from '@/component/Element/CustomPagination';
import { Spin } from '@/component/Spin';
import { ErrorMessage } from '@/component/Form';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

const schema = z.object({
  amount: z.string().min(1, 'Amount is required'),
});

type TableRequestListProps = {
  id: string;
  brand: string;
  type: string;
  licensePlates: string;
  weight: string;
  status: string;
  yearManufacture: string;
  address: string;
  userId: string;
  driverId: string;
  documentID: string;
  createdBy?: string;
  fullName: string;
  registerDate: any;
  expireDate: any;
  [key: string]: any;
};

interface EndBookingFormValues {
  amount: string;
}

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    zIndex: 99999999999,
  },
};

export const RequestList = () => {
  const [showModal, setShowModal] = useState(false);
  const [showModalConfirm, setShowModalConfirm] = useState(false);

  const [valueSearch, setValueSearch] = useState<string>('');
  const [status, setStatus] = useState<string>('All');
  const debouncedSearch = useDebounce(valueSearch, { wait: 300 });

  const [requestDetail, setRequestDetail] = useState<any>();
  const { user } = useAuth();
  const isHasPermission = isHasPermissionAdmin(get(user, 'role', get(user, 'user.role')));
  const [page, setPage] = useState<number>(1);
  const methods = useForm<EndBookingFormValues>({
    resolver: schema && zodResolver(schema),
  });

  const handleClear = () => {
    setValueSearch('');
    setStatus('All');
  };
  const handleChangeText = (event: any) => {
    setValueSearch(event?.target?.value);
  };

  const { data, isLoading } = useGetVehicles({
    params: {
      page: page,
      onlyBooked: true,
      status: status,
      search: debouncedSearch,
    },
    config: {
      onError: showError,
      enabled: true,
      keepPreviousData: true,
    },
  });

  // const { run, data } = useRequest(getListVeficles, {
  //   manual: true,
  //   onError: showError,
  // });

  const { run: runEndBooking, loading } = useRequest(endBookVeficles, {
    manual: true,
    onError: showError,
    onSuccess: () => {
      setRequestDetail(undefined);
      methods.reset();
      setShowModalConfirm(false);
      showSuccess('Success!');
      refreshVehicles();
    },
  });

  const refreshVehicles = () => {
    queryClient.invalidateQueries({ queryKey: ['vehicles'] });
  };
  const handleSelectStatus = (event: any) => {
    setStatus(event?.target?.value);
  };

  const handleEndBooking = (amount: number) => {
    runEndBooking(requestDetail?.id, { amount });
  };

  return (
    <div>
      <AuthLayout>
        <div className="main">
          <div className="main-title">
            <h1 className="db-title">Booking Management</h1>
          </div>

          <div className="main-header">
            <div className="search-box">
              <div className="row">
                <div className="col-md-3">
                  <div className="form-group">
                    <select
                      value={status}
                      onChange={handleSelectStatus}
                      placeholder="Select Status"
                      className="form-control"
                    >
                      <option value={'All'}>Select Status</option>
                      <option value={STATUS_ACCOUNT.ACTIVE}>Active</option>
                      <option value={STATUS_ACCOUNT.INACTIVE}>InActive</option>
                      <option value={STATUS_ACCOUNT.PENDING}>Pending</option>
                    </select>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <input
                      placeholder="Search..."
                      type="text"
                      name="user-name"
                      id="user-name"
                      onChange={handleChangeText}
                      value={valueSearch}
                      className="form-control"
                    />
                  </div>
                </div>
                <div className="col-md-2">
                  <div className="form-group">
                    <button className="button-clear" onClick={handleClear}>
                      Clear
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="properties properties-table bg-white">
            <RequestTable<TableRequestListProps>
              data={get(data, 'data.data', [])}
              columns={[
                {
                  Header: 'Id',
                  accessor: 'id',
                },
                {
                  Header: 'brand',
                  accessor: 'brand',
                },
                {
                  Header: 'Type',
                  accessor: 'type',
                },
                {
                  Header: 'License Plates',
                  accessor: 'licensePlates',
                },
                {
                  Header: 'Tonnage',
                  accessor: 'weight',
                },

                {
                  Header: 'Status',
                  accessor: 'status',
                  Cell(entry) {
                    const infoStatus = getStatusVehicle(entry?.value);
                    return <span style={{ color: infoStatus.color }}>{infoStatus.label}</span>;
                  },
                },
                {
                  Header: 'Request',
                  accessor: 'request',
                  Cell(row) {
                    const isActive = row?.row?.original?.status === STATUS_ACCOUNT.ACTIVE;
                    if (!isActive || !isHasPermission) return null;
                    const statusInfo = getStatusBooking(row?.row?.original?.bookingStatus);
                    if (!statusInfo) return null;
                    return (
                      <button
                        style={{
                          borderWidth: 0,
                          backgroundColor: statusInfo.color,
                          padding: 5,
                          paddingRight: 10,
                          paddingLeft: 10,
                          borderRadius: 4,
                          color: 'white',
                        }}
                        type={'button'}
                        onClick={() => {
                          setRequestDetail(row?.row?.original);
                          if (statusInfo.status === STATUS_BOOKING.BOOKED) {
                            setShowModalConfirm(true);
                          } else {
                            setShowModal(true);
                          }
                        }}
                      >
                        {statusInfo.label}
                      </button>
                    );
                  },
                },
              ]}
            />
          </div>
          {get(data, 'data.data.data', [])?.length || page !== 1 ? (
            <CustomPagination
              currentPage={page}
              onPageChange={(page) => setPage(page)}
              totalCount={data?.data.meta.total || 0}
            />
          ) : null}
        </div>
        <Modal isOpen={showModal} style={customStyles}>
          <CreateBookingForm
            onSuccess={() => {
              setRequestDetail(undefined);
              setShowModal(false);
              refreshVehicles();
            }}
            onClose={() => {
              setRequestDetail(undefined);
              setShowModal(false);
            }}
            requestDetail={requestDetail}
          />
        </Modal>
        <Modal isOpen={showModalConfirm} style={customStyles}>
          <Confirm
            onConfirm={() => {
              const body = methods.getValues();
              try {
                if (!body?.amount) {
                  methods.setError('amount', { message: 'Amount is required!' });
                  return;
                }
                const amount = parseFloat(body?.amount);
                handleEndBooking(amount);
                methods.clearErrors();
              } catch (e) {
                methods.setError('amount', { message: 'Amount is number!' });
              }
            }}
            onClose={() => {
              setRequestDetail(undefined);
              setShowModalConfirm(false);
            }}
            loading={loading}
            message={'Do you want to end booking ?'}
          >
            <form style={{ marginTop: 20 }} className="lt-form">
              <div className="form-group">
                <span>Amount</span>
                <input className="form-control" placeholder="Amount " {...methods.register('amount')} />
                <ErrorMessage message={methods.formState.errors['amount']?.message} />
              </div>
            </form>
          </Confirm>
        </Modal>
        <Spin isVisible={loading || isLoading} />
      </AuthLayout>
    </div>
  );
};
