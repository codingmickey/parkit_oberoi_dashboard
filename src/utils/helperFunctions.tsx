export const checkingForNullObject = <T extends Record<string, unknown>>(object: T) => {
  return Object.keys(object).length === 0;
};

export function convertInObjectNullToString<T extends Record<string, unknown>>(
  obj: T,
  convertToValue: T[keyof T] = '' as T[keyof T]
): T {
  Object.entries(obj).forEach(([key, value]) => {
    if (value === null || value === undefined) {
      obj[key as keyof T] = convertToValue;
    }
  });
  return obj;
}

export function convertNullInArrayOfObjectsToString<T extends Record<string, unknown>>(
  arr: T[],
  convertToValue: T[keyof T] = '' as T[keyof T]
): T[] {
  return arr.map((obj) => convertInObjectNullToString(obj, convertToValue));
}

//generic vale like query params me agar sbhkuch nhi h toh osko remove krne ke liye
