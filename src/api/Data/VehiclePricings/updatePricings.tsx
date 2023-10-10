import axiosPublicInstance from '../../Axios/publicInstance';
import { DataItem, PricingResponse } from './dataType';

const updatePricing = async (data: DataItem[]): Promise<PricingResponse | undefined> => {
  try {
    const options = {
      url: 'toll/updatePricing',
      method: 'PATCH',
      data: data
    };
    const resp = await axiosPublicInstance.request(options);
    return resp.data as PricingResponse;
  } catch (err) {
    console.log(err);
  }
};

export default updatePricing;
