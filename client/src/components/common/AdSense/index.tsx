"use client";

import { Suspense, memo, useEffect, useState } from "react";
import ADS from "./ADS";

/** Google ADS*/
const AdSense = memo(() => {
  const [isLoad, setIsLoad] = useState(true); //加载中

  useEffect(() => {
    let timer = setTimeout(() => {
      setIsLoad(false);
    }, 250);
    return () => {
      clearInterval(timer);
    };
  }, []);

  if (!process.env.NEXT_PUBLIC_ISPRO) {
    return (
      <div className="mb-4 flex h-[600px] w-full items-center justify-center bg-gray-200">
        非生产环境不显示广告
      </div>
    );
  }
  /** 没有设置client_id*/
  if (!process.env.NEXT_PUBLIC_GOOGLE_ADS_CLIENT_ID) {
    return <></>;
  }

  return (
    <div className="mb-4 flex h-[600px] w-full justify-center bg-white">
      {isLoad ? (
        <div className="flex h-full w-full items-center justify-center bg-gray-100">
          请等待...
        </div>
      ) : (
        <Suspense>
          <ADS />
        </Suspense>
      )}
    </div>
  );
});
export default AdSense;
