import { axios } from '@/lib/axios';
import { ExtractFnReturnType, QueryConfig } from '@/lib/react-query';
import { useQuery } from 'react-query';

export const getListUser = (page: number): Promise<any> => {
  return axios.get('/user', {
    params: {
      page,
    },
  });
};

type QueryFnType = typeof getListUser;

type UseAccountOptions = {
  params: {
    page: number;
  };
  config?: QueryConfig<QueryFnType>;
};

const DEFAULT_OPTIONS = {
  params: {
    page: 1,
  },
};

export const useGetAccounts = ({ config = {}, params: { page } }: UseAccountOptions = DEFAULT_OPTIONS) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: ['accounts', page],
    queryFn: () => getListUser(page),
  });
};
