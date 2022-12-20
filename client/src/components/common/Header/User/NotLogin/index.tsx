import { Button } from "antd";
import { useSetRecoilState } from "recoil";
import { modalStateContext } from "../../Sign";
const NotLogin = () => {
  let setModalState = useSetRecoilState(modalStateContext);
  return (
    <>
      <Button type="primary" ghost onClick={() => setModalState("LogIn")}>
        登录
      </Button>
    </>
  );
};
export default NotLogin;
