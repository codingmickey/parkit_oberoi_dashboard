import { ShiftwiseData, TotalShiftwiseData } from '../../../pages/Report/Models/shiftwiseReportTypes';
import { AxiosRequestConfig } from 'axios';
import axiosPrivateInstance from '../../Axios/privateInstance';

interface responseType {
  data: ShiftwiseData[];
  total: TotalShiftwiseData;
  pagination: {
    total_data_count: number;
  };
}

const getShiftwiseReportData = async (
  pageNumber: number,
  pageSize: number,
  date: Date,
  abortController: AbortController
): Promise<responseType> => {
  try {
    const options: AxiosRequestConfig = {
      url: `audit/shift-report?date=${date}&page_number=${pageNumber}&data_per_page=${pageSize}`,
      method: 'GET',
      signal: abortController.signal
    };
    const resp = await axiosPrivateInstance.request(options);
    return resp.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export default getShiftwiseReportData;
