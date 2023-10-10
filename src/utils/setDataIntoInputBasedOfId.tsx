import { validateField } from './validateField';

export function handleInputChange<T>(
  e: React.ChangeEvent<HTMLInputElement>,
  setFilters: React.Dispatch<React.SetStateAction<T>>,
  doYouWantValidation = true,
  setErrors?: React.Dispatch<React.SetStateAction<T>>
) {
  const { id } = e.target;
  let { value } = e.target;
  value = value.trim();
  setFilters((prevFilters) => ({ ...prevFilters, [id]: value }));
  if (doYouWantValidation) {
    validateField<T>(id as keyof T, value.trim(), setErrors as React.Dispatch<React.SetStateAction<T>>);
  }
}
