import axios from "axios";
import type { GetServerSideProps } from "next";

const Theme = () => null;
export default Theme;
export const getServerSideProps: GetServerSideProps = async ({ res, params }) => {
  if (!(params?.id as string).endsWith(".css")) {
    return { notFound: true };
  }
  let content = await axios
    .get(`/theme/${(params?.id as string).replace(/.css/, "")}`)
    .then(res => res.data?.data?.content)
    .catch(() => false);

  if (!content) {
    return { notFound: true };
  }

  res.setHeader("Content-Type", "text/css; charset=utf-8");
  res.write(content);

  res.end();
  return {
    props: {},
  };
};
