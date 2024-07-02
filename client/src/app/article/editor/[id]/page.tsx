"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button, Result, Skeleton, message } from "antd";
import axios from "@axios";
import useFetch from "@/common/hooks/useFetch";
import ArticleEditor from "@/components/common/ArticleEditor";
import Head from "@/components/next/Head";
import useUserWriteArticle from "@/store/user/user-write-article";

const Write = ({ params: { id } }: { params: { id: string } }) => {
  let router = useRouter();
  let updateData = useUserWriteArticle((s) => s.updateData);

  let { data, isLoading, refetch } = useFetch(() =>
    axios.get(`/article/${id}?update=md`).then((res) => res.data.data),
  );

  // 为状态设置值
  useEffect(() => {
    if (data) {
      let {
        title,
        content,
        tag,
        reprint,
        description,
        cover_file_name,
        cover_url,
        theme_id,
      } = data;
      updateData({
        title,
        content,
        tag,
        reprint,
        description,
        cover_file_name,
        cover_url,
        theme_id,
      });
    }
  }, [data]);

  return (
    <div className="bg-white">
      {data ? (
        <ArticleEditor
          showDraftsButton={data.state == 0}
          meta={
            <Head
              title={`写文章-${process.env.NEXT_PUBLIC_SITE_NAME}`}
              description="文章发布"
              keywords={["文章发布", "MarkDown"]}
            />
          }
          submit={(values) => {
            axios
              .put(`/article/${id}`, { ...values, state: 1 })
              .then((res) => {
                message.success(res.data.message);
                refetch();
              })
              .catch((err) => {
                message.error(err.message);
              });
          }}
        />
      ) : isLoading ? (
        <Skeleton paragraph={{ rows: 4 }} />
      ) : (
        <Result
          status="error"
          title="文章查找错误"
          extra={
            <Button
              type="primary"
              onClick={() => router.replace("/creator/content/article")}
            >
              回到内容管理
            </Button>
          }
        />
      )}
    </div>
  );
};
export default Write;
