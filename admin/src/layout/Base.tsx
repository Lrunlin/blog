import { FC } from "react";
import Header from "@/components/common/Header";
import { Outlet } from "react-router";
import "./index.css";
import Footer from '@/components/common/Footer';
import { useLocation } from "react-router-dom";
const Base: FC = () => {
  let location = useLocation();
  return (
    <>
      <Header />
      <main className="animate min-h-screen w-full pl-4 relative top-4" key={location.pathname}>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};
export default Base;
