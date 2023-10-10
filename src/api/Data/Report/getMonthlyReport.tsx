import { MonthlyData, TotalMonthlyData } from '../../../pages/Report/Models/monthlyReportTypes';
import { AxiosRequestConfig } from 'axios';
import axiosPrivateInstance from '../../Axios/privateInstance';

interface responseType {
  rows: MonthlyData[];
  total: TotalMonthlyData;
  pagination: {
    total_data_count: number;
  };
}

const getMonthlyReportData = async (
  pageNumber: number,
  pageSize: number,
  month: Date,
  abortController: AbortController
): Promise<responseType> => {
  try {
    const options: AxiosRequestConfig = {
      url: `audit/monthly-report?month=${month}&page_number=${pageNumber}&data_per_page=${pageSize}`,
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

export default getMonthlyReportData;
