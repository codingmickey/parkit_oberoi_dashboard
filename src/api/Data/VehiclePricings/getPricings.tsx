import axiosPublicInstance from '../../Axios/publicInstance';
import { GetPricingResponse } from './dataType';

const getPricing = async (): Promise<GetPricingResponse> => {
  try {
    const options = {
      url: 'pass/add',
      method: 'POST'
    };
    const resp = await axiosPublicInstance.request(options);
    return resp.data as GetPricingResponse;
  } catch (err) {
    console.log(err);
    throw err; // Rethrow the error to handle it in the calling code
  }
};

export default getPricing;
