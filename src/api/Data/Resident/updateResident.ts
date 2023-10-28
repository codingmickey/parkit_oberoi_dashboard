import { UpdateResidentStatus } from '../../../pages/Resident/models';
import axiosPrivateInstance from '../../Axios/privateInstance';
import { AxiosRequestConfig } from 'axios';

interface responseType {
  message?: string;
  error?: string;
}

const updateResidentStatus = async (
  data: UpdateResidentStatus,
  abortController: AbortController
): Promise<responseType> => {
  try {
    const options: AxiosRequestConfig = {
      url: 'residential/resident-status',
      method: 'PATCH',
      data: data,
      signal: abortController.signal
    };
    const resp = await axiosPrivateInstance.request(options);
    return resp.data.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export default updateResidentStatus;
