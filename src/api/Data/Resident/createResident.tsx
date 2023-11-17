import { ResidentAddFormProps } from '../../../pages/Users/models';
import axiosPrivateInstance from '../../Axios/privateInstance';

const createResident = async (data: ResidentAddFormProps) => {
  try {
    const options = {
      url: 'residential/add-resident',
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

export default createResident;
