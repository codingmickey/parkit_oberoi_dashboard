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
  operatorData: UserRecord;
  setOperatorData: React.Dispatch<React.SetStateAction<UserRecord>>;
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
  currentData: UserRecord;
  setCurrentData: React.Dispatch<React.SetStateAction<UserRecord>>;
  setErrors: React.Dispatch<React.SetStateAction<UserRecord>>;
  disabled?: boolean;
  placeholder?: string;
}

export interface FilterHeaderComponentProps {
  setReloadTrigger: React.Dispatch<React.SetStateAction<number>>;
  reloadingCurrentlyOrNot: boolean;
  setFilters: React.Dispatch<React.SetStateAction<FilterProps>>;
  filters: FilterProps;
  data: UserRecord[];
  setData: React.Dispatch<React.SetStateAction<UserRecord[]>>;
  together: number;
  setTogether: React.Dispatch<React.SetStateAction<number>>;
}

export interface TableProps {
  reloadTrigger: number;
  reloadingCurrentlyOrNot: boolean;
  setReloadingCurrentlyOrNot: React.Dispatch<React.SetStateAction<boolean>>;
  setReloadTrigger: React.Dispatch<React.SetStateAction<number>>;
  filters: FilterProps;
  data: UserRecord[];
  setData: React.Dispatch<React.SetStateAction<UserRecord[]>>;
  together: number;
}
