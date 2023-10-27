import { VehicleAddFormProps } from '../../../pages/Users/models';
import axiosPrivateInstance from '../../Axios/privateInstance';

const createVehicle = async (data: VehicleAddFormProps) => {
  try {
    const options = {
      url: 'residential/vehicle',
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

export default createVehicle;
