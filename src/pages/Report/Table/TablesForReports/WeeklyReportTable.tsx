import { IndexForTableProps } from '../../Models/models';
import { WeeklyReportData, WeeklyReportFilterTypes } from '../../Models/weeklyReportTypes';

type WeeklyReportTableProps = Omit<IndexForTableProps, 'data' | 'filters'> &
  WeeklyReportData & { filters: WeeklyReportFilterTypes };

export default function WeeklyReportTable({
  reloadTrigger,
  setReloadTrigger,
  reloadingCurrentlyOrNot,
  setReloadingCurrentlyOrNot,
  filters,
  data,
  total,
  setData
}: WeeklyReportTableProps) {
  return <div>WeeklyReportTable</div>;
}
