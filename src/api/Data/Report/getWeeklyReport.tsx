import { WeeklyData, TotalWeeklyData } from '../../../pages/Report/Models/weeklyReportTypes';
import { AxiosRequestConfig } from 'axios';
import axiosPrivateInstance from '../../Axios/privateInstance';

interface responseType {
  data: WeeklyData[];
  total: TotalWeeklyData;
  pagination: {
    total_data_count: number;
  };
}

const getWeeklyReportData = async (
  pageNumber: number,
  pageSize: number,
  date: Date,
  abortController: AbortController
): Promise<responseType> => {
  try {
    const options: AxiosRequestConfig = {
      url: `audit/weekly-report?date=${date}&page_number=${pageNumber}&data_per_page=${pageSize}`,
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

export default getWeeklyReportData;
