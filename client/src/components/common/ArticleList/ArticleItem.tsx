import { FC } from "react";
import type { articleListItemType } from "@type/article-list-item";
import dayjs from "dayjs";
import style from "./index.module.scss";
import classNames from "classnames";
import Image from "@/components/next/Image";
import Highlighter from "react-highlight-words";
import Cover from "./Cover";

export interface propsType {
  data: articleListItemType;
  keyword?: string;
}

/**
 * 文章列表组件的单个文章介绍
 * 传递单个文章数据即可
 */
const ArticleItem: FC<propsType> = props => {
  let { data, keyword } = props;

  return (
    <li className="px-5 pt-3 list-none">
      <div>
        <span className="text-[#4e5969]">{data.author_data.name}</span>
        <span className={classNames(["text-[#86909c]"])}>
          <span className={classNames([style.adorn])}>
            {dayjs(data.update_time || data.create_time)
              .fromNow()
              .replace(" ", "")}
          </span>
        </span>
        <span>
          {data.tag.slice(0, 2).map((item, index) => (
            <a
              className={classNames(["text-[#86909c]", style.tag])}
              key={`tag${data.id}${item.name}${index}`}
              href={`/search?tag=${item.name}`}
              target="_blank"
            >
              {item.name}
            </a>
          ))}
        </span>
      </div>
      <div className="flex pb-2">
        <div
          className={classNames([data.cover_url ? "w-[calc(100%-130px)]" : "w-11/12", "truncate"])}
        >
          <a
            className="font-bold text-lg text-[#1d2129] block"
            href={`/article/${data.id}`}
            target="_blank"
          >
            {keyword ? (
              <Highlighter
                highlightClassName="p-0 bg-white text-red-500"
                searchWords={[keyword]}
                autoEscape={true}
                textToHighlight={data.title}
              />
            ) : (
              data.title
            )}
          </a>
          <a
            href={`/article/${data.id}`}
            className={classNames([
              "text-sm text-[#86909c] block mt-1",
              data.cover_url ? "line-clamp-2 mr-2" : "line-clamp-1",
            ])}
            target="_blank"
          >
            {data.description}
          </a>
        </div>
        {data.cover_url && <Cover cover_url={data.cover_url} />}
      </div>
      <div className={classNames(["pb-2", "border-slate-200", "border-b-solid"])}>
        <ul
          className={classNames([
            "pl-0",
            "mb-0",
            "text-[13px]",
            "list-none",
            "flex",
            "cursor-pointer",
          ])}
        >
          <li className={classNames(["flex", "items-center"])}>
            <Image src="/icon/view.png" width={16} height={16} alt="view icon" />
            <span className="ml-1">{data.view_count}</span>
          </li>
          <li className={classNames(["flex", "items-center", "mx-3"])}>
            <Image src="/icon/comment.png" width={16} height={16} alt="comment icon" />
            <span className="ml-1">{data.comment_count}</span>
          </li>
          <li className={classNames(["flex", "items-center"])}>
            <Image src="/icon/collection.png" width={16} height={16} alt="collection icon" />
            <span className="ml-1">{data.collection_count}</span>
          </li>
        </ul>
      </div>
    </li>
  );
};
export default ArticleItem;
