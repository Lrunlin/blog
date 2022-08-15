import { useState, useEffect } from "react";
import type { NextPage } from "next";
import Head from "@/components/next/Head";
import ArticleEditor from "@/components/common/ArticleEditor";
import { Button, Result, message } from "antd";
import axios from "axios";
import { useRouter } from "next/router";
import { useResetRecoilState, useSetRecoilState } from "recoil";
import { writeArticleContext, initValue } from "@/components/common/ArticleEditor";
import { ReloadOutlined } from "@ant-design/icons";
import { env } from "process";

const Drafts: NextPage = () => {
  let router = useRouter();
  let resetArticleData = useResetRecoilState(writeArticleContext);
  let setArticleData = useSetRecoilState(writeArticleContext);

  const [responseState, setResponseState] = useState("load");
  useEffect(() => {
    if (!router.query.id) {
      return;
    }

    axios
      .get(`/drafts/${router.query.id}`)
      .then(res => {
        let { data } = res.data;
        setResponseState("success");
        setArticleData({
          ...initValue,
          title: data.title,
          content: data.content,
        } as any);
      })
      .catch(() => setResponseState("error"));
  }, [router.query]);
  return (
    <>
      {responseState == "error" && (
        <Result
          status="404"
          title="没有找到指定草稿"
          extra={
            <Button type="primary" onClick={() => router.replace("/creator")}>
              返回
            </Button>
          }
        />
      )}
      {responseState == "load" && (
        <div className="w-full h-screen bg-slate-100 flex items-center justify-center">
          <ReloadOutlined style={{ fontSize: 30 }} spin />
        </div>
      )}
      {responseState == "success" && (
        <ArticleEditor
          meta={<Head title={`写文章-${env.SITE_NAME}`} />}
          submit={values => {
            axios.post("/article", values).then(res => {
              if (res.data.success) {
                message.success(res.data.message);
                resetArticleData();
                router.replace("/creator");
              } else {
                message.error(res.data.message);
              }
            });
          }}
        />
      )}
    </>
  );
};
export default Drafts;
