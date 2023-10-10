export interface WeeklyDataRecord {
  week: string;
  hour: number;
  totalCollection: string;
  totalNumberOfPayments: number;
  cashPaymentsCount: number;
  cashPaymentsSum: string;
  upiPaymentsCount: number;
  upiPaymentsSum: string;
  fastagPaymentsCount: number;
  fastagPaymentsSum: string;
}

export interface TotalWeeklyData {
  totalCollection: number;
  totalNumberOfPayments: number;
  cashPaymentsCount: number;
  cashPaymentsSum: number;
  upiPaymentsCount: number;
  upiPaymentsSum: number;
  fastagPaymentsCount: number;
  fastagPaymentsSum: number;
}

export interface WeeklyReportFilterTypes {
  // reportType: "weekly";
  month: string;
}

export type WeeklyReportData = {
  data: WeeklyDataRecord[];
  total: TotalWeeklyData;
};
