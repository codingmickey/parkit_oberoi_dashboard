import { UserRecord } from '../../../pages/Users/models';
import { AxiosRequestConfig } from 'axios';
import axiosPrivateInstance from '../../Axios/privateInstance';

interface responseType {
  success: boolean;
  data: {
    data: UserRecord[];
    pagination: never;
  };
}

const getSingleOperatorData = async (id: number, abortController: AbortController) => {
  try {
    const options: AxiosRequestConfig = {
      url: `toll/toll-user?id=${id}`,
      method: 'GET',
      signal: abortController.signal
    };
    const resp: responseType = await axiosPrivateInstance.request(options);
    return resp.data.data[0];
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export default getSingleOperatorData;
