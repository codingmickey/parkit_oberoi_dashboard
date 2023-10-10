export interface DailyDataRecord {
  date: string;
  hour: number;
  totalCollection: number;
  totalNumberOfPayments: number;
  cashPaymentsCount: number;
  cashPaymentsSum: number;
  upiPaymentsCount: number;
  upiPaymentsSum: number;
  fastagPaymentsCount: number;
  fastagPaymentsSum: number;
}
export interface TotalDailyData {
  totalCollection: number;
  totalNumberOfPayments: number;
  cashPaymentsCount: number;
  cashPaymentsSum: number;
  upiPaymentsCount: number;
  upiPaymentsSum: number;
  fastagPaymentsCount: number;
  fastagPaymentsSum: number;
}

export interface DailyReportFilterTypes {
  // reportType: "daily";
  date: string;
}
export type DailyReportData = {
  data: DailyDataRecord[];
  total: TotalDailyData;
};
