export interface ResidentRecord {
  [key: string]:
    | string
    | number
    | null
    | Date
    | boolean
    | undefined
    | ResidentialRegisteredVehicles
    | ResidentialAllocatedParkings[]
    | ParkingSpot;
  // | ParkingSpot
  // | ReadableEventInTimestampProps
  // | WhitelistReference;
  // residentName: string;
  // vehicleNumber: string;
  // vehicleType: string;
  // checkInTime: Date | string;
  // checkInDate: Date | string;
  // checkOutTime: Date | string | null;
  // checkOutDate: Date | string | null;
  // duration: string;
  // checkInGate: string;
  // checkOutGate: string;
  // laneNumber: laneNumberLiteral;
  // vehicleRegistration: string | null;
  // amountCollected: number;
  // paymentMethod: paymentTypesForToll;
  // vehicleImage1: string | null;
  // vehicleImage2: string | null;
  // tollVehicleTypeId: number | null;
  // redableEventInTimestamp: ReadableEventInTimestampProps;
  // bookingId: number | null;
  // parkingSpot: null | ParkingSpot;
  // whitelistReference: null | WhitelistReference;

  wingflat: string;
  id: number;
  name: string;
  mobileNumber: string;
  wing: string;
  flatNumber: string;
  ownershipType: string;
  active: boolean;
  deactive: boolean;
  status: string;
  createdAt?: string;
  updatedAt?: string;
  parkingSpotId: number;
  ownedBy?: string;
  parkingSpot: ParkingSpot;
  residentialRegisteredVehicles: ResidentialRegisteredVehicles[];
  residentialAllocatedParkings: ResidentialAllocatedParkings[];
}
export type ResidentAddFormProps = {
  firstName: string;
  lastName: string;
  wing: string;
  flatNumber: number;
  vehicleRegistration: string[];
  allocatedSpaces: number;
  id: number;
};
export type ReadableEventInTimestampProps = {
  date: string;
  time: string;
};
export type ResidentialAllocatedParkings = {
  id: number;
  parkingArea: null | string;
  parkingIdentification: null | unknown;
  ownershipType: null | string;
  count: number;
  active: boolean;
  deactive: boolean;
  createdAt: string;
  updatedAt: string;
  residentialId: number;
};

export type ParkingSpot = { id: number; parkingSpotName: string };

export type ResidentialRegisteredVehicles = {
  id: number;
  vehicleRegistration: string;
  name: string;
  mobileNumber: null | string;
  emailAddress: null | string;
  expiryDate: string;
  deactive: boolean;
  active: boolean;
  pushToLpu: number;
  createdAt: string;
  updatedAt: string;
  residentialId: number;
  vehicleTypeId: number;
  vehicleColourId: null | number;
  fuelTypeId: null | number;
  vehicleType: {
    id: number;
    vehicleTypeName: string;
  };
};

export type WhitelistReference = { id: number; name: string };
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
  data: ResidentRecord[];
  setData: React.Dispatch<React.SetStateAction<ResidentRecord[]>>;
  together: number;
  setTogether: React.Dispatch<React.SetStateAction<number>>;
}

export interface TableProps {
  reloadTrigger: number;
  reloadingCurrentlyOrNot: boolean;
  setReloadingCurrentlyOrNot: React.Dispatch<React.SetStateAction<boolean>>;
  setReloadTrigger: React.Dispatch<React.SetStateAction<number>>;
  filters: FilterProps;
  data: ResidentRecord[];
  setData: React.Dispatch<React.SetStateAction<ResidentRecord[]>>;
  together: number;
}

export interface UserRecord {
  [key: string]: string | number | null | Date | undefined;
  id: number;
  name: string;
  mobileNumber: string;
  shiftStartTime: string;
  shiftEndTime: string;
  gender: genderLiteral;
  email: string | null;
  readableDOB: string | null;
  DOB: Date | undefined;
}
export const genderOptionsArray = ['Male', 'Female', 'Other'] as const;
export type genderLiteral = (typeof genderOptionsArray)[number];

export interface FilterProps {
  name: string;
  email: string;
  shiftTimeStart: string;
  shiftTimeEnd: string;
}

type BaseFormProps = {
  operatorData: ResidentAddFormProps;
  setOperatorData: React.Dispatch<React.SetStateAction<ResidentAddFormProps>>;
  initialState: any;
  handleRestore: () => void;
};
type AddFormProps = BaseFormProps & {
  formType: 'add';
  handleAdd: () => void;
};
type EditFormProps = BaseFormProps & {
  formType: 'edit';
  handleEdit: () => void;
};
export type AccountFormProps = AddFormProps | EditFormProps;

export interface InputPropsForModal {
  type: string;
  currentData: ResidentAddFormProps;
  setCurrentData: React.Dispatch<React.SetStateAction<ResidentAddFormProps>>;
  setErrors: React.Dispatch<React.SetStateAction<ResidentAddFormProps>>;
  disabled?: boolean;
  placeholder?: string;
}

export interface FilterHeaderComponentProps {
  setReloadTrigger: React.Dispatch<React.SetStateAction<number>>;
  reloadingCurrentlyOrNot: boolean;
  setFilters: React.Dispatch<React.SetStateAction<FilterProps>>;
  filters: FilterProps;
  data: ResidentRecord[];
  setData: React.Dispatch<React.SetStateAction<ResidentRecord[]>>;
  together: number;
  setTogether: React.Dispatch<React.SetStateAction<number>>;
}

export interface TableProps {
  reloadTrigger: number;
  reloadingCurrentlyOrNot: boolean;
  setReloadingCurrentlyOrNot: React.Dispatch<React.SetStateAction<boolean>>;
  setReloadTrigger: React.Dispatch<React.SetStateAction<number>>;
  filters: FilterProps;
  data: ResidentRecord[];
  setData: React.Dispatch<React.SetStateAction<ResidentRecord[]>>;
  together: number;
}
