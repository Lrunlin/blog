import type { NextPage } from "next";
import Head from "@/components/next/Head";
import axios from "axios";
import ArticleEditor from "@/components/common/ArticleEditor";
import { useRouter } from "next/router";
import { message } from "antd";
import { useResetRecoilState } from "recoil";
import { writeArticleContext } from "@/components/common/ArticleEditor";
import { env } from "process";

const Write: NextPage = () => {
  let router = useRouter();
  let resetArticleData = useResetRecoilState(writeArticleContext);

  return (
    <div className="bg-white ">
      <ArticleEditor
        showDraftsButton={true}
        meta={
          <Head
            title={`写文章-${env.SITE_NAME}`}
            description="文章发布"
            keywords={["文章发布", "MarkDown"]}
          />
        }
        submit={values => {
          axios.post("/article", values).then(res => {
            if (res.data.success) {
              message.success(res.data.message);
              router.replace("/creator");
              resetArticleData();
            } else {
              message.error(res.data.message);
            }
          });
        }}
      />
    </div>
  );
};
export default Write;
