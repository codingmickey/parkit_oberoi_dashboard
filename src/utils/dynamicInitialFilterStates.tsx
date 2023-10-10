export default function getDynamicInitialState<T extends object>(filterData: T): T {
  const initialState: Partial<T> = {};

  for (const key in filterData) {
    if (typeof filterData[key] === 'string') {
      initialState[key as Extract<keyof T, string>] = '' as T[Extract<keyof T, string>];
    } else if (typeof filterData[key] === 'number') {
      initialState[key as Extract<keyof T, string>] = 0 as T[Extract<keyof T, string>];
    } else if (typeof filterData[key] === 'boolean') {
      initialState[key as Extract<keyof T, string>] = false as T[Extract<keyof T, string>];
    } else if (typeof filterData[key] === 'object') {
      if (filterData[key] === null) {
        initialState[key as Extract<keyof T, string>] = null as T[Extract<keyof T, string>];
      } else if (Array.isArray(filterData[key])) {
        initialState[key as Extract<keyof T, string>] = [] as unknown as T[Extract<keyof T, string>];
      } else {
        initialState[key as Extract<keyof T, string>] = getDynamicInitialState(
          filterData[key] as unknown as T
        ) as T[Extract<keyof T, string>];
      }
    } else if (typeof filterData[key] === 'undefined') {
      initialState[key as Extract<keyof T, string>] = undefined as T[Extract<keyof T, string>];
    }
  }

  return initialState as T;
}
