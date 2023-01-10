import { VehicleCreateProps } from '@/features/vehicles/components/VehicleCreate';
import { axios } from '@/lib/axios';

export const getListVeficles = (query?: any): Promise<any> => {
  return axios.get('/vehicle', { params: query });
};

export const createVeficles = (body: VehicleCreateProps): Promise<any> => {
  return axios.post('/vehicle', body);
};

export const createBookVeficles = (idVehicle: string, body: any): Promise<any> => {
  return axios.post('/vehicle/book/' + idVehicle, body);
};

export const updateVehicle = (idVehicle: string, body: any): Promise<any> => {
  return axios.put('/vehicle/' + idVehicle, body);
};
export const endBookVeficles = (idVehicle: string, body: { amount: number }): Promise<any> => {
  return axios.post('/vehicle/update-end-booking/' + idVehicle, body);
};

export const actionApproveRejectVehicle = (idVehicle: string, body: any): Promise<any> => {
  return axios.post('/vehicle/update-status/' + idVehicle, body);
};
export const deleteVehicle = (idVehicle: string): Promise<any> => {
  return axios.delete('/vehicle/' + idVehicle);
};

export const getDetailVehicle = (idVehicle: string): Promise<any> => {
  return axios.get('/vehicle/' + idVehicle);
};
