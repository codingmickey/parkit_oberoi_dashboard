import { IndexForTableProps } from '../../Models/models';
import { ShiftwiseReportData, ShiftwiseReportFilterTypes } from '../../Models/shiftwiseReportTypes';

type ShiftwiseReportTableProps = Omit<IndexForTableProps, 'data' | 'filters'> &
  ShiftwiseReportData & { filters: ShiftwiseReportFilterTypes };

export default function ShiftWiseReportTable({
  reloadTrigger,
  setReloadTrigger,
  reloadingCurrentlyOrNot,
  setReloadingCurrentlyOrNot,
  filters,
  data,
  total,
  setData
}: ShiftwiseReportTableProps) {
  return <div>ShiftWiseReportTable</div>;
}
