export interface LogRecord {
  [key: string]:
    | string
    | number
    | null
    | Date
    | undefined
    | ParkingSpot
    | ReadableEventInTimestampProps
    | WhitelistReference;
  id: number;
  laneNumber: laneNumberLiteral;
  vehicleRegistration: string | null;
  amountCollected: number;
  paymentMethod: paymentTypesForToll;
  vehicleImage1: string | null;
  vehicleImage2: string | null;
  tollVehicleTypeId: number | null;
  redableEventInTimestamp: ReadableEventInTimestampProps;
  bookingId: number | null;
  parkingSpot: null | ParkingSpot;
  whitelistReference: null | WhitelistReference;
}
export type ReadableEventInTimestampProps = {
  date: string;
  time: string;
  dateTime?: string;
};
export type CheckOutLogs = {
  redableCheckOutTimestamp: ReadableEventInTimestampProps;
  checkOutGateNo: string | null;
  checkOutImage1: string | null;
  id: number | null;
  parkingSpotId: number | null;
}[];
export type WhitelistReference = { id: number; name: string };
export type ParkingSpot = { id: number; parkingSpotName: string };
export type Residential = {
  name: string | null;
  wing: string | null;
  wingflat: string | null;
  flatNumber: string | null;
};
export type ResidentRegisterVehicle = { id: number; vehicleRegistration: string };
export const laneOptionsArray = ['1', '2'] as const;
export type laneNumberLiteral = (typeof laneOptionsArray)[number];
export const paymentOptionsArray = ['FASTAG', 'UPI', 'DD'] as const;
export type paymentTypesForToll = (typeof paymentOptionsArray)[number];

export interface FilterProps {
  [key: string]: string;
  startDate: string;
  endDate: string;
  vehicleRegistration: string;
}

export interface FilterHeaderComponentProps {
  setReloadTrigger: React.Dispatch<React.SetStateAction<number>>;
  reloadingCurrentlyOrNot: boolean;
  setFilters: React.Dispatch<React.SetStateAction<FilterProps>>;
  filters: FilterProps;
  data: LogRecord[];
  setData: React.Dispatch<React.SetStateAction<LogRecord[]>>;
  together: number;
  setTogether: React.Dispatch<React.SetStateAction<number>>;
}

export interface TableProps {
  reloadTrigger: number;
  reloadingCurrentlyOrNot: boolean;
  setReloadingCurrentlyOrNot: React.Dispatch<React.SetStateAction<boolean>>;
  setReloadTrigger: React.Dispatch<React.SetStateAction<number>>;
  filters: FilterProps;
  data: LogRecord[];
  setData: React.Dispatch<React.SetStateAction<LogRecord[]>>;
  together: number;
}
