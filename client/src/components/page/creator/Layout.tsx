import { useState, Fragment } from "react";
import { useRecoilValue } from "recoil";
import { userDataContext } from "@/store/user-data";

interface propsType{

}
const Layout = () => {
  let userData = useRecoilValue(userDataContext);

  return (
    <>
      <div></div>
    </>
  );
};
export default Layout;
