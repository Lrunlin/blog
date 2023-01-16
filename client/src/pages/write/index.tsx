import type { NextPage } from "next";
import Head from "@/components/next/Head";
import axios from "axios";
import ArticleEditor from "@/components/common/ArticleEditor";
import { useRouter } from "next/navigation";
import { message } from "antd";

const Write: NextPage = () => {
  let router = useRouter();

  return (
    <div className="bg-white ">
      <ArticleEditor
        showDraftsButton={true}
        meta={
          <Head
            title={`写文章-${process.env.NEXT_PUBLIC_SITE_NAME}`}
            description="文章发布"
            keywords={["文章发布", "MarkDown"]}
          />
        }
        submit={values => {
          axios
            .post("/article", { ...values, state: 1 })
            .then(res => {
              if (res.data.success) {
                message.success(res.data.message);
                router.replace("/creator/content/article");
              } else {
                message.error(res.data.message);
              }
            })
            .catch(err => {
              message.error(err.response?.data?.message);
            });
        }}
      />
    </div>
  );
};
export default Write;
