"use client";

import { FC, ReactNode, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "@axios";
import classNames from "classnames";
import Cookies from "js-cookie";
import Footer from "@/components/admin/common/Footer";
import Header from "@/components/admin/common/Header";
import Head from "@/components/next/Head";
import useUserData from "@/store/user/user-data";

interface propsType {
  children: ReactNode;
  collapsed?: string;
}
axios.interceptors.request.use(
  (config: any) => {
    config.headers["isadmin"] = true;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);
const AdminLayout: FC<propsType> = ({ children, collapsed }) => {
  const router = useRouter();
  let userData = useUserData((s) => s.data);
  if (typeof window !== "undefined" && userData?.auth != 1) {
    router.replace("/admin/login");
  }

  const [isCollapsed, setIsCollapsed] = useState(collapsed == "true");

  const toggleCollapsed = () => {
    setIsCollapsed((val) => {
      Cookies.set("xxx-collapsed", !val + "");
      return !val;
    });
  };

  return (
    <>
      <Head title={`${process.env.NEXT_PUBLIC_SITE_NAME} - 后台管理系统`} />
      <style jsx global>{`
        a {
          color: inherit !important;
        }
      `}</style>
      <div className="flex justify-between">
        <Header collapsed={isCollapsed} toggleCollapsed={toggleCollapsed} />
        <main
          className={classNames(
            "relative top-4 min-h-screen w-full flex-1 pl-4 pr-4 duration-200",
            isCollapsed ? "ml-[82px]" : "ml-[192px]",
          )}
        >
          {children}
        </main>
      </div>
      <Footer />
    </>
  );
};
export default AdminLayout;
