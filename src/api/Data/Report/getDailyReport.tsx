import { DailyReportData } from '../../../pages/Report/Models/dailyReportTypes';
import { AxiosRequestConfig } from 'axios';
import axiosPrivateInstance from '../../Axios/privateInstance';

interface responseType extends DailyReportData {
  pagination: {
    total_data_count: number;
  };
}

const getDailyReportData = async (
  pageNumber: number,
  pageSize: number,
  date: string,
  abortController: AbortController
): Promise<responseType> => {
  try {
    const options: AxiosRequestConfig = {
      url: `toll/audit/daily-report?date=${date}&page_number=${pageNumber}&data_per_page=${pageSize}`,
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

export default getDailyReportData;
