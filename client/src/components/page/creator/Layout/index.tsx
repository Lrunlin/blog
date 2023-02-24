import type { FC, ReactNode } from "react";
import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { modalStateContext } from "@/components/common/Header/Sign";
import { Result, Button } from "antd";
import useUserData from "@/store/user-data";
import Header from "./Header";
import Aside from "./Aside";
import classNames from "classnames";
import Head from "@/components/next/Head";
import { useRouter } from "next/navigation";

interface propsType {
  children: ReactNode;
  className?: string;
}
const Layout: FC<propsType> = ({ children, className }) => {
  let [userData] = useUserData();
  let setModalState = useSetRecoilState(modalStateContext);

  let router = useRouter();
  useEffect(() => {
    router.prefetch("/article/editor");
    router.prefetch("/article/editor/[id]");
  }, []);
  
  return (
    <>
      <Head title="创作者中心" />
      {userData ? (
        <>
          <Header />
          <div className="container bg-[#f4f5f5] min-h-screen">
            <div className="flex pt-4">
              <Aside />
              <main className={classNames(["w-full ml-64", className])}> {children}</main>
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
