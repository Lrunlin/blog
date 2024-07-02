import { useEffect, useState } from "react";
import type { FC, ReactNode } from "react";
import axios from "@axios";
import classNames from "classnames";
import Base from "@/layout/Base";
import ActiveLink from "@/components/next/ActiveLink";
import Head from "@/components/next/Head";
import useUserData from "@/store/user/user-data";

interface propsType {
  children: ReactNode;
}
const Layout: FC<propsType> = (props) => {
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

  let userData = useUserData((s) => s.data);
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
          <div className="h-11 w-full bg-white shadow-sm">
            <div className="mx-auto flex h-full max-w-[960px]">
              {list.map((item, index) => {
                return (
                  <ActiveLink
                    key={`notification-${item.href}`}
                    href={`/notification/${item.href}`}
                    className={classNames([
                      "relative flex items-center px-2 text-gray-600",
                      index && "ml-4",
                    ])}
                    activeClassName="font-bold !text-blue-400 "
                  >
                    {noticeList && noticeList.includes(item.href) && (
                      <div className="absolute right-0 top-3 h-1.5 w-1.5 rounded-full bg-red-400"></div>
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
        <div className="mx-auto w-[960px]">{props.children}</div>
      </Base>
    </>
  );
};
export default Layout;
