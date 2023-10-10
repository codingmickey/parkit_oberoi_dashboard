import { UserRecord } from '../../../pages/Users/models';
import axiosPrivateInstance from '../../Axios/privateInstance';

const createUser = async (data: UserRecord) => {
  try {
    const options = {
      url: 'toll/toll-user',
      method: 'POST',
      data: data
    };
    const resp = await axiosPrivateInstance.request(options);
    return resp.data.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export default createUser;
