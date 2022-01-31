import { Result, Button } from "antd";
import type { FunctionComponent } from "react";
import { useRouter } from "next/router";

const Error: FunctionComponent = () => {
  let router = useRouter();
  return (
    <div style={{ backgroundColor: "white" }}>
      <Result
        status="error"
        title="没有找到对应的用户"
        subTitle="可能是您修改了地址栏的地址或者其他原因导致。"
        extra={[
          <Button key="usererrorbtn" type="primary" onClick={() => router.replace("/")}>
            回到首页
          </Button>,
        ]}
      />
    </div>
  );
};
export default Error;
