import { PERMISSION_APP } from './global';

export const isHasPermissionAdmin = (role?: string) => {
  return role === PERMISSION_APP.ADMIN || role === PERMISSION_APP.SUPER_ADMIN;
};
