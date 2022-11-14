import { GetServerSideProps } from "next";
import axios from "axios";
import setSiteMap from "@/common/modules/sitemap/sitemap-list";

const SiteMap = () => null;
export default SiteMap;
export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  res.setHeader("Content-Type", "text/xml");
  let xml = await axios.get("/sitemap").then(res => setSiteMap(res.data.data));
  res.write(xml);
  res.end();
  return {
    props: {},
  };
};
