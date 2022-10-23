import { useEffect } from "react";
import Layout from "@/layout/Base";
import axios from "axios";
import { RedoOutlined } from "@ant-design/icons";
import { Button, Result } from "antd";
import useSwr from "swr";
import { useRouter } from "next/router";
import Cookies from "js-cookie";

const Github = () => {
  let router = useRouter();
  let code = router.query.code;

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
            <Result icon={<RedoOutlined spin />} title="请求中..." />
          ) : error ? (
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
          ) : (
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
          )}
        </div>
      </div>
    </Layout>
  );
};
export default Github;
