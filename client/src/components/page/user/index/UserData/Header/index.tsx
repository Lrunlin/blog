import type { FC } from "react";
import type { UserAttributes } from "@type/model-attribute";
import Image from "@/components/next/Image";
import { Avatar } from "antd";
import NoFollowLink from "@/components/next/NoFollowLink";
import FollowButton from "./FollowButton";

const Header: FC<{ data: UserAttributes }> = ({ data }) => {
  return (
    <>
      <div className="p-7 bg-white flex shadow-sm">
        <div className="w-24">
          <Avatar size={90} src={data.avatar_url} alt={`用户${data.name}头像`} />
        </div>
        <div className="w-full ml-8">
          {/* 用户名称以及联系方式 */}
          <div className="flex items-center justify-between">
            <h1 className="font-semibold mb-0">{data.name}</h1>
            <div className="flex items-center">
              {data.github && (
                <NoFollowLink href={`https://github.com/${data.github}`} className="mr-2">
                  <Image src="/icon/client/github-fill.png" height={18} width={18} alt="ICON" />
                </NoFollowLink>
              )}
              {data.email && (
                <NoFollowLink href={`mailto:${data.email}`} className="mr-2">
                  <Image src="/icon/client/email-fill.png" height={18} width={18} alt="ICON" />
                </NoFollowLink>
              )}
              {data.site && (
                <NoFollowLink href={data.site} className="mr-2">
                  <Image src="/icon/client/website.png" height={18} width={18} alt="ICON" />
                </NoFollowLink>
              )}
            </div>
          </div>
          {/* 单位、地址位置、以及介绍 */}
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              {data.location && (
                <div className="flex items-center">
                  <Image src="/icon/client/briefcase.png" height={18} width={18} alt="ICON" />
                  <span className="ml-1.5">{data.location}</span>
                </div>
              )}
              {data.unit && (
                <div className="flex items-center ml-3">
                  <Image src="/icon/client/unit.png" height={18} width={18} alt="ICON" />
                  <span className="ml-1.5">{data.unit}</span>
                </div>
              )}
            </div>
            {/* 关注按钮 */}
            <FollowButton bloggerID={data.id} />
          </div>
          {data.description && (
            <div className="w-full mt-2 flex items-start">
              <div className="mt-0.5">
                <Image src="/icon/client/postcard.png" height={14} width={18} alt="poster card" />
              </div>
              <div className="w-11/12 ml-1.5 break-all">{data.description}</div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
export default Header;
