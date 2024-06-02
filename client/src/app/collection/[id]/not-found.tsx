"use client";
import { Result, Button } from "antd";
import Base from "@/layout/Base";
import { useRouter } from "next/navigation";

const NoFound = () => {
  let router = useRouter();

  return (
    <>
      <Base>
        <main className="w-full p-2 bg-white">
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
