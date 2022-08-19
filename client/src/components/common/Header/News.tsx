import type {  FC } from "react";
import Image from "next/image";
import Link from "next/link";
import classNames from "classnames";

interface propsType{
    className?:string;
}

/** Header中的小铃铛用来跳转到通知页面*/
const News: FC<propsType> = props => {
  return (
    <>
      <Link href="/notification">
        <a rel="nofollow" className={classNames(["mt-2", props.className])}>
          <Image
            className="opacity-50 duration-300 hover:opacity-80 cursor-pointer"
            src="/icon/small-bell.png"
            height={24}
            width={24}
          />
        </a>
      </Link>
    </>
  );
};
export default News;
