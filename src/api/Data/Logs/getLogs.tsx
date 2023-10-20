import { LogRecord } from '../../../pages/Logs/models';
import { AxiosRequestConfig } from 'axios';
import axiosPrivateInstance from '../../Axios/privateInstance';

interface responseType {
  rows: LogRecord[];
  pagination: {
    total_data_count: number;
  };
}

const getLog = async (
  pageNumber: number,
  pageSize: number,
  residentialId: string,
  residentialRegisteredVehicleId: string,
  search: string,
  id: string,
  abortController: AbortController
): Promise<responseType> => {
  try {
    const options: AxiosRequestConfig = {
      url: `residential/log?parkingSpotTypeId=4&user=resident`,
      // &residentialId=${residentialId}
      // &residentialRegisteredVehicleId=${residentialRegisteredVehicleId}
      // &search=${search}
      // &id=${id}
      // `,
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

export default getLog;
