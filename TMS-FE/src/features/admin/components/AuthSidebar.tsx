import { Omit } from 'utility-types';
import clsx from 'clsx';
import { Link, useLocation } from 'react-router-dom';
import { PERMISSION_APP } from '@/utils/global';
import { useCallback, useMemo } from 'react';
import { useAuth } from '@/lib/auth';
import { get, includes } from 'lodash';

interface ROUTE_TYPE {
  label: string;
  path: string;
  icon: string;
  perm?: string[];
  children: Omit<ROUTE_TYPE, 'children'>[];
}

const SIDEBAR_ITEMS: Omit<ROUTE_TYPE, 'path' | 'icon'>[] = [
  {
    label: 'Home',
    children: [
      {
        label: 'Home',
        path: '/',
        icon: 'fa fa-home',
      },
    ],
  },
  {
    label: 'Account Management',
    perm: [PERMISSION_APP.ADMIN, PERMISSION_APP.SUPER_ADMIN],
    children: [
      {
        label: 'List of account',
        path: '/admin/request/account/list',
        icon: 'fa fa-user',
      },
      {
        label: 'Create account',
        path: '/admin/request/account/create',
        icon: 'fa fa-user-plus',
      },
    ],
  },
  {
    label: 'Vehicle Management',
    children: [
      {
        label: 'List of vehicle',
        path: '/admin/vehicle/list',
        icon: 'fa fa-car',
      },
      {
        label: 'Create new vehicle',
        path: '/admin/vehicle/create',
        icon: 'fa fa-wrench',
      },
    ],
  },
];
export const AuthSidebar = () => {
  const location = useLocation();
  const { user } = useAuth();

  const renderMenuLeft = useCallback(
    (item: Omit<ROUTE_TYPE, 'path' | 'icon'>, index: number) => {
      return (
        <div key={index}>
          <li>
            <span className="heading nb">{item.label}</span>
          </li>
          {item.children.map((child) => (
            <li
              key={child.path}
              className={clsx({
                active: location.pathname === child.path,
              })}
            >
              <Link key={child.path} to={child.path}>
                <span>
                  <i className={child.icon} aria-hidden="true" />
                </span>
                {child.label}
              </Link>
            </li>
          ))}
        </div>
      );
    },
    [user],
  );
  return (
    <div className="side-menu-content">
      <span className="tl-toggler">
        <i className="fa fa-bars" aria-hidden="true" />
      </span>
      <div className="side-menu">
        <ul className="global-list">
          {SIDEBAR_ITEMS.map((item, index) =>
            item?.perm?.length
              ? includes(item?.perm, get(user, 'role', get(user, 'user.role')))
                ? renderMenuLeft(item, index)
                : null
              : renderMenuLeft(item, index),
          )}
        </ul>
      </div>
    </div>
  );
};
