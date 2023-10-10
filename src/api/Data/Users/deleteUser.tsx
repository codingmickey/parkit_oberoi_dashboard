import axiosPrivateInstance from '../../Axios/privateInstance';
import { AxiosRequestConfig } from 'axios';

interface responseType {
  success: boolean;
  message: true;
}

const getUserData = async (mobileNumber: string, abortController: AbortController): Promise<responseType> => {
  try {
    const options: AxiosRequestConfig = {
      url: 'toll/toll-user',
      method: 'DELETE',
      data: { mobileNumber },
      signal: abortController.signal
    };
    const resp = await axiosPrivateInstance.request(options);
    return resp.data.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export default getUserData;
