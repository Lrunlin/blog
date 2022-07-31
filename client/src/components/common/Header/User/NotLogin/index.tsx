import { Button } from "antd";
import { useSetRecoilState } from "recoil";
import { modalStateContext } from "../Sign";
const NotLogin = () => {
    let openModal = useSetRecoilState(modalStateContext);
  return (
    <>
      <Button type="primary" ghost onClick={() => openModal(true)}>
        登录
      </Button>
    </>
  );
};
export default NotLogin;
