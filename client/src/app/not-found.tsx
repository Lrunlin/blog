"use client";

import { useRouter } from "next/navigation";
import { Button, Result } from "antd";
import Header from "@/components/common/Header";
import Head from "@/components/next/Head";

const NotFound = () => {
  let router = useRouter();

  return (
    <>
      <Head title={`404-没有找到页面`} description={"404"} keywords={["404"]} />
      <Header />
      <Result
        status={"404"}
        title={"404"}
        subTitle="页面加载错误"
        extra={
          <Button type="primary" onClick={() => router.replace("/")}>
            回到首页
          </Button>
        }
      />
    </>
  );
};

export default NotFound;
