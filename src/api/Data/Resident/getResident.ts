import { ResidentRecord } from '../../../pages/Users/models';
import { AxiosRequestConfig } from 'axios';
import axiosPrivateInstance from '../../Axios/privateInstance';

interface responseType {
  data: ResidentRecord[];
  total_data_count: number;
  total_pages: number;
}

const getResidents = async (
  pageNumber: number,
  pageSize: number,
  // together: number,
  // search: string,
  abortController: AbortController
): Promise<responseType> => {
  try {
    const options: AxiosRequestConfig = {
      url: `residential/fetch-resident?page_number=${pageNumber}&data_per_page=${pageSize}`,
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

export default getResidents;
