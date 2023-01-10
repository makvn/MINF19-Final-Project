import { Navigate, Route, Routes } from 'react-router-dom';
import { VehicleList } from '@/features/vehicles';
import { VehicleCreate } from '../components/VehicleCreate';
import { Unauthenticate } from '@/component/Unauthenticate';

export const VehicleRoutes = () => {
  return (
    <Routes>
      <Route
        path="list"
        element={
          <Unauthenticate>
            <VehicleList />
          </Unauthenticate>
        }
      />
      <Route
        path="create"
        element={
          <Unauthenticate>
            <VehicleCreate />
          </Unauthenticate>
        }
      />
      <Route path="*" element={<Navigate to="." />} />
    </Routes>
  );
};
