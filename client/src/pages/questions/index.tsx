import Head from "@/components/next/Head";
import Layout from "@/components/page/questions/Layout";
import { GetServerSideProps } from "next";
import axios from "axios";
const Questions = () => {
  return (
    <Layout>
      <Head title={`技术问答 - ${process.env.NEXT_PUBLIC_SITE_NAME}`} />
      <div></div>
    </Layout>
  );
};
export const getServerSideProps: GetServerSideProps = async ctx => {
  let response = await axios(`/questions`)
    .then(res => res.data.data)
    .catch(() => null);
  if (!response) {
    ctx.res.statusCode = 404;
  }
  return {
    props: {
      data: response,
    },
  };
};
export default Questions;
