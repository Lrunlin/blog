import Head from "@/components/next/Head";
import { Result, Button } from "antd";
import type { ResultStatusType } from "antd/lib/result";
import Header from "@/components/common/Header";
import type { NextPage, GetServerSideProps } from "next";
import { useRouter } from "next/router";

interface propsType {
  statusCode: ResultStatusType;
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
        status={statusCode as any} //antd支持的类型比较特殊直接any
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
