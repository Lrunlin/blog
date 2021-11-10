import { useState, Fragment } from "react";
import { Result, Button } from "antd";
import Head from "@/modules/Head";
import { useRouter } from "next/router";

function Error({ statusCode }: { statusCode: number }) {
  let router = useRouter();
  return (
    <>
      {Head({
        title: statusCode + "||访问出现错误",
        keywords: `没找到页面,错误,${statusCode + ""}`,
        description: "访问出现错误",
      })}
      <Result
        status={(statusCode as any) || 500}
        title={statusCode || "显示错误"}
        subTitle={`网站错误:${statusCode}`}
        extra={
          <Button type="primary" onClick={() => router.replace("/")}>
            返回首页
          </Button>
        }
      />
      ,
    </>
  );
}
Error.getInitialProps = ({ res, err }) => {
  const statusCode: number = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};
export default Error;
