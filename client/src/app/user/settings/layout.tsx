"use client";

import type { FC, ReactNode } from "react";
import { useRouter } from "next/navigation";
import { Button, Result } from "antd";
import {
  DeleteOutlined,
  IdcardOutlined,
  LeftOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import Base from "@/layout/Base";
import ActiveLink from "@/components/next/ActiveLink";
import Head from "@/components/next/Head";
import useUserData from "@/store/user/user-data";
import useUserSignModel from "@/store/user/user-sign-model-state";

const list = [
  {
    href: "/user/settings/profile",
    icon: <IdcardOutlined />,
    label: "个人信息",
  },
  {
    href: "/user/settings/account",
    icon: <SettingOutlined />,
    label: "账号设置",
  },
];

if (process.env.AUTH_MODE) {
  list.push({
    href: "/user/settings/destroy",
    icon: <DeleteOutlined />,
    label: "账号注销",
  });
}

interface propsType {
  children: ReactNode;
}

const Layout: FC<propsType> = ({ children }) => {
  let userData = useUserData((s) => s.data);
  let router = useRouter();
  let setModalState = useUserSignModel((s) => s.setData);

  return (
    <>
      <Head title={`用户设置-${process.env.NEXT_PUBLIC_SITE_NAME}`} />
      <Base className="container">
        <div className="m-0 w-full">
          <div className="w-full bg-white py-3 shadow-sm">
            <span
              className="ml-4 cursor-pointer"
              onClick={() => router.push(`/user/${userData?.id}`)}
            >
              <LeftOutlined />
              返回个人主页
            </span>
          </div>
          <div className="mt-2 flex h-[630px]">
            <aside className="mr-6 w-56 bg-white shadow-sm">
              <div className="w-56 p-2">
                {list.map((item) => {
                  return (
                    <ActiveLink
                      key={`${item.href}-${item.label}`}
                      href={item.href}
                      className="flex h-10 items-center rounded-sm pl-2 text-black hover:bg-blue-100 hover:text-blue-600"
                      activeClassName="bg-blue-100 text-blue-600"
                    >
                      {item.icon}
                      <span className="ml-2">{item.label}</span>
                    </ActiveLink>
                  );
                })}
              </div>
            </aside>
            <main className="w-full bg-white p-2 shadow-sm">
              <>
                {userData ? (
                  <>{children}</>
                ) : (
                  <Result
                    status="404"
                    title="没有找到您的信息，请登录"
                    extra={
                      <Button
                        type="primary"
                        onClick={() => setModalState("LogIn")}
                      >
                        登录
                      </Button>
                    }
                  />
                )}
              </>
            </main>
          </div>
        </div>
      </Base>
    </>
  );
};
export default Layout;
