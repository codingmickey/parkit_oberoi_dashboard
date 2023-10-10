import axiosPublicInstance from '../../Axios/publicInstance';
import { DataItem } from './dataType';

const createLocalVehicle = async (data: DataItem[]) => {
  try {
    const options = {
      url: 'toll/createLocalVehicleEntry',
      method: 'POST',
      data: data
    };
    const resp = await axiosPublicInstance.request(options);
    return resp.data.data;
  } catch (err) {
    console.log(err);
  }
};

export default createLocalVehicle;
