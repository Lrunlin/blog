import useSWR from "swr";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { SyncOutlined } from "@ant-design/icons";
import CommentItem from "./CommentItem";
import type { CommentAttributes } from "@type/model-attribute";
import type { response } from "@type/response";

const Comments = () => {
  let searchParams = useSearchParams();
  let articleID = searchParams.get("id");
  let { data, isValidating, error, mutate } = useSWR(`/comment/list/${articleID}`, () =>
    axios
      .get<response<CommentAttributes[]>>(`/comment/list/${articleID}`)
      .then(res => res.data.data)
  );

  return (
    <div className="mt-4 border-t-solid border-slate-200">
      {data && (
        <div>
          {data.map(item => {
            return (
              <div key={item.id}>
                <CommentItem data={item} />
              </div>
            );
          })}
        </div>
      )}
      {isValidating && <div className="bg-gray-100 h-40"></div>}
      {error && (
        <div className="py-20 text-center">
          <div>评论区加载错误</div>
          <SyncOutlined className="text-2xl mt-4 block" onClick={() => mutate()} />
        </div>
      )}
    </div>
  );
};
export default Comments;
