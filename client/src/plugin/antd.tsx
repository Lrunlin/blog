import type { FC, ReactNode } from "react";
import { ConfigProvider } from "antd";

const Antd: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <ConfigProvider
      theme={{
        token: {
          borderRadius: 4,
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
};
export default Antd;
