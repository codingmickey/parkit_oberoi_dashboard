export interface MonthlyDataRecord {
  month: string;
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
export interface TotalMonthlyData {
  totalCollection: number;
  totalNumberOfPayments: number;
  cashPaymentsCount: number;
  cashPaymentsSum: number;
  upiPaymentsCount: number;
  upiPaymentsSum: number;
  fastagPaymentsCount: number;
  fastagPaymentsSum: number;
}

export interface MonthlyReportFilterTypes {
  // reportType: "monthly";
  year: string;
}
export type MonthlyReportData = {
  data: MonthlyDataRecord[];
  total: TotalMonthlyData;
};
