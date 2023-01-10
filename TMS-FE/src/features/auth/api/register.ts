import { axios } from '@/lib/axios';
import { UserResponse } from '@/features/auth';

export type RegisterCredentialsDTO = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  affiliation: string;
};

export const registerWithEmailAndPassword = (data: RegisterCredentialsDTO): Promise<UserResponse> => {
  return axios.post('/register', data);
};
