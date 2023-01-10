import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { lazyImport } from '@/utils/lazyImport';
import { ReportRoutes } from '@/features/report';

const { AccountRoutes } = lazyImport(() => import('@/features/accounts'), 'AccountRoutes');
const { VehicleRoutes } = lazyImport(() => import('@/features/vehicles'), 'VehicleRoutes');
const { RequestRoutes } = lazyImport(() => import('@/features/request'), 'RequestRoutes');

const App = () => {
  return (
    <Suspense fallback={<div className="w-100 h-100">Loading...</div>}>
      <Outlet />
    </Suspense>
  );
};

export const adminRoutes = [
  {
    path: '/admin',
    element: <App />,
    errorElement: <div>error</div>,
    children: [
      {
        path: 'account/*',
        element: <AccountRoutes />,
      },
      {
        path: 'vehicle/*',
        element: <VehicleRoutes />,
      },
      {
        path: 'request/*',
        element: <RequestRoutes />,
      },
      {
        path: 'report/*',
        element: <ReportRoutes />,
      },
      {
        path: '',
        element: <div>Not found</div>,
      },
      {
        path: '*',
        element: <div>Not found</div>,
      },
    ],
  },
];
