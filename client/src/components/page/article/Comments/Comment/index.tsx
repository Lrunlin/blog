import { Fragment, useEffect } from "react";
import { useSetRecoilState } from "recoil";
import useSWR from "swr";
import axios from "axios";
import { useParams } from "next/navigation";
import { SyncOutlined } from "@ant-design/icons";
import CommentItem from "./Item";
import type { articleCommentType } from "@type/model/article-comment";
import type { response } from "@type/common/response";
import { editorOptionContext } from "../index";

/** 文章页面评论集合组件*/
const Comments = () => {
  let params = useParams();
  let articleID = params.id as string;
  let { data, isValidating, mutate } = useSWR(`/comment/article/${articleID}`, () =>
    axios
      .get<response<articleCommentType[]>>(`/comment/article/${articleID}`)
      .then(res => res.data.data)
  );
  let setEditorOptionContext = useSetRecoilState(editorOptionContext);
  useEffect(() => {
    if (data) {
      setEditorOptionContext(option => ({ ...option, data: data as articleCommentType[] }));
    }
  }, [data]);

  return (
    <div className="mt-4 border-t-solid border-slate-200">
      {data ? (
        <>
          {data.map(item => {
            return (
              <Fragment key={item.id}>
                <CommentItem data={item} list={data as articleCommentType[]} />
                <div className="border-b-solid border-gray-300 mt-4"></div>
              </Fragment>
            );
          })}
        </>
      ) : isValidating ? (
        <div className="bg-gray-100 h-40"></div>
      ) : (
        <div className="py-20 text-center">
          <div>评论区加载错误</div>
          <SyncOutlined className="text-2xl mt-4 block" onClick={() => mutate()} />
        </div>
      )}
    </div>
  );
};
export default Comments;
