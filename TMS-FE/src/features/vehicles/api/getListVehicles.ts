import { axios } from '@/lib/axios';
import { ExtractFnReturnType, QueryConfig } from '@/lib/react-query';
import { useQuery } from 'react-query';

export interface Response {
  message: string;
  isSuccess: boolean;
  data: Data;
}

export interface Data {
  data: Vehicle[];
  meta: Meta;
}

export interface Vehicle {
  id: number;
  brand: string;
  type: string;
  carNumber: string;
  weight: number;
  typeOfFuel: string;
  status: string;
  bookBy: any;
  bookAt: any;
  bookingStatus: string;
}

export interface Meta {
  total: number;
  count: number;
  perPage: number;
  currentPage: number;
  totalPages: number;
}

type VehiclesParams = {
  page: number;
  onlyBooked?: boolean;
  status?: string;
  search?: string;
  idDriver?: number;
};

export const getListVehicles = ({
  idDriver,
  page,
  onlyBooked = false,
  status,
  search,
}: VehiclesParams): Promise<Response> => {
  return axios.get('/vehicle', {
    params: {
      page,
      onlyBooked,
      'status[eq]': status === 'All' ? undefined : status,
      'search[value]': search || undefined,
      'driver_id[eq]': idDriver || undefined,
    } as VehiclesParams,
  });
};

type QueryFnType = typeof getListVehicles;

type UseVehicleOptions = {
  params: VehiclesParams;
  config?: QueryConfig<QueryFnType>;
};

const DEFAULT_OPTIONS: UseVehicleOptions = {
  params: {
    page: 1,
    onlyBooked: false,
  },
};

export const useGetVehicles = ({
  config = {},
  params: { page, onlyBooked, search, status, idDriver },
}: UseVehicleOptions = DEFAULT_OPTIONS) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: ['vehicles', page, onlyBooked, search, status, idDriver],
    queryFn: () => getListVehicles({ idDriver, page, onlyBooked, search, status }),
  });
};
