import axiosPublicInstance from '../../Axios/publicInstance';

const getLocalVehicles = async () => {
  try {
    const options = {
      url: 'toll/getLocalVehicle',
      method: 'GET'
    };
    const resp = await axiosPublicInstance.request(options);
    return resp.data.data;
  } catch (err) {
    console.log(err);
  }
};

export default getLocalVehicles;
