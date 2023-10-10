/// <reference types="vite/client" />

type PickBy<T, K extends keyof T> = Pick<T, K>;
//Pick only the attributes specified
//type PickedPerson = PickBy<Person, 'name' | 'nickname'>;
//? PickedPerson type  include name and nickname from person type

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
//Omit the attributes specified and keep rest same
//type OmitNickname = Omit<Person, 'nickname'>;
//? OmitNickname type will remove nickname from Person type

type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
//Make the given attributes optional and keep the rest same
//type MakePersonInput = PartialBy<Person, 'nickname'>;
//? MakePersonInput type will make nickname as partial from Person type

interface FloatingInputProps {
  nameForTheInputWithFirstLetterCapital: string;
  data: string;
  onSubmitOfSearch: () => void;
  setDataIntoFilters: (e: React.ChangeEvent<HTMLInputElement>) => void;
  width: number;
}

type ThemeTypes = 'dark' | 'light';
