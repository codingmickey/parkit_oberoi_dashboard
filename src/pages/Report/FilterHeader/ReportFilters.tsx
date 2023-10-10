//Third party
import { Radio, RadioChangeEvent } from 'antd';
import { useSearchParams } from 'react-router-dom';

//page specific
import { IndexForFiltersComponentProps } from '../Models/models';

//components|hooks|utils
import DailyReportFilters from './FiltersForReports/DailyReportFilters';
import WeeklyReportFilters from './FiltersForReports/WeeklyReportFilters';
import ShiftWiseReportFilters from './FiltersForReports/ShiftWiseReportFilters';
import MonthlyReportFilters from './FiltersForReports/MonthlyReportFilters';

export default function ReportFilters({
  setReportType,
  reportType,
  setReloadTrigger,
  reloadingCurrentlyOrNot,
  filters,
  setFilters,
  data,
  together,
  setTogether
}: IndexForFiltersComponentProps) {
  const [searchParams, setSearchParams] = useSearchParams();

  const dealingWithChangeInReportType = (e: RadioChangeEvent) => {
    const newReportType = e.target.value;
    setReportType(newReportType);
    localStorage.setItem('reportType', newReportType);
    setReportType(newReportType);
    setSearchParams({
      reportType: newReportType
    } as unknown as Record<string, string | string[]>);
    setFilters((prev) => ({ ...prev, reportType: newReportType }));
  };

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Radio.Group onChange={dealingWithChangeInReportType} value={reportType}>
          <Radio.Button value="daily">Daily</Radio.Button>
          <Radio.Button value="weekly">Weekly</Radio.Button>
          <Radio.Button value="monthly">Monthly</Radio.Button>
          <Radio.Button value="shiftwise">Shift wise</Radio.Button>
        </Radio.Group>
      </div>
      <div>
        {reportType === 'daily' ? (
          <DailyReportFilters setFilters={setFilters} filters={filters} />
        ) : reportType === 'monthly' ? (
          <MonthlyReportFilters year="" />
        ) : reportType === 'shiftwise' ? (
          <ShiftWiseReportFilters shift="" />
        ) : reportType === 'weekly' ? (
          <WeeklyReportFilters month="" />
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
