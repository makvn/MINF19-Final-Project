import { axios } from '@/lib/axios';

export interface Response {
  message: string;
  isSuccess: boolean;
  data: IReportTotal;
}

export interface IReportTotal {
  amount: number;
  booking: number;
  user: number;
}

export const getTotalReportByMonth = (query: { month: string }): Promise<Response> => {
  return axios.get('/statistics/total', { params: query });
};

export interface ResponseChart {
  message: string;
  isSuccess: boolean;
  data: {
    booking: IReportChart;
    user: IReportChart;
  };
}

export interface IReportChart {
  [key: string]: number;
}
export const getChartReportByMonth = (query: { month: string }): Promise<ResponseChart> => {
  return axios.get('/statistics/per-month', { params: query });
};
