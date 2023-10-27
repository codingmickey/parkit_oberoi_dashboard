import { UserRecord } from '../../../pages/Users/models';
import { AxiosRequestConfig } from 'axios';
import axiosPrivateInstance from '../../Axios/privateInstance';
import qs from 'qs';

interface responseType {
  success: boolean;
  data: UserRecord[];
  pagination: {
    total_data_count: number;
  };
}

const getVehicles = async (
  name: string,
  pageNumber: number,
  pageSize: number,
  together: number,
  search: string,
  abortController: AbortController
): Promise<responseType> => {
  try {
    const options: AxiosRequestConfig = {
      url: `/residential/registered-vehicles${name ? `?search=${name}` : ''}`,
      method: 'GET',
      signal: abortController.signal
    };
    const resp = await axiosPrivateInstance.request(options);
    return resp.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export default getVehicles;
