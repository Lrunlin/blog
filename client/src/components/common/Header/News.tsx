import { useEffect, useState, memo } from "react";
import type { FC } from "react";
import Image from "@/components/next/Image";
import Link from "next/link";
import classNames from "classnames";
import useUserData from "@/store/user-data";
import axios from "axios";
import { Badge } from "antd";

interface propsType {
  className?: string;
}

/** Header中的小铃铛用来跳转到通知页面*/
const News: FC<propsType> = memo(props => {
  let userData = useUserData();
  const [badgeCount, setBadgeCount] = useState(0);
  useEffect(() => {
    if (userData) {
      axios.get("/notice/count").then(res => {
        if (res.data.success) {
          setBadgeCount(res.data.data.count);
        }
      });
    }
  }, [userData]);

  return (
    <>
      <Link href="/notification">
        <a rel="nofollow" className={classNames(["mt-2", props.className])}>
          <Badge count={badgeCount} size="small">
            <Image
              className="opacity-50 duration-300 hover:opacity-80 cursor-pointer"
              src="/icon/small-bell.png"
              height={24}
              width={24}
            />
          </Badge>
        </a>
      </Link>
    </>
  );
});
export default News;
