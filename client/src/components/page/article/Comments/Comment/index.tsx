import { Fragment, useEffect } from "react";
import { useParams } from "next/navigation";
import { SyncOutlined } from "@ant-design/icons";
import axios from "@axios";
import type { response } from "@type/common/response";
import type { articleCommentType } from "@type/model/article-comment";
import useFetch from "@/common/hooks/useFetch";
import useUserArticleComment from "@/store/user/user-article-comment";
import CommentItem from "./Item";

/** 文章页面评论集合组件*/
const Comments = () => {
  let params = useParams();
  let articleID = params.id as string;
  let { data, isLoading, refetch } = useFetch(
    () =>
      axios
        .get<response<articleCommentType[]>>(`/comment/article/${articleID}`)
        .then((res) => res.data.data),
    { key: `/comment/article/${articleID}` },
  );
  let setEditorOption = useUserArticleComment((s) => s.setData);

  useEffect(() => {
    if (data) {
      setEditorOption({ list: data as articleCommentType[] });
    }
  }, [data]);

  return (
    <div className="border-t-solid mt-4 border-slate-200">
      {data ? (
        <>
          {data.map((item) => {
            return (
              <Fragment key={item.id}>
                <CommentItem data={item} list={data as articleCommentType[]} />
                <div className="border-b-solid mt-4 border-gray-300"></div>
              </Fragment>
            );
          })}
        </>
      ) : isLoading ? (
        <div className="h-40 bg-gray-100"></div>
      ) : (
        <div className="py-20 text-center">
          <div>评论区加载错误</div>
          <SyncOutlined
            className="mt-4 block text-2xl"
            onClick={() => refetch()}
          />
        </div>
      )}
    </div>
  );
};
export default Comments;
