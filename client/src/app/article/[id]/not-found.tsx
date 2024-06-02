"use client";
import Head from "@/components/next/Head";
import { Result, Button } from "antd";
import Header from "@/components/common/Header";
import { useRouter } from "next/navigation";

const Error = () => {
  let router = useRouter();

  return (
    <>
      <Head title={`404-没有找到对应文章`} description={"404"} keywords={["404"]} />
      <Header />
      <Result
        status={"404"}
        title={"404"}
        subTitle="没有找到对应文章"
        extra={
          <Button type="primary" onClick={() => router.replace("/")}>
            回到首页
          </Button>
        }
      />
    </>
  );
};

export default Error;
