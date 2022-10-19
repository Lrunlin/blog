import { GetServerSideProps } from "next";
import axios from "axios";
import setSiteMap from "@/common/utils/sitemap/article-list";
const SiteMap = () => null;
export default SiteMap;
export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  let url = req.url as string;
  let index = +url.replace("/sitemap/index", "").replace(".xml", "");
  if (!(url?.startsWith("/sitemap/index") && url?.endsWith(".xml") && !isNaN(+index))) {
    res.statusCode = 404;
    res.end();
    return {
      props: {},
    };
  }

  let sitemap = await axios.get(`/sitemap/${index}`).then(res => setSiteMap(res.data.data));
  res.setHeader("Content-Type", "text/xml");
  res.write(sitemap);
  res.end();
  return {
    props: {},
  };
};
