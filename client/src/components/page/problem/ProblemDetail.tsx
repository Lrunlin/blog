"use client";

import { FC, createContext, useState } from "react";
import { useParams } from "next/navigation";
import { message } from "antd";
import axios from "@axios";
import type { problemType } from "@type/model/problem";
import StyleLink from "@/components/common/Editor/StyleLink";
import Head from "@/components/next/Head";
import NoFollowLink from "@/components/next/NoFollowLink";
import ArticleUserData from "@/components/page/article/UserData";
import Answer from "@/components/page/problem/Answer";
import Comments from "@/components/page/problem/Comments";
import CommentEditor from "@/components/page/problem/Comments/Editor";
import Editor from "@/components/page/problem/Editor";
import NoFound from "@/components/page/problem/NoFound";
import ToolBar from "@/components/page/problem/ToolBar";
import useUserData from "@/store/user/user-data";
import style from "@/styles/content.module.scss";

/** 问答页面数据context*/
export const Context = createContext<{ data: problemType; reload: Function }>(
  {} as any,
);
const ProblemDetail: FC<{ data: any }> = ({ data: _data }) => {
  let params = useParams();
  let id = params.id as string;
  const [data, setData] = useState(_data);
  const [problemReplyShrink, setProblemReplyShrink] = useState(false);
  let userData = useUserData((s) => s.data);

  function reload() {
    axios
      .get(`/problem/${id}`)
      .then((res: any) => setData(res.data.data))
      .catch((err) => {
        console.log(err);
        message.error("数据刷新失败");
      });
  }
  function deleteProblem() {
    axios
      .delete(`/problem/${id}`)
      .then((res) => {
        message.success("删除成功");
      })
      .catch((err) => {
        message.error("删除失败");
        console.log(err);
      });
  }
  return (
    <>
      {data ? (
        <Context.Provider value={{ data, reload }}>
          <Head title={data.title} />
          <StyleLink id={0} />
          <div className="bg-white p-8">
            <h1 className="break-all text-4xl font-semibold">{data.title}</h1>
            <ArticleUserData data={data as any} type="problem" />
            <div
              className={`content-body ${style.content_body}`}
              suppressHydrationWarning={true}
              dangerouslySetInnerHTML={{ __html: data.content }}
            ></div>
            <div className="my-2">
              <ToolBar />
            </div>
            {/* 对问题的回复 */}
            <div className="flex cursor-pointer select-none items-center justify-between text-gray-500">
              <div>
                <span onClick={() => setProblemReplyShrink((state) => !state)}>
                  {problemReplyShrink ? "收起" : "回复"}
                </span>
              </div>
              {userData?.id == data.author && (
                <div>
                  <NoFollowLink
                    className="mr-4 cursor-pointer text-gray-500 hover:text-gray-800"
                    href={`/problem/editor/${id}`}
                  >
                    编辑
                  </NoFollowLink>
                  <span
                    className="cursor-pointer hover:text-gray-800"
                    onClick={deleteProblem}
                  >
                    删除问题
                  </span>
                </div>
              )}
            </div>

            {problemReplyShrink && (
              <CommentEditor
                belong_id={+id}
                reply={null}
                type="problem"
                onSuccess={reload}
              />
            )}
            <Comments
              type="problem"
              belong_id={+id}
              data={data.comment_list}
              className="mt-2"
            />
          </div>
          {!!data.answer_list.length && <Answer />}
          {userData?.id != data.author && <Editor onSuccess={reload} />}
        </Context.Provider>
      ) : (
        <div className="bg-white">
          <NoFound />
        </div>
      )}
    </>
  );
};
export default ProblemDetail;
