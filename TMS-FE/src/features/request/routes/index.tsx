import { Navigate, Route, Routes } from 'react-router-dom';
import { RequestList } from '@/features/request';
import { AccountList } from '@/features/accounts/routes/AccountList';
import { AccountCreate } from '@/features/accounts/routes/AccountCreate';
import { Unauthenticate } from '@/component/Unauthenticate';

export const RequestRoutes = () => {
  return (
    <Routes>
      <Route
        path="account/list"
        element={
          <Unauthenticate>
            <AccountList />
          </Unauthenticate>
        }
      />
      <Route
        path="account/create"
        element={
          <Unauthenticate>
            <AccountCreate />
          </Unauthenticate>
        }
      />
      <Route
        path="management/list"
        element={
          <Unauthenticate>
            <RequestList />
          </Unauthenticate>
        }
      />
      <Route path="*" element={<Navigate to="." />} />
    </Routes>
  );
};
