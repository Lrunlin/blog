import { FC } from "react";
import Header from "@/components/common/Header";
import { Button } from "antd";
import { Outlet } from "react-router";
import "./index.css";
import Footer from "@/components/common/Footer";
import { useNavigate } from "react-router-dom";
import useUserState from "@/store/user-state";
// import WaterMark from "./Watermark";

const Base: FC = () => {
  let navigate = useNavigate();
  let [userState] = useUserState();

  return (
    <>
      <Header />
      <main className="min-h-screen w-full pl-4 pr-4 relative top-4">
        {userState ? (
          <Outlet />
        ) : (
          <div>
            <Button onClick={() => navigate("/login", { replace: true })} type="primary">
              请登录
            </Button>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
};
export default Base;
