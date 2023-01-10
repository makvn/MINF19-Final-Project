import { AuthLayout } from '@/features/admin';
import { useState } from 'react';
import { Table } from '@/component/Element';
import Modal from 'react-modal';
import { ModalUpdateAccount } from '@/features/accounts';
import { Spin } from '@/component/Spin';
import { get } from 'lodash';
import { getStatusAccount } from '../utils/global';
import { useGetAccounts } from '@/features/accounts/api';
import { CustomPagination } from '@/component/Element/CustomPagination';

type TableProps = {
  id: string;
  userAccount: string;
  fullName: string;
  email: string;
  registerDate: Date;
  createdBy: string;
  role: string;
  status: string;
  lastName: string;
  firstName: string;
};
const customStyles = {
  content: {
    width: '60%',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};
export const AccountList = () => {
  const [showModal, setShowModal] = useState(false);
  const [page, setPage] = useState<number>(1);
  const [dateRange, setDateRange] = useState<Date[]>([new Date(), new Date()]);

  const { data, isLoading: loading } = useGetAccounts({
    params: {
      page: page,
    },
    config: {
      enabled: true,
      keepPreviousData: true,
    },
  });

  return (
    <div>
      <AuthLayout>
        <div className="main">
          <div className="main-title">
            <h1 className="db-title">Account Management</h1>
          </div>

          <div className="properties properties-table bg-white">
            <Table<TableProps>
              data={get(data, 'data.data', [])}
              columns={[
                {
                  title: 'User Account',
                  field: 'lastName',
                },
                {
                  title: 'Full name',
                  field: 'fullName',
                  Cell({ entry }) {
                    return <span>{entry?.lastName + ' ' + entry?.firstName}</span>;
                  },
                },
                {
                  title: 'Email',
                  field: 'email',
                },
                {
                  title: 'Status',
                  field: 'status',
                  Cell({ entry: { status } }) {
                    return <span>{getStatusAccount(status)}</span>;
                  },
                },
                {
                  title: 'Created By',
                  field: 'createdBy',
                  Cell({ entry: { createdBy } }) {
                    return <span>{createdBy}</span>;
                  },
                },
                {
                  title: 'Role',
                  field: 'role',
                },
              ]}
            />
          </div>
          {get(data, 'data.data', [])?.length || page !== 1 ? (
            <CustomPagination
              currentPage={page}
              onPageChange={(page) => setPage(page)}
              totalCount={data.data.meta.total}
            />
          ) : null}
        </div>
        <Modal isOpen={showModal} style={customStyles} contentLabel="Example Modal">
          <ModalUpdateAccount onClose={() => setShowModal(false)} />
        </Modal>
        <Spin isVisible={loading} />
      </AuthLayout>
    </div>
  );
};
