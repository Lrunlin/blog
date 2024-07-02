"use client";

import { Dropdown } from "antd";
import classNames from "classnames";
import Image from "@/components/next/Image";
import NoFollowLink from "@/components/next/NoFollowLink";
import style from "./index.module.scss";

interface listItemType {
  key: string;
  href?: string;
  label: JSX.Element | string;
  className?: string;
}
let list: listItemType[][] = [
  [
    {
      href: "/friendly-link",
      label: "友情链接",
    },
    {
      href: "/sitemap/1",
      label: "站点地图",
    },
  ],
  [
    {
      href: "https://beian.miit.gov.cn/#/Integrated/index",
      label: (
        <>
          <Image
            src="/icon/client/police.png"
            width={20}
            height={20}
            alt="police icon"
          />
          <span className="ml-1">{process.env.ICP}</span>
        </>
      ),
      className: "flex items-center",
    },
  ],
  [
    {
      label: <>&copy;2022-{process.env.NEXT_PUBLIC_SITE_NAME}</>,
    },
  ],
].map((item, index) =>
  item.map((_item, _index) => ({
    ..._item,
    key: `footer-link-${index}-${_index}`,
  })),
);

const Footer = () => {
  return (
    <footer className="mb-6 w-60">
      {list.map((item, index) => (
        <ul
          className="m-0 mt-2 flex list-none items-center p-0 text-sm"
          key={`footer-link-${index}`}
        >
          {item.map((_item, _index) => (
            <li
              className={classNames([
                style["child-a-gray"],
                _index && "ml-2",
                "mt-1",
              ])}
              key={_item.key}
            >
              {_item.href ? (
                <NoFollowLink href={_item.href} className={_item.className}>
                  {_item.label}
                </NoFollowLink>
              ) : (
                <span className={_item.className}>{_item.label}</span>
              )}
            </li>
          ))}
        </ul>
      ))}
      <div className="flex">
        <div className="mt-3">
          <Dropdown
            placement="bottom"
            dropdownRender={() => (
              <div className="h-52 w-40 rounded bg-white pt-2 text-center">
                <div>QQ:{process.env.QQ}</div>
                <div>
                  <Image
                    src="/image/client/qq-qrcode.jpg"
                    width={140}
                    height={140}
                    alt="QQ名片二维码"
                  />
                </div>
              </div>
            )}
          >
            <NoFollowLink
              href={`http://wpa.qq.com/msgrd?v=3&uin=${process.env.QQ}&site=qq&menu=yes`}
            >
              <Image
                src="/icon/client/qq.png"
                width={24}
                height={24}
                alt="QQ图标"
              />
            </NoFollowLink>
          </Dropdown>
        </div>
        <div className="ml-2 mt-3 cursor-pointer">
          <Dropdown
            placement="bottom"
            dropdownRender={() => (
              <div className="h-52 w-40 rounded bg-white pt-2 text-center">
                <div>添加站长微信</div>
                <div>
                  <Image
                    src="/image/client/wechat-qrcode.jpg"
                    width={140}
                    height={140}
                    alt="微信二维码"
                  />
                </div>
              </div>
            )}
          >
            <Image
              src="/icon/client/wechat.png"
              width={24}
              height={24}
              alt="微信图标"
            />
          </Dropdown>
        </div>
        <div className="ml-2 mt-3">
          <NoFollowLink href={`mailto:${process.env.EMAIL}`}>
            <Image
              src="/icon/client/email.png"
              width={24}
              height={24}
              alt="邮箱图标"
            />
          </NoFollowLink>
        </div>
        <div className="ml-2 mt-3">
          <NoFollowLink href={`${process.env.GITHUB}`}>
            <Image
              src="/icon/client/github.png"
              width={24}
              height={24}
              alt="GitHub图标"
            />
          </NoFollowLink>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
