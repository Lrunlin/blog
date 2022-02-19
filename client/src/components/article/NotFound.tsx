import type { FunctionComponent } from "react";
import { useRouter } from "next/router";
import Head from "@/utils/Head";
import { Result, Button } from "antd";


const NotFound: FunctionComponent = () => {
  let router = useRouter();
  return (
    <>
      <Head
        title="404|未找到指定文章"
        keyword={["404", "未找到该文章"]}
        description="未找到该文章"
      />
      <div>
        <Result
          status="404"
          title="未找到对应文章"
          subTitle="没有找到对应文章"
          extra={
            <Button type="primary" onClick={() => router.replace("/")}>
              回到首页
            </Button>
          }
        />
      </div>
    </>
  );
};
export default NotFound;
