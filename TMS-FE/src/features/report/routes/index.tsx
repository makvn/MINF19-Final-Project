import { Navigate, Route, Routes } from 'react-router-dom';
import { Unauthenticate } from '@/component/Unauthenticate';
import { Report } from '../components';

export const ReportRoutes = () => {
  return (
    <Routes>
      <Route
        path="/dashboard"
        element={
          <Unauthenticate>
            <Report />
          </Unauthenticate>
        }
      />
      <Route path="*" element={<Navigate to="." />} />
    </Routes>
  );
};
