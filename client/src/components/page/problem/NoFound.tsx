"use client";

import { useRouter } from "next/navigation";
import { Button, Result } from "antd";
import Head from "@/components/next/Head";

const NoFound = () => {
  let router = useRouter();

  return (
    <>
      <Head title="未找到相应问题" />
      <Result
        status="404"
        title="404"
        subTitle="没有找到对应的问题"
        extra={
          <Button type="primary" onClick={() => router.replace("/")}>
            返回首页
          </Button>
        }
      />
    </>
  );
};
export default NoFound;
