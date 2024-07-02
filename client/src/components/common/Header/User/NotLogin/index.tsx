import { Button } from "antd";
import useUserSignModel from "@/store/user/user-sign-model-state";

const NotLogin = () => {
  let setModalState = useUserSignModel((s) => s.setData);
  return (
    <>
      <Button type="primary" ghost onClick={() => setModalState("LogIn")}>
        登录
      </Button>
    </>
  );
};
export default NotLogin;
