import { useEffect } from "react";
import Layout from "@/layout/Base";
import axios from "axios";
import { RedoOutlined } from "@ant-design/icons";
import { Button, Result } from "antd";
import useSwr from "swr";
import { useRouter, useSearchParams } from "next/navigation";
import Cookies from "js-cookie";
import Head from "@/components/next/Head";

const Github = () => {
  let router = useRouter();
  let searchParams = useSearchParams();
  let code = searchParams!.get("code");

  let { data, error, isValidating } = useSwr(`oauth-github-${code}`, () =>
    code ? axios.post("/user/github", { code: code }).then(res => res.data) : ""
  );
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (data) {
      if (data.token) {
        Cookies.set("token", data.token);
      }
      timer = setTimeout(() => {
        window.close();
      }, 1200);
    }
    () => {
      clearTimeout(timer);
    };
  }, [data]);

  return (
    <Layout>
      <div className="bg-white shadow-sm w-full">
        <div>
          {isValidating ? (
            <>
              <Head title="GitHub登录" />
              <Result icon={<RedoOutlined spin />} title="请求中..." />
            </>
          ) : error ? (
            <>
              <Head title="登录失败" />
              <Result
                status="error"
                title="请求错误"
                subTitle="这可能不是您的原因，也许是GitHub受到防火墙影响。"
                extra={
                  <Button type="primary" onClick={() => router.replace("/creator/content/article")}>
                    返回
                  </Button>
                }
              />
            </>
          ) : (
            <>
              <Head title={`登录${data.success ? "成功" : "失败"}`} />
              <Result
                status={data.success ? "success" : "error"}
                title={data.success ? "成功" : "失败"}
                subTitle={data.message}
                extra={
                  <Button type="primary" onClick={() => router.replace("/creator/content/article")}>
                    返回
                  </Button>
                }
              />
            </>
          )}
        </div>
      </div>
    </Layout>
  );
};
export default Github;
