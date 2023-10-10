import axiosPublicInstance from '../../Axios/publicInstance';
import { DataItem } from './dataType';

const deletePricing = async ({ id }: Pick<DataItem, 'id'>) => {
  try {
    const options = {
      url: 'toll/updatePricing',
      method: 'DELETE',
      data: { id }
    };
    const resp = await axiosPublicInstance.request(options);
    return resp.data;
  } catch (err) {
    console.log(err);
  }
};

export default deletePricing;
