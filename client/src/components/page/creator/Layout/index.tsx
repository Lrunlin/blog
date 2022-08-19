import type { FC, ReactNode } from "react";
import { useSetRecoilState } from "recoil";
import { modalStateContext } from "@/components/common/Header/Sign";
import { Result, Button } from "antd";
import useUserData from "@/store/user-data";
import Header from "./Header";
import Aside from "./Aside";

interface propsType {
  children: ReactNode;
}
const Layout: FC<propsType> = ({ children }) => {
  let [userData] = useUserData();
  let setModalState = useSetRecoilState(modalStateContext);

  return (
    <>
      {userData ? (
        <>
          <Header />
          <div className="container bg-[#f4f5f5] min-h-screen">
            <div className="flex pt-4">
              <Aside />
              <main className="w-full p-4 ml-64 bg-white"> {children}</main>
            </div>
          </div>
        </>
      ) : (
        <Result
          title="请登录"
          extra={
            <Button type="primary" onClick={() => setModalState("LogIn")}>
              登录
            </Button>
          }
        />
      )}
    </>
  );
};
export default Layout;
