import { AuthLayout } from '@/features/admin';
import { useState } from 'react';
import { Table } from '@/component/Element';
import Modal from 'react-modal';
import { Spin } from '@/component/Spin';
import { useDebounce, useRequest } from 'ahooks';
import { showError, showSuccess } from '@/utils/global';
import { actionApproveRejectVehicle, deleteVehicle } from '@/features/admin/api/vehicles';
import { get } from 'lodash';
import { getStatusVehicle, STATUS_ACCOUNT } from '@/features/request/utils/global';
import { Confirm } from '@/component/Confirm';
import { useGetVehicles } from '@/features/vehicles/api';
import { CustomPagination } from '@/component/Element/CustomPagination';
import { queryClient } from '@/lib/react-query';
import { VehicleEdit } from './VehicleEdit';
import { isHasPermissionAdmin } from '@/utils/permission';
import { useAuth } from '@/lib/auth';

type TableVehicleListProps = {
  id: string;
  brand: string;
  type: string;
  carNumber: string;
  weight: string;
  typeOfFuel: string;
  status: string;
  [key: string]: string;
};
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
export const VehicleList = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [vehicleDetail, setVehicleDetail] = useState<any>();
  const [page, setPage] = useState<number>(1);
  const [valueSearch, setValueSearch] = useState<string>('');
  const [status, setStatus] = useState<string>('All');
  const debouncedSearch = useDebounce(valueSearch, { wait: 300 });
  const [isDeleteVehicle, setDeleteVehicle] = useState<boolean>(false);
  //edit vehicle
  const [isShowModalEdit, setShowModalEdit] = useState<boolean>(false);
  const { user } = useAuth();
  const isHasPermission = isHasPermissionAdmin(get(user, 'role', get(user, 'user.role')));

  console.log({ isHasPermission, user });
  const { data, isLoading: loading } = useGetVehicles({
    params: {
      page: page,
      status: status,
      search: debouncedSearch,
      idDriver: isHasPermission ? undefined : get(user, 'user.id', user?.id),
    },
    config: {
      onError: showError,
      enabled: true,
      keepPreviousData: true,
    },
  });

  const { run: runApproveReject } = useRequest(actionApproveRejectVehicle, {
    manual: true,
    onError: showError,
    onSuccess: () => {
      setVehicleDetail(undefined);
      setShowModal(false);
      showSuccess('Success!');
      refreshVehicles();
    },
  });
  const { run: runDeleteVehicle, loading: loadingDelete } = useRequest(deleteVehicle, {
    manual: true,
    onError: showError,
    onSuccess: () => {
      setVehicleDetail(undefined);
      setDeleteVehicle(false);
      setShowModal(false);
      showSuccess('Success!');
      refreshVehicles();
    },
  });
  const refreshVehicles = () => {
    queryClient.invalidateQueries({ queryKey: ['vehicles'] });
  };

  const handleClear = () => {
    setValueSearch('');
    setStatus('All');
  };
  const handleChangeText = (event: any) => {
    setValueSearch(event?.target?.value);
  };
  const handleActionVehicle = (isReject: boolean) => {
    if (isDeleteVehicle && isReject) {
      setVehicleDetail(undefined);
      setDeleteVehicle(false);
      setShowModal(false);
    } else {
      if (isDeleteVehicle) {
        runDeleteVehicle(vehicleDetail?.id);
      } else {
        runApproveReject(vehicleDetail?.id, { status: isReject ? STATUS_ACCOUNT.INACTIVE : STATUS_ACCOUNT.ACTIVE });
      }
    }
  };
  const handleSelectStatus = (event: any) => {
    setStatus(event?.target?.value);
  };
  return (
    <div>
      <AuthLayout>
        <div className="main">
          <div className="main-title">
            <h1 className="db-title">Vehicle Management</h1>
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
            <Table<TableVehicleListProps>
              data={get(data, 'data.data', [])}
              columns={[
                {
                  title: 'Id',
                  field: 'id',
                },
                {
                  title: 'Brand',
                  field: 'brand',
                },
                {
                  title: 'Type',
                  field: 'type',
                },
                {
                  title: 'Car Number',
                  field: 'carNumber',
                },
                {
                  title: 'Weight',
                  field: 'weight',
                },
                {
                  title: 'Type of Fuel',
                  field: 'typeOfFuel',
                },
                {
                  title: 'Status',
                  field: 'status',
                  Cell(entry: any) {
                    const infoStatus = getStatusVehicle(entry?.entry?.status);
                    return <span style={{ color: infoStatus.color }}>{infoStatus.label}</span>;
                  },
                },
                {
                  title: 'Function',
                  field: '',
                  Cell(entry: any) {
                    const status = entry?.entry?.status;
                    return (
                      <div className="row">
                        {status === STATUS_ACCOUNT.PENDING ? (
                          <button
                            className={'btn btn-action'}
                            type={'button'}
                            onClick={() => {
                              setVehicleDetail(entry?.entry);
                              setShowModal(true);
                            }}
                            style={{ padding: undefined }}
                          >
                            Action
                          </button>
                        ) : null}
                        {status === STATUS_ACCOUNT.PENDING || status === STATUS_ACCOUNT.INACTIVE ? (
                          <>
                            <button
                              className={'btn  btn-edit'}
                              type={'button'}
                              onClick={() => {
                                setVehicleDetail(entry?.entry);
                                setShowModalEdit(true);
                              }}
                              style={{ padding: undefined }}
                            >
                              <i className="fa fa-pencil-square-o" aria-hidden="true" />
                            </button>
                            <button
                              className={'btn  btn-delete'}
                              type={'button'}
                              onClick={() => {
                                setDeleteVehicle(true);
                                setVehicleDetail(entry?.entry);
                                setShowModal(true);
                              }}
                              style={{ padding: undefined }}
                            >
                              <i className="fa fa-trash" aria-hidden="true" />
                            </button>
                          </>
                        ) : null}
                      </div>
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
        <Modal
          onRequestClose={() => {
            setDeleteVehicle(false);
            setVehicleDetail(undefined);
            setShowModal(false);
          }}
          ariaHideApp
          isOpen={showModal}
          style={customStyles}
        >
          <Confirm
            onConfirm={() => handleActionVehicle(false)}
            onClose={() => handleActionVehicle(true)}
            loading={loading}
            labelLeft={isDeleteVehicle ? 'Cancel' : 'Reject'}
            labelConfirm={isDeleteVehicle ? 'Confirm' : 'Approve'}
            styleLeft={{ backgroundColor: 'red', color: 'white' }}
            message={isDeleteVehicle ? 'Do you want to delete this vehicle ?' : 'Do you want to accept/reject book ?'}
          />
        </Modal>
        {isShowModalEdit ? (
          <Modal isOpen={isShowModalEdit} style={customStyles}>
            <VehicleEdit
              onSuccess={() => {
                setVehicleDetail(undefined);
                setShowModalEdit(false);
                refreshVehicles();
              }}
              onClose={() => {
                setVehicleDetail(undefined);
                setShowModalEdit(false);
              }}
              requestDetail={vehicleDetail}
            />
          </Modal>
        ) : null}
        <Spin isVisible={loading || loadingDelete} />
      </AuthLayout>
    </div>
  );
};
