import { useState, createContext } from "react";
import type { FC } from "react";
import { GetServerSideProps } from "next";
import axios from "axios";
import Layout from "@/components/page/problem/Layout";
import NoFound from "@/components/page/problem/NoFound";
import Answer from "@/components/page/problem/Answer";
import { parse } from "cookie";

import { useSearchParams } from "next/navigation";
import ArticleUserData from "@/components/page/article/UserData";
import type { problemType } from "@type/model/problem";
import style from "@/styles/article.module.scss";
import dynamic from "next/dynamic";
import { message } from "antd";
import Comments from "@/components/page/problem/Comments";
import NoFollowLink from "@/components/next/NoFollowLink";
import useUserData from "@/store/user-data";
import ToolBar from "@/components/page/problem/ToolBar";
import readingRecords from "@/common/modules/readingRecords/readingRecords";
const Editor = dynamic(() => import("@/components/page/problem/Editor"), { ssr: false });
const CommentEditor = dynamic(() => import("@/components/page/problem/Comments/Editor"), {
  ssr: false,
});

interface propsType {
  data: null | problemType;
}
/** 问答页面数据context*/
export const Context = createContext<{ data: problemType; reload: Function }>({} as any);
const Problem: FC<propsType> = ({ data: _data }) => {
  let searchParams = useSearchParams();
  const [data, setData] = useState(_data);
  const [problemReplyShrink, setProblemReplyShrink] = useState(false);
  let [userData] = useUserData();
  if (!data) return <NoFound />;
  function reload() {
    axios
      .get(`/problem/${searchParams.get("id")}`)
      .then((res: any) => setData(res.data.data))
      .catch(err => {
        console.log(err);
        message.error("数据刷新失败");
      });
  }
  function deleteProblem() {
    axios
      .delete(`/problem/${searchParams.get("id")}`)
      .then(res => {
        message.success("删除成功");
      })
      .catch(err => {
        message.error("删除失败");
        console.log(err);
      });
  }

  return (
    <Context.Provider value={{ data, reload }}>
      <Layout>
        <div className="bg-white p-8">
          <h1 className="text-4xl font-semibold break-all">{data.title}</h1>
          <ArticleUserData data={data as any} type="problem" />
          <div className={style.article} dangerouslySetInnerHTML={{ __html: data.content }}></div>
          <div className="my-2">
            <ToolBar />
          </div>
          {/* 对问题的回复 */}
          <div className="flex items-center justify-between text-gray-500 cursor-pointer select-none">
            <div>
              <span onClick={() => setProblemReplyShrink(state => !state)}>
                {problemReplyShrink ? "收起" : "回复"}
              </span>
            </div>
            {userData?.id == data.author && (
              <div>
                <NoFollowLink
                  className="text-gray-500 cursor-pointer mr-4 hover:text-gray-800"
                  href={`/problem/editor/${searchParams.get("id")}`}
                >
                  编辑
                </NoFollowLink>
                <span className="cursor-pointer hover:text-gray-800" onClick={deleteProblem}>
                  删除问题
                </span>
              </div>
            )}
          </div>

          {problemReplyShrink && (
            <CommentEditor
              belong_id={+(searchParams.get("id") as string)}
              reply={null}
              type="problem"
              onSuccess={reload}
            />
          )}
          <Comments
            type="problem"
            belong_id={+(searchParams.get("id") as string)}
            data={data.comment_list}
            className="mt-2"
          />
        </div>
        {!!data.answer_list.length && <Answer />}
        {userData?.id != data.author && (
          <Editor onSuccess={reload} />
        )}
      </Layout>
    </Context.Provider>
  );
};
export default Problem;
export const getServerSideProps: GetServerSideProps = async ctx => {
  let { token } = parse(ctx?.req?.headers?.cookie + "");

  let data = await axios
    .get(`/problem/${ctx?.params?.id}`, {
      headers: { authorization: token },
    })
    .then((res: any) => res.data.data)
    .catch(() => null);

  if (!data) {
    ctx.res.statusCode = 404;
  } else {
    if (ctx.req.url?.startsWith("/problem/")) {
      readingRecords(ctx);
    }
  }
  return {
    props: { data: data },
  };
};
