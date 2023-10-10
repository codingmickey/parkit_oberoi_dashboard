import { IndexForTableProps } from '../Models/models';
import DailyReportTable from './TablesForReports/DailyReportTable';
import MonthlyReportTable from './TablesForReports/MonthlyReportTable';
import ShiftWiseReportTable from './TablesForReports/ShiftwiseReportTable';
import WeeklyReportTable from './TablesForReports/WeeklyReportTable';

export default function IndexForTable({
  reloadTrigger,
  setReloadTrigger,
  reloadingCurrentlyOrNot,
  setReloadingCurrentlyOrNot,
  filters,
  data,
  setData,
  together
}: IndexForTableProps) {
  return (
    <>
      {filters.reportType === 'daily' && (
        <DailyReportTable
          reloadTrigger={reloadTrigger}
          setReloadTrigger={setReloadTrigger}
          setReloadingCurrentlyOrNot={setReloadingCurrentlyOrNot}
          reloadingCurrentlyOrNot={reloadingCurrentlyOrNot}
          filters={filters}
          data={data?.daily.data}
          total={data?.daily.total}
          setData={setData}
        />
      )}
      {filters.reportType === 'monthly' && (
        <MonthlyReportTable
          reloadTrigger={reloadTrigger}
          setReloadTrigger={setReloadTrigger}
          setReloadingCurrentlyOrNot={setReloadingCurrentlyOrNot}
          reloadingCurrentlyOrNot={reloadingCurrentlyOrNot}
          filters={filters}
          data={data?.monthly?.data && data.monthly.data}
          total={data?.monthly?.total && data.monthly.total}
          setData={setData}
        />
      )}
      {filters.reportType === 'shiftwise' && (
        <ShiftWiseReportTable
          reloadTrigger={reloadTrigger}
          setReloadTrigger={setReloadTrigger}
          setReloadingCurrentlyOrNot={setReloadingCurrentlyOrNot}
          reloadingCurrentlyOrNot={reloadingCurrentlyOrNot}
          filters={filters}
          data={data?.shiftwise?.data && data.shiftwise.data}
          total={data?.shiftwise?.total && data?.shiftwise.total}
          setData={setData}
        />
      )}
      {filters.reportType === 'weekly' && (
        <WeeklyReportTable
          reloadTrigger={reloadTrigger}
          setReloadTrigger={setReloadTrigger}
          setReloadingCurrentlyOrNot={setReloadingCurrentlyOrNot}
          reloadingCurrentlyOrNot={reloadingCurrentlyOrNot}
          filters={filters}
          data={data?.weekly?.data && data.weekly.data}
          total={data?.weekly?.total && data.weekly.total}
          setData={setData}
        />
      )}
    </>
  );
}
