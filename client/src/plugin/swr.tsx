import type { FC, ReactNode } from "react";

import { SWRConfig } from "swr";
interface propsType {
  children: ReactNode;
}
const SWR: FC<propsType> = ({ children }) => {
  return <SWRConfig value={{ revalidateOnFocus: false, refreshInterval: 0 }}>{children}</SWRConfig>;
};
export default SWR;
