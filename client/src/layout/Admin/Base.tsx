import { FC, ReactNode } from "react";
import Header from "@/components/admin/common/Header";
import Footer from "@/components/admin/common/Footer";
import { useRouter } from "next/navigation";
import useUserState from "@/store/user-data";
import axios from "axios";
import Head from "@/components/next/Head";

interface propsType {
  children: ReactNode;
}
axios.interceptors.request.use(
  (config: any) => {
    config.headers["isadmin"] = true;
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);
const AdminLayout: FC<propsType> = ({ children }) => {
  const router = useRouter();
  let [userState] = useUserState();
  if (typeof window !== "undefined" && userState?.auth != 1) {
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
      <Header />
      <main className="min-h-screen w-full pl-4 pr-4 relative top-4">{children}</main>
      <Footer />
    </>
  );
};
export default AdminLayout;
