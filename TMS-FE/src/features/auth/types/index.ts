export type AuthUser = {
  id: number;
  lastName: string;
  firstName: string;
  affiliation: any;
  email: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  role: string;
  accessToken: string;
  tokenType: string;
  expiresIn: number;
};

export type UserResponse = {
  data: AuthUser;
  isSuccess: boolean;
  message: string;
};
