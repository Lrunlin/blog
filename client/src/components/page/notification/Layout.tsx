import { useState, useEffect } from "react";
import type { FC, ReactNode } from "react";
import Base from "@/layout/Base";
import Head from "@/components/next/Head";
import ActiveLink from "@/components/next/ActiveLink";
import classNames from "classnames";
import useUserData from "@/store/user-data";
import axios from "axios";

interface propsType {
  children: ReactNode;
}
const Layout: FC<propsType> = props => {
  let list = [
    {
      label: "通知",
      href: "notice",
    },
    // {
    //   label: "系统通知",
    //   href: "system-notification",
    // },
  ];

  let userData = useUserData();
  const [noticeList, setNoticeList] = useState<string[] | false>(false);
  useEffect(() => {
    if (userData && !noticeList) {
      axios.get("/notice/count").then(({ data }) => {
        if (data.success) {
          setNoticeList(data.data.notice);
        }
      });
    }
  }, [userData, noticeList]);

  return (
    <>
      <Base
        brow={
          <div className="w-full bg-white h-11 shadow-sm">
            <div className="max-w-[960px] mx-auto flex h-full">
              {list.map((item, index) => {
                return (
                  <ActiveLink
                    key={`notification-${item.href}`}
                    href={`/notification/${item.href}`}
                    className={classNames([
                      "text-gray-600 flex items-center relative px-2",
                      index && "ml-4",
                    ])}
                    activeClassName="font-bold !text-blue-400 "
                  >
                    {noticeList && noticeList.includes(item.href) && (
                      <div className="w-1.5 h-1.5 absolute bg-red-400 rounded-full top-3 right-0"></div>
                    )}
                    {item.label}
                  </ActiveLink>
                );
              })}
            </div>
          </div>
        }
      >
        <Head title={`通知中心-${process.env.NEXT_PUBLIC_SITE_NAME}`} />
        <div className="w-[960px] mx-auto">{props.children}</div>
      </Base>
    </>
  );
};
export default Layout;
