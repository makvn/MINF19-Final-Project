import { Navigate, Route, Routes } from 'react-router-dom';
import { AccountList } from './AccountList';
import { AccountCreate } from './AccountCreate';
import { Unauthenticate } from '@/component/Unauthenticate';

export const AccountRoutes = () => {
  return (
    <Routes>
      <Route
        path="list"
        element={
          <Unauthenticate>
            <AccountList />
          </Unauthenticate>
        }
      />
      <Route
        path="create"
        element={
          <Unauthenticate>
            <AccountCreate />
          </Unauthenticate>
        }
      />
      <Route path="*" element={<Navigate to="." />} />
    </Routes>
  );
};
