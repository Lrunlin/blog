import { FC, ReactNode } from "react";
import Header from "@/components/admin/common/Header";
import Footer from "@/components/admin/common/Footer";
import { useRouter } from "next/navigation";
import useUserState from "@/store/user-data";
// import WaterMark from "./Watermark";
import axios from "axios";

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
      <style jsx global>{`
        a {
          color: inherit !important;
        }
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
      <Header />
      <main className="min-h-screen w-full pl-4 pr-4 relative top-4">{children}</main>
      <Footer />
    </>
  );
};
export default AdminLayout;
