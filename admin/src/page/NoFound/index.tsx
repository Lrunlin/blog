import { Button, Result } from "antd";
import { useNavigate } from "react-router";
const NoFound = () => {
  let navigate = useNavigate();
  return (
    <>
      <Result
        status="404"
        title="404"
        subTitle="没有找到指定页面"
        extra={
          <Button type="primary" onClick={() => navigate("/", { replace: true })}>
            首页
          </Button>
        }
      />
    </>
  );
};
export default NoFound;
