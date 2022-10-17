import { useEffect, useState } from "react";
import ADS from "./ADS";
const AdSense = () => {
  const [isLoad, setIsLoad] = useState(true);
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
  useEffect(() => {
    let timer: NodeJS.Timeout;
    function ready() {
      if (document.readyState == "complete") {
        timer = setTimeout(() => {
          setIsLoad(false);
        }, 100);
      }
    }
    document.addEventListener("readystatechange", ready);
    return () => {
      clearInterval(timer);
      document.removeEventListener("readystatechange", ready);
    };
  }, []);
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
