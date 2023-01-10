import { isString, get } from 'lodash';
import { Store } from 'react-notifications-component';

export const PERMISSION_APP = {
  ADMIN: 'Admin',
  SUPER_ADMIN: 'Supper Admin',
  DRIVER: 'Driver',
};
export const showError = (err: any) => {
  const message = isString(err) ? err : get(err, 'response.data.message', get(err, 'message'));
  Store.addNotification({
    message: message,
    type: 'danger',
    insert: 'bottom',
    container: 'bottom-center',
    dismiss: {
      duration: 1500,
      showIcon: true,
    },
  });
};

export const showSuccess = (message: string) => {
  Store.addNotification({
    message: message,
    type: 'success',
    insert: 'bottom',
    container: 'bottom-center',
    dismiss: {
      duration: 1500,
      showIcon: true,
    },
  });
};
