import { UserRecord } from '../../../pages/Users/models';
import axiosPrivateInstance from '../../Axios/privateInstance';
import { AxiosRequestConfig } from 'axios';

const updateUser = async (data: UserRecord) => {
  try {
    const options: AxiosRequestConfig = {
      url: 'toll/toll-user',
      method: 'PATCH',
      data: data
    };
    const resp = await axiosPrivateInstance.request(options);
    return resp.data.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export default updateUser;
