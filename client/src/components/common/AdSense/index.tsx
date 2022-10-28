import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
const ADS = dynamic(import("./ADS"), { ssr: false });

const AdSense = () => {
  const [isLoad, setIsLoad] = useState(true);
  useEffect(() => {
    let timer = setTimeout(() => {
      setIsLoad(false);
    }, 100);
    return () => {
      clearInterval(timer);
    };
  }, []);

  if (process.env.NODE_ENV == "development") {
    return (
      <div className="w-full h-96 my-3 bg-gray-200 flex items-center justify-center">
        开发环境不显示广告
      </div>
    );
  }
  /** 没有设置client_id*/
  if (!process.env.NEXT_PUBLIC_GOOGLE_ADS_CLIENT_ID) {
    return <></>;
  }

  return (
    <>
      {isLoad ? (
        <div className="w-full h-96 my-3 bg-gray-200 flex items-center justify-center">
          请等待...
        </div>
      ) : (
        <ADS />
      )}
    </>
  );
};
export default AdSense;
