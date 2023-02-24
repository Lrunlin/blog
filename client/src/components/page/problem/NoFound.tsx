import Head from "@/components/next/Head";
import { useState, useEffect } from "react";
import { Button, Result } from "antd";
import { useRouter } from "next/navigation";

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
