import { useState, useEffect } from "react";
import type { FC, Dispatch, SetStateAction } from "react";
import useUserData from "@/store/user-data";
import { Skeleton, Divider, Empty, Result, Dropdown, Menu, message } from "antd";
import { DashOutlined } from "@ant-design/icons";
import InfiniteScroll from "react-infinite-scroll-component";
import type { articleListItemType } from "@type/article-list-item";
import Link from "next/link";
import type { response } from "@type/response";
import axios from "axios";

//!优化文章和草稿箱为一个页面

/** 创建下拉菜单（文章ID、设置data的setData函数、类型：文章页面还是草稿箱）*/
function createMenu(
  id: number,
  setData: Dispatch<SetStateAction<articleListItemType[]>>,
  setTotal: Dispatch<SetStateAction<number>>
) {
  function remove() {
    axios.delete(`/article/${id}`).then(res => {
      if (res.data.success) {
        message.success(res.data.message);
        setData(_data => _data.filter(item => item.id != id));
        setTotal(_total => --_total);
      } else {
        message.error(res.data.message);
      }
    });
  }
  return (
    <Menu
      items={[
        {
          key: `creator-article-list-delete-${id}`,
          label: (
            <div className="px-1 py-0.5" onClick={remove}>
              删除
            </div>
          ),
        },
        {
          key: `creator-article-list-edit-${id}`,
          label: (
            <Link href={`/article/editor/${id}`}>
              <div className="px-1 py-0.5">编辑</div>
            </Link>
          ),
        },
      ]}
    />
  );
}

interface propsType {
  state: number;
}
/** 内容管理文章管理组件（文章、草稿箱）*/
const ContentArticleList: FC<propsType> = ({ state }) => {
  let [userData] = useUserData();
  let [page, setPage] = useState(1);
  let [data, setData] = useState<articleListItemType[]>([]);
  let [total, setTotal] = useState(-1);
  let [error, setError] = useState(false);
  let [isValidating, setIsValidating] = useState(true);

  useEffect(() => {
    axios
      .get<response<{ total: number; list: articleListItemType[] }>>(`/article/list/page/${page}`, {
        params: {
          author: userData?.id,
          state: state,
        },
      })
      .then(res => {
        if (total < 0) setTotal(res.data.data.total);
        setData(_data => [...data, ...res.data.data.list]);
      })
      .catch(err => {
        setError(true);
      })
      .finally(() => {
        setIsValidating(false);
      });
  }, [page]);

  return (
    <>
      {isValidating ? (
        <Skeleton avatar paragraph={{ rows: 2 }} active />
      ) : (
        <>
          {data.length ? (
            <InfiniteScroll
              dataLength={data.length}
              next={() => {
                console.log("1");
                setPage(_page => ++page);
              }}
              hasMore={data.length < total}
              loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
              endMessage={<Divider plain>到底啦 ~ ~ 🤐</Divider>}
            >
              <ul className="p-0 w-full">
                {data.map(item => (
                  <li
                    key={`article-list-author-${item.id}`}
                    className="px-1 py-4 border-b-solid border-gray-300"
                  >
                    <div className="flex justify-between">
                      <span className="text-black text-base">{item.title}</span>
                      <Dropdown
                        overlay={createMenu(item.id, setData, setTotal)}
                        placement="bottom"
                        arrow
                      >
                        <span className="px-1 hover:bg-gray-300 rounded-sm duration-200">
                          <DashOutlined />
                        </span>
                      </Dropdown>
                    </div>
                    <div className="mt-2 flex text-gray-400">
                      <span>{item.update_time || item.create_time}</span>
                      {item.state == 1 && (
                        <>
                          <span className="mx-1.5 text-sm">&bull;</span>
                          <span>{item.view_count} 阅读</span>
                          <span className="mx-1.5 text-sm">&bull;</span>
                          <span>{item.comment_count} 评论</span>
                          <span className="mx-1.5 text-sm">&bull;</span>
                          <span>{item.collection_count} 收藏</span>
                        </>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </InfiniteScroll>
          ) : (
            <div className="bg-white py-32">
              <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
            </div>
          )}
        </>
      )}

      {error && <Result status="error" title="请求错误" />}
    </>
  );
};
export default ContentArticleList;
