"use client";

import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { message } from "antd";
import axios from "@axios";
import ArticleEditor from "@/components/common/ArticleEditor";
import Head from "@/components/next/Head";

const ArticleRemoveWarn = dynamic(
  () => import("@/components/page/article/editor/ArticleRemoveWarn"),
  {
    ssr: false,
  },
);
const Write = () => {
  let router = useRouter();

  return (
    <div className="bg-white">
      <ArticleRemoveWarn />
      <ArticleEditor
        showDraftsButton={true}
        meta={
          <Head
            title={`写文章-${process.env.NEXT_PUBLIC_SITE_NAME}`}
            description="文章发布"
            keywords={["文章发布", "MarkDown"]}
          />
        }
        submit={(values) => {
          axios
            .post("/article", { ...values, state: 1 })
            .then((res) => {
              message.success(res.data.message);
              router.replace("/creator/content/article");
            })
            .catch((err) => {
              message.error(err.message);
            });
        }}
      />
    </div>
  );
};
export default Write;
