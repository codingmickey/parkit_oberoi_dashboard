import { UserRecord } from '../../../pages/Users/models';
import { AxiosRequestConfig } from 'axios';
import axiosPrivateInstance from '../../Axios/privateInstance';

interface responseType {
  success: boolean;
  data: UserRecord[];
  pagination: {
    total_data_count: number;
  };
}

const getUserData = async (
  pageNumber: number,
  pageSize: number,
  together: number,
  search: string,
  abortController: AbortController
): Promise<responseType> => {
  try {
    const options: AxiosRequestConfig = {
      url: `toll/toll-user?page_number=${pageNumber}&data_per_page=${pageSize}&search=${search}&together=${together}`,
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

export default getUserData;
