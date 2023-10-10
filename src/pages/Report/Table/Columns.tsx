import { ReportTypes } from '../Models/models';
import weeklyReportColumns from './ColumnsForReports/weeklyReportColumns';
import dailyReportColumns from './ColumnsForReports/dailyReportColumns';
import monthlyReportColumns from './ColumnsForReports/monthlyReportColumns';
import shiftwiseReportColumns from './ColumnsForReports/shiftwiseReportColumns';

interface ColumnType {
  reportType: ReportTypes;
  width: number;
}

export default function indexForColumns({ reportType, width }: ColumnType) {
  return reportType === 'daily'
    ? dailyReportColumns(width)
    : reportType === 'weekly'
    ? weeklyReportColumns(width)
    : reportType === 'monthly'
    ? monthlyReportColumns(width)
    : reportType === 'shiftwise'
    ? shiftwiseReportColumns(width)
    : null;
}
