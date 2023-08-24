import type { FC, ReactNode } from "react";
import zhCN from "antd/locale/zh_CN";
import { ConfigProvider } from "antd";

interface propsType {
  children: ReactNode;
}
const Antd: FC<propsType> = ({ children }) => {
  return <ConfigProvider locale={zhCN}>{children}</ConfigProvider>;
};
export default Antd;
