"use client";

import { useRouter } from "next/navigation";
import { Button, Result } from "antd";
import Base from "@/layout/Base";

const NoFound = () => {
  let router = useRouter();

  return (
    <>
      <Base>
        <main className="w-full bg-white p-2">
          <Result
            status="404"
            title="404"
            subTitle="没有找到此收藏集"
            extra={
              <Button type="primary" onClick={() => router.replace("/")}>
                返回首页
              </Button>
            }
          />
        </main>
      </Base>
    </>
  );
};
export default NoFound;
