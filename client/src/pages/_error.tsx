import type { NextPage } from "next";
import Head from "@/utils/Head";
import { Result, Button } from "antd";
import { useRouter } from "next/router";
import Header from "@/components/common/Header";

const Error: NextPage = (props: any): JSX.Element => {
  let statusCode: number = props.statusCode;
  let router = useRouter();

  return (
    <>
      <Head
        title={`${statusCode} | 页面加载错误`}
        description={statusCode + ""}
        keyword={[statusCode + ""]}
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
Error.getInitialProps = ({ res, err }) => {
  const statusCode: number = res ? res.statusCode : 500;
  return { statusCode };
};
export default Error;
