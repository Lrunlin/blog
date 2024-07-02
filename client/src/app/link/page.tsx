"use client";

import { useSearchParams } from "next/navigation";
import { Button, Divider } from "antd";

const Link = () => {
  const searchParams = useSearchParams();
  let textHref = searchParams
    .get("target")
    ?.match(
      /^(((ht|f)tps?):\/\/)?([^!@#$%^&*?.\s-]([^!@#$%^&*?.\s]{0,63}[^!@#$%^&*?.\s])?\.)+[a-z]{2,6}\/?/,
    );

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div>
        <div className="flex items-center">
          <img src="/favicon.svg" alt="logo" className="w-10" />
          <span className="ml-4 text-2xl">
            {process.env.NEXT_PUBLIC_SITE_NAME}
          </span>
        </div>
        <div className="mt-2 w-[530px] border border-solid border-gray-300 bg-white px-10 pb-3 pt-7">
          <div className="text-lg">
            即将离开{process.env.NEXT_PUBLIC_SITE_NAME}，请注意账号财产安全
          </div>
          <div className="mt-2 truncate text-gray-500">
            {textHref ? textHref[0] : "错误的链接"}
          </div>
          <Divider className="my-3" />
          <div className="flex justify-end">
            <Button type="primary" href={searchParams.get("target")!}>
              继续访问
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Link;
