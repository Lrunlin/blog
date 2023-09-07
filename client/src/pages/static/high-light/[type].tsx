import axios from "axios";
import type { GetServerSideProps } from "next";

const Highlight = () => null;
export default Highlight;
export const getServerSideProps: GetServerSideProps = async ({ query, res }) => {
  if (query.languages && ["js", "css"].includes(String(query.type))) {
    let content = await axios
      .get(`/high-light/${query.type}`, {
        params: { languages: query.languages },
      })
      .then(res => res.data);

    res.setHeader("Content-Type", `text/${query.type}; charset=utf-8`);
    res.setHeader("Cache-Control", `public, max-age=9999999999, must-revalidate`);
    res.write(content);
    res.end();
  } else {
    return { notFound: true };
  }

  return {
    props: {},
  };
};
