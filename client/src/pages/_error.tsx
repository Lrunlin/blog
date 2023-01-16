import Head from "@/components/next/Head";
import { Result, Button } from "antd";
import type { ResultProps } from "antd";
import Header from "@/components/common/Header";
import type { NextPage, GetServerSideProps } from "next";
import { useRouter } from "next/navigation";

interface propsType {
  statusCode: ResultProps['status'];
}
const Error: NextPage<propsType> = ({ statusCode }) => {
  let router = useRouter();

  return (
    <>
      <Head
        title={`${statusCode} | 页面加载错误`}
        description={statusCode + ""}
        keywords={[statusCode + ""]}
      />
      <Header />
      <Result
        status={statusCode}
        title={statusCode}
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
