import { IndexForTableProps } from '../../Models/models';
import { MonthlyReportData, MonthlyReportFilterTypes } from '../../Models/monthlyReportTypes';

type MonthlyReportTableProps = Omit<IndexForTableProps, 'data' | 'filters'> &
  MonthlyReportData & { filters: MonthlyReportFilterTypes };

export default function MonthlyReportTable({
  reloadTrigger,
  setReloadTrigger,
  reloadingCurrentlyOrNot,
  setReloadingCurrentlyOrNot,
  filters,
  data,
  total,
  reportType,
  setData
}: MonthlyReportTableProps) {
  return <div>MonthlyReportTable</div>;
}
