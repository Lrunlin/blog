"use client";

import { useRouter } from "next/navigation";
import { Button, Result } from "antd";
import Header from "@/components/common/Header";
import Head from "@/components/next/Head";

const Error = (err: any) => {
  let router = useRouter();

  return (
    <>
      <Head title={`加载错误-${process.env.NEXT_PUBLIC_SITE_NAME}`} />
      <Header />
      <Result
        className="w-full"
        status="error"
        title="页面加载出现错误"
        subTitle="页面加载出现错误，请稍后再试、"
        extra={
          <Button type="primary" onClick={() => router.replace("/")}>
            回到首页
          </Button>
        }
      ></Result>
    </>
  );
};

export default Error;
