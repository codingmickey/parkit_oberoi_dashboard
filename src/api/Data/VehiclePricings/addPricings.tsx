import axiosPublicInstance from '../../Axios/publicInstance';
import { DataItem } from './dataType';

const addPricing = async ({ price, tollVehicleTypeId }: Pick<DataItem, 'price' | 'tollVehicleTypeId'>) => {
  try {
    const options = {
      url: 'toll/addPricing',
      method: 'POST',
      data: { price, tollVehicleTypeId }
    };
    const resp = await axiosPublicInstance.request(options);
    return resp.data;
  } catch (err) {
    console.log(err);
  }
};

export default addPricing;
