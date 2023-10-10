export interface ShiftwiseDataRecord {
  a: string;
}
export interface TotalShiftwiseData {
  b: string;
}

export interface ShiftwiseReportFilterTypes {
  // reportType: "shiftwise";
  shift: string;
}

export type ShiftwiseReportData = {
  data: ShiftwiseDataRecord[];
  total: TotalShiftwiseData;
};
