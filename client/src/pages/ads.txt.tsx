import { GetServerSideProps } from "next";
const SiteMap = () => null;
export default SiteMap;
export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  res.setHeader("Content-Type", "text/txt");
  if (process.env.NEXT_PUBLIC_GOOGLE_ADS_CLIENT_ID) {
    res.write(
      `google.com, pub-${process.env.NEXT_PUBLIC_GOOGLE_ADS_CLIENT_ID}, DIRECT, f08c47fec0942fa0`
    );
  } else {
    res.statusCode = 404;
  }
  res.end();
  return {
    props: {},
  };
};
