import Script from "next/script";

const ADS = () => {
  return (
    <>
      <Script
        async
        src={`//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-${process.env.NEXT_PUBLIC_GOOGLE_ADS_CLIENT_ID}`}
        crossOrigin="anonymous"
      />
      <Script>(adsbygoogle = window.adsbygoogle || []).push({});</Script>
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client={`ca-pub-${process.env.NEXT_PUBLIC_GOOGLE_ADS_CLIENT_ID}`}
        data-ad-slot={process.env.NEXT_PUBLIC_GOOGLE_ADS_SLOT}
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>
    </>
  );
};
export default ADS;
