import { axios } from '@/lib/axios';
import { UserResponse } from '@/features/auth';

export type LoginCredentialsDTO = {
  email: string;
  password: string;
};

export const loginWithEmailAndPassword = (data: LoginCredentialsDTO): Promise<UserResponse> => {
  return axios.post('/auth/login', data);
};
