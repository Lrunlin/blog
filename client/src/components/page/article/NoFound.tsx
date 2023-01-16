import Head from "@/components/next/Head";
import Header from "@/components/common/Header";
import { Button, Result } from "antd";
import { useRouter } from "next/navigation";

/** 文章页面404*/
const NoFound = () => {
  let router = useRouter();

  return (
    <>
      <Head title="没找到该篇文章" keywords={["404"]} description="Not Found" />
      <Header />
      <Result
        status="404"
        title="404"
        subTitle="没找到该篇文章"
        extra={
          <Button type="primary" onClick={() => router.replace("/")}>
            返回主页
          </Button>
        }
      />
    </>
  );
};
export default NoFound;
