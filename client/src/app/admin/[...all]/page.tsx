"use client";

import { useRouter } from "next/navigation";
import { Button, Result } from "antd";
import Head from "@/components/next/Head";

const NoFound = () => {
  let router = useRouter();
  return (
    <>
      <Head title={`404 - ${process.env.NEXT_PUBLIC_SITE_NAME}`} />
      <Result
        status="404"
        title="404"
        subTitle="没有找到指定页面"
        extra={
          <Button type="primary" onClick={() => router.replace("/admin")}>
            首页
          </Button>
        }
      />
    </>
  );
};
export default NoFound;
