import { GetServerSideProps } from "next";
import axios from "axios";
const SiteMap = () => null;
export default SiteMap;
export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  res.setHeader("Content-Type", "text/xml");
  let xml = await axios.get("/sitemap").then(res => res.data.data);
  res.write(xml);
  res.end();
  return {
    props: {},
  };
};
