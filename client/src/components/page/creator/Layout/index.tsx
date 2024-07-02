import type { FC, ReactNode } from "react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button, Result } from "antd";
import classNames from "classnames";
import Head from "@/components/next/Head";
import useUserData from "@/store/user/user-data";
import useUserSignModel from "@/store/user/user-sign-model-state";
import Aside from "./Aside";
import Header from "./Header";

interface propsType {
  children: ReactNode;
  className?: string;
}
const Layout: FC<propsType> = ({ children, className }) => {
  let userData = useUserData((s) => s.data);
  let setModalState = useUserSignModel((s) => s.setData);
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
          <div className="container min-h-screen bg-[#f4f5f5]">
            <div className="flex pt-4">
              <div className="mr-60">
                <Aside />
              </div>
              <main
                className={classNames(["ml-4 w-[calc(100%-240px)]", className])}
              >
                {" "}
                {children}
              </main>
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
