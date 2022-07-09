import { AxiosResponse } from "axios";

export const extract = <T, U>(p: Promise<AxiosResponse<T, U>>) =>
  p.then((res) => res.data);

const network = { extract };

export default network;
