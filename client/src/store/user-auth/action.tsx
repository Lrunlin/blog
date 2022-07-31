import { useEffect } from "react";
import axios from "axios";
import { useSetRecoilState } from "recoil";
import { userAuthContext } from "./state";

function setUserAuth() {
  let setUserAuthState = useSetRecoilState(userAuthContext);
  useEffect(() => {
    axios.get("/user/auth").then(res => {
      if (res.data.success) {
        setUserAuthState(res.data.data);
      } else {
        setUserAuthState(null);
      }
    });
  }, []);
  return;
}

export default setUserAuth;
