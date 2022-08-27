import { useState, useEffect } from "react";
import Layout from "@/components/page/user/setting/Layout";
import axios from "axios";
import { RedoOutlined } from "@ant-design/icons";
import { Button, Result } from "antd";
import useSwr from "swr";
import { useRouter } from "next/router";


const Github = () => {
  let router = useRouter();
  let code=router.query.code;
  
  let { data, error, isValidating } = useSwr(`oauth-github-${code}`, () =>
    code ? axios.put("/user/github",{code:code}).then(res => res.data.success) : ""
  );

  return (
    <Layout>
      <div>
        {error && (
          <Result
            status="error"
            title="绑定错误"
            subTitle="这可能不是您的原因，也许是GitHub受到防火墙影响。"
            extra={[
              <Button
                type="primary"
                key="console"
                onClick={() => router.replace("/creator/content/article")}
              >
                返回
              </Button>,
            ]}
          />
        )}
        {isValidating && <Result icon={<RedoOutlined spin />} title="请求中..." />}
      </div>
    </Layout>
  );
};
export default Github;

