import { axios } from '@/lib/axios';
import { UserResponse } from '@/features/auth';

export const getUser = (): Promise<UserResponse> => {
  return axios.get('/auth/me');
};
