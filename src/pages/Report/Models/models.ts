//data and filter types
import { DailyReportData, DailyReportFilterTypes } from './dailyReportTypes';
import { WeeklyReportFilterTypes, WeeklyReportData } from './weeklyReportTypes';
import { MonthlyReportData, MonthlyReportFilterTypes } from './monthlyReportTypes';
import { ShiftwiseReportData, ShiftwiseReportFilterTypes } from './shiftwiseReportTypes';

export const ReportTypesArray = ['weekly', 'monthly', 'daily', 'shiftwise'] as const;
export type ReportTypes = (typeof ReportTypesArray)[number];

export interface IndexForTableProps {
  reloadTrigger: number;
  reloadingCurrentlyOrNot: boolean;
  setReloadingCurrentlyOrNot: React.Dispatch<React.SetStateAction<boolean>>;
  setReloadTrigger: React.Dispatch<React.SetStateAction<number>>;
  filters: FilterProps;
  data: CurrentData;
  setData: React.Dispatch<React.SetStateAction<CurrentData>>;
  together?: number;
}
export interface IndexForFiltersComponentProps {
  setReportType: React.Dispatch<React.SetStateAction<ReportTypes>>;
  reportType: ReportTypes;
  setReloadTrigger: React.Dispatch<React.SetStateAction<number>>;
  reloadingCurrentlyOrNot: boolean;
  setFilters: React.Dispatch<React.SetStateAction<FilterProps>>;
  filters: FilterProps;
  data: CurrentData;
  setData: React.Dispatch<React.SetStateAction<CurrentData>>;
  together: number;
  setTogether: React.Dispatch<React.SetStateAction<number>>;
}

export type BaseFilterProps = {
  reportType: ReportTypes;
};
export type FilterProps = BaseFilterProps &
  DailyReportFilterTypes &
  WeeklyReportFilterTypes &
  MonthlyReportFilterTypes &
  ShiftwiseReportFilterTypes;

// export type FilterProps = BaseFilterProps &
//   (
//     | DailyReportFilterTypes
//     | WeeklyReportFilterTypes
//     | MonthlyReportFilterTypes
//     | ShiftwiseReportFilterTypes
//   );

export type CurrentData = {
  daily: DailyReportData;
  weekly: WeeklyReportData;
  monthly: MonthlyReportData;
  shiftwise: ShiftwiseReportData;
};
