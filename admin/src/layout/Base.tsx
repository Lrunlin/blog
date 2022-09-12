import { FC } from "react";
import Header from "@/components/common/Header";
import { Button } from "antd";
import { Outlet } from "react-router";
import "./index.css";
import Footer from "@/components/common/Footer";
import { useLocation, useNavigate } from "react-router-dom";
import useUserState from "@/store/user-state";
import WaterMark from "./Watermark";

const Base: FC = () => {
  let location = useLocation();
  let navigate = useNavigate();
  let [userState] = useUserState();

  return (
    <>
      <Header />
      <main
        className="animate min-h-screen w-full pl-4 pr-4 relative top-4"
        key={location.pathname}
      >
        <WaterMark text={userState?.name || ""}>
          {userState ? (
            <Outlet />
          ) : (
            <div>
              <Button onClick={() => navigate("/login", { replace: true })} type="primary">
                请登录
              </Button>
            </div>
          )}
        </WaterMark>
      </main>
      <Footer />
    </>
  );
};
export default Base;
