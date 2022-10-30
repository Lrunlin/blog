import { useEffect } from "react";
const ADS = () => {
  useEffect(() => {
    let script = document.createElement("script");
    script.src = `//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-${process.env.NEXT_PUBLIC_GOOGLE_ADS_CLIENT_ID}`;
    script.crossOrigin = "anonymous";
    document.head.append(script);
    ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
  }, []);
  return (
    <>
      <ins
        className="adsbygoogle"
        style={{ display: "block", width: "100%", height: "100px" }}
        data-ad-client={`ca-pub-${process.env.NEXT_PUBLIC_GOOGLE_ADS_CLIENT_ID}`}
        data-ad-slot={process.env.NEXT_PUBLIC_GOOGLE_ADS_SLOT}
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>
    </>
  );
};
export default ADS;
