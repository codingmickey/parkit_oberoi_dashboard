import axiosPrivateInstance from '../../Axios/privateInstance';
import { AxiosRequestConfig } from 'axios';

interface responseType {
  message?: string;
  error?: string;
}

const deleteResident = async (id: number, abortController: AbortController): Promise<responseType> => {
  try {
    const options: AxiosRequestConfig = {
      url: 'residential/resident',
      method: 'DELETE',
      data: { id },
      signal: abortController.signal
    };
    const resp = await axiosPrivateInstance.request(options);
    return resp.data.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export default deleteResident;
