import { useState, useEffect, useRef } from "react";
import type { GetServerSideProps, NextPage } from "next";
import Head from "@/components/next/Head";
import { useRouter } from "next/navigation";
import ArticleEditor from "@/components/common/ArticleEditor";
import { Result, Button, message, Skeleton } from "antd";
import useSWR from "swr";
import axios from "axios";
import { useRecoilState } from "recoil";
import { writeArticleContext } from "@/components/common/ArticleEditor";

interface propsType {
  id: number;
}
const Write: NextPage<propsType> = props => {
  let router = useRouter();

  let [articleData, setArticleData] = useRecoilState(writeArticleContext);
  const [isValidating, setIsValidating] = useState(true);

  let { data, error, mutate } = useSWR(`article-update-${props}`, () =>
    axios.get(`/article/${props.id}?update=md`).then(res => res.data.data)
  );

  // 为状态设置值
  useEffect(() => {
    if (data) {
      let { title, content, tag, reprint, description, cover_file_name, cover_url } = data;
      setArticleData({ title, content, tag, reprint, description, cover_file_name, cover_url });
    }
  }, [data]);

  // 判断状态是否已经设置了值，设置之后在允许组件渲染
  let runCount = useRef(0);
  useEffect(() => {
    if (runCount.current > 0) {
      setIsValidating(false);
    } else {
      runCount.current++;
    }
  }, [articleData]);

  return (
    <div className="bg-white">
      {!isValidating && data && (
        <ArticleEditor
          showDraftsButton={data.state == 0}
          meta={
            <Head
              title={`写文章-${process.env.NEXT_PUBLIC_SITE_NAME}`}
              description="文章发布"
              keywords={["文章发布", "MarkDown"]}
            />
          }
          submit={values => {
            axios
              .put(`/article/${props.id}`, { ...values, state: 1 })
              .then(res => {
                if (res.data.success) {
                  message.success(res.data.message);
                  mutate();
                } else {
                  message.error(res.data.message);
                }
              })
              .catch(err => {
                message.error(err.response?.data?.message);
              });
          }}
        />
      )}
      {isValidating && <Skeleton paragraph={{ rows: 4 }} />}
      {error && (
        <Result
          status="error"
          title="文章查找错误"
          extra={
            <Button type="primary" onClick={() => router.replace("/creator/content/article")}>
              回到内容管理
            </Button>
          }
        />
      )}
    </div>
  );
};
export default Write;
export const getServerSideProps: GetServerSideProps = async ctx => {
  return {
    props: {
      id: ctx?.params?.id,
    },
  };
};
