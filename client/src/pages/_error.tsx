import Head from "@/components/next/Head";
import { Result, Button } from "antd";
import type { ResultProps } from "antd";
import Header from "@/components/common/Header";
import type { NextPage, GetServerSideProps } from "next";
import { useRouter } from "next/navigation";

interface propsType {
  statusCode: ResultProps["status"];
}
const Error: NextPage<propsType> = ({ statusCode } = { statusCode: 500 }) => {
  let router = useRouter();
  const code = statusCode || 500;

  return (
    <>
      <Head title={`${code} | 页面加载错误`} description={code + ""} keywords={[code + ""]} />
      <Header />
      <Result
        status={code}
        title={code}
        subTitle="页面加载错误"
        extra={
          <Button type="primary" onClick={() => router.replace("/")}>
            回到首页
          </Button>
        }
      />
    </>
  );
};
export const getServerSideProps: GetServerSideProps = async ctx => {
  return {
    props: {
      statusCode: ctx.res.statusCode || 500,
    },
  };
};
export default Error;
