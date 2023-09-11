import type { FC } from "react";
import Image from "@/components/next/Image";
import NoFollowLink from "@/components/next/NoFollowLink";
import classNames from "classnames";

interface propsType {
  className?: string;
}
/** 侧边栏张贴项目地址的*/
const Repository: FC<propsType> = ({ className }) => {
  return (
    <>
      <div className={classNames(["flex p-4 bg-white shadow-sm mb-4", className])}>
        <Image width={50} height={50} src="/image/client/github.jpg" alt="github icon" />
        <NoFollowLink href="https://github.com/Lrunlin/blog" className="ml-2">
          <div className="text-base text-black">项目地址</div>
          <div className="text-gray-700">一个简单的博客社区</div>
        </NoFollowLink>
      </div>
    </>
  );
};
export default Repository;
