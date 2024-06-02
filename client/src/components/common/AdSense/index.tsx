"use client";
import { useEffect, useState, memo, Suspense } from "react";
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
      <div className="w-full h-[600px] mb-4 bg-gray-200 flex items-center justify-center">
        非生产环境不显示广告
      </div>
    );
  }
  /** 没有设置client_id*/
  if (!process.env.NEXT_PUBLIC_GOOGLE_ADS_CLIENT_ID) {
    return <></>;
  }

  return (
    <div className="w-full h-[600px] mb-4 flex justify-center bg-white">
      {isLoad ? (
        <div className="w-full h-full bg-gray-100 flex items-center justify-center">请等待...</div>
      ) : (
        <Suspense>
          <ADS />
        </Suspense>
      )}
    </div>
  );
});
export default AdSense;
