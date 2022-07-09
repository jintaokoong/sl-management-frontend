import { AxiosResponse } from "axios";

export const extract = <T, U>(p: Promise<AxiosResponse<T, U>>) =>
  p.then((res) => res.data);

const params = (
  value: Record<string, unknown> | unknown,
  key?: string
): object[] => {
  // end case: if value is of primitive and key is defined, then return
  if (typeof value !== "object" && key) return [{ [key]: value }];
  // start case: if key is not provided, expand the object
  if (typeof value === "object")
    return Object.entries(value!).map(([key, value]) => params(value, key));
  // intermediate case: recursively call function
  return params(value, key);
};

const network = { extract, params };

export default network;
