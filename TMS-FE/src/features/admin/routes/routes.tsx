import { PERMISSION_APP } from '@/utils/global';

export interface ADMIN_ROUTE_TYPE {
  path: string;
  label: string;
  children?: ADMIN_ROUTE_TYPE[];
  perm?: string[];
}
export const ADMIN_ROUTES: ADMIN_ROUTE_TYPE[] = [
  {
    path: '/',
    label: 'Home',
  },
  {
    path: '/admin/vehicle/list',
    label: 'Vehicle Management',
  },
  {
    path: '/admin/request',
    label: 'Request Management',
    perm: [PERMISSION_APP.ADMIN, PERMISSION_APP.SUPER_ADMIN],
    children: [
      {
        path: '/admin/request/account/list',
        label: 'Account Management',
        perm: [PERMISSION_APP.ADMIN, PERMISSION_APP.SUPER_ADMIN],
      },
      {
        path: '/admin/request/management/list',
        label: 'Booking Management',
        perm: [PERMISSION_APP.ADMIN, PERMISSION_APP.SUPER_ADMIN],
      },
    ],
  },

  {
    path: '/admin/report/dashboard',
    label: 'Report ',
    perm: [PERMISSION_APP.ADMIN, PERMISSION_APP.SUPER_ADMIN],
  },
];
