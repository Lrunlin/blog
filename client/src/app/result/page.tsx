"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button, Result } from "antd";
import { setToken } from "@/common/modules/cookie";
import Base from "@/layout/Base";
import Head from "@/components/next/Head";

/** 为一些页面显示处理结果*/
const ResultFC = () => {
  let router = useRouter();
  let searchParams = useSearchParams();
  const [success, token, href, title] = [
    "success",
    "token",
    "href",
    "title",
  ].map((item) => searchParams!.get(item));
  const message = searchParams!.getAll("message");

  useEffect(() => {
    if (typeof token == "string") {
      setToken(token);
    }
  }, [token]);

  function SubTitle() {
    if (!message) {
      return <></>;
    }
    if (Array.isArray(message)) {
      return (
        <ul className="list-none">
          {message.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      );
    }
    return <div>{message}</div>;
  }
  return (
    <Base>
      <Head title={title || "响应结果"} />
      <div className="w-full bg-white">
        <div className="w-full">
          <Result
            status={success == "true" ? "success" : "error"}
            title={title}
            subTitle={<SubTitle />}
            extra={
              href && (
                <Button type="primary" onClick={() => router.replace(href)}>
                  返回
                </Button>
              )
            }
          />
        </div>
      </div>
    </Base>
  );
};
export default ResultFC;
