import { axios } from '@/lib/axios';
import { UserResponse } from '@/features/auth';

export const refreshUser = (): Promise<UserResponse> => {
  return axios.post('/auth/refresh');
};
