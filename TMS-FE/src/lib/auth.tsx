import { initReactQueryAuth } from 'react-query-auth';

import {
  AuthUser,
  getUser,
  LoginCredentialsDTO,
  loginWithEmailAndPassword,
  refreshUser,
  RegisterCredentialsDTO,
  registerWithEmailAndPassword,
  UserResponse,
} from '@/features/auth';
import storage from '@/utils/storage';
import { setTokenApi } from './axios';
import { AxiosError } from 'axios';

async function handleUserResponse(data: UserResponse) {
  const { data: userData } = data;
  if (userData.accessToken) {
    storage.setToken(userData.accessToken || (userData as AuthUser & { token: string }).token);
    setTokenApi(userData.accessToken);
  }
  if ((userData as AuthUser & { token: string }).token) {
    storage.setToken((userData as AuthUser & { token: string }).token);
    setTokenApi(userData.accessToken);
  }
  return userData;
}

async function refreshFn() {
  try {
    storage.clearToken();
    const refreshData = await refreshUser();
    return await handleUserResponse(refreshData);
  } catch (e) {
    if (e instanceof AxiosError) {
      if (e.response && e.response.status === 401) {
        return null;
      }
    }
    return null;
  }
}

async function loadUser() {
  try {
    const token = storage.getToken();
    if (token) {
      setTokenApi(token);
      const data = await getUser();
    return data.data;
    }
    return null;
  } catch (e) {
    if (e instanceof AxiosError) {
      if (e.response && e.response.status === 401) {
        return refreshFn();
      }
    }
    return null;
  }
}

async function loginFn(data: LoginCredentialsDTO) {
  const response = await loginWithEmailAndPassword(data);
  return await handleUserResponse(response);
}

async function registerFn(data: RegisterCredentialsDTO) {
  const response = await registerWithEmailAndPassword(data);
  return await handleUserResponse(response);
}

async function logoutFn() {
  storage.clearToken();
  window.location.assign(window.location.origin as unknown as string);
}

const authConfig = {
  loadUser,
  loginFn,
  registerFn,
  logoutFn,
  LoaderComponent() {
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        <div>Loading...</div>
      </div>
    );
  },
};

export const { AuthProvider, useAuth } = initReactQueryAuth<
  AuthUser | null,
  unknown,
  LoginCredentialsDTO,
  RegisterCredentialsDTO
>(authConfig);
