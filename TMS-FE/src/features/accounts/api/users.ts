import { AccountCreateProps } from '@/features/accounts/routes/AccountCreate';
import { axios } from '@/lib/axios';

export const getListUser = (): Promise<any> => {
  return axios.get('/user');
};

export const createUser = (body: AccountCreateProps): Promise<any> => {
  return axios.post('/user', body);
};
