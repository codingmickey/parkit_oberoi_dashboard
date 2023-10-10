export function validateField<T>(field: keyof T, value: string, setErrors: React.Dispatch<React.SetStateAction<T>>) {
  if (field === 'name') {
    const nameRegex = /^[a-zA-Z\s]*$/;
    const isValid = nameRegex.test(value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      [field]: isValid ? '' : 'Please enter alphabets only.'
    }));
  } else if (field === 'email') {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValidEmail = value === '' || emailRegex.test(value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      email: isValidEmail ? '' : 'Please enter a valid email address.'
    }));
  } else if (field === 'mobileNumber') {
    const mobileNumberRegex = /^\d{10}$/;
    const isValidMobileNumber = value === '' || mobileNumberRegex.test(value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      mobileNumber: isValidMobileNumber ? '' : 'Please enter a 10-digit mobile number.'
    }));
  }
}
