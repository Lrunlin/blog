import { FC, ReactNode } from "react";
import { useRouter } from "next/navigation";
import axios from "@axios";
import Footer from "@/components/admin/common/Footer";
import Header from "@/components/admin/common/Header";
import Head from "@/components/next/Head";
import useUserData from "@/store/user/user-data";

interface propsType {
  children: ReactNode;
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
const AdminLayout: FC<propsType> = ({ children }) => {
  const router = useRouter();
  let userData = useUserData((s) => s.data);
  if (typeof window !== "undefined" && userData?.auth != 1) {
    router.replace("/admin/login");
  }

  return (
    <>
      <Head title={`${process.env.NEXT_PUBLIC_SITE_NAME} - 后台管理系统`} />
      <style jsx global>{`
        a {
          color: inherit !important;
        }
      `}</style>
      <div className="flex justify-between">
        <Header />
        <main className="relative top-4 ml-[192px] min-h-screen w-full flex-1 pl-4 pr-4">
          {children}
        </main>
      </div>
      <Footer />
    </>
  );
};
export default AdminLayout;
