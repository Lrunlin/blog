import type { FC } from "react";
import { NoticeAttributes } from "@type/model-attribute";
import dynamic from "next/dynamic";
const ArticleNotice = dynamic(import("./Article"));
const ArticleCommentNotice = dynamic(import("./ArticleComment"));
const CommentNotice = dynamic(import("./Comment"));

/** 对多个通知数据进行指定类型的转换*/
const Notice: FC<{ data: NoticeAttributes[] }> = ({ data }) => {
  return (
    <>
      {data.map(item => (
        <div key={`notice-${item.id}`} className="bg-white p-2 mt-2 relative shadow-sm">
          {item.type == "article" ? (
            <ArticleNotice data={item as any} />
          ) : item.type == "article_comment" ? (
            <ArticleCommentNotice data={item as any} />
          ) : (
            <CommentNotice data={item as any} />
          )}
          {item.is_read == 0 && (
            <div className="w-2 h-2 absolute bg-red-400 rounded-full top-3 right-3"></div>
          )}
        </div>
      ))}
    </>
  );
};
export default Notice;
