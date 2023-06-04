import type { FC } from "react";
import type { articleListItemType } from "@type/model/article-list-item";
import { Skeleton, Divider, Empty } from "antd";
import InfiniteScroll from "react-infinite-scroll-component";
import ArticleItem from "./ArticleItem";
import classNames from "classnames";
import type { propsType as itemPropsType } from "./ArticleItem";

interface propsType {
  className?: string;
  list: articleListItemType[];
  total: number;
  loadMoreData: () => void;
  titleKeyword?: itemPropsType["titleKeyword"];
}

/**
 * 文章列表展示组件
 * @params list {object[]} 文章数据
 * @params total {number} 总数
 * @params loadMoreData {function} 获取更多数据
 */
const ArticleList: FC<propsType> = props => {
  let { list, total, loadMoreData, className } = props;
  return (
    <>
      {list.length ? (
        <InfiniteScroll
          dataLength={list.length}
          next={loadMoreData}
          hasMore={list.length < total}
          loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
          endMessage={<Divider plain>到底啦 ~ ~ 🤐</Divider>}
          className={classNames(["bg-white", className])}
        >
          <ul className="p-0 w-full">
            {list.map(item => (
              <ArticleItem
                key={`article-list-${item.id}`}
                data={item}
                titleKeyword={props.titleKeyword}
              />
            ))}
          </ul>
        </InfiniteScroll>
      ) : (
        <div className="bg-white py-32">
          <Empty description="文章列表为空" image={Empty.PRESENTED_IMAGE_SIMPLE} />
        </div>
      )}
    </>
  );
};

export default ArticleList;
