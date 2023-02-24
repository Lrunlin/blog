import { memo } from "react";
import type { FC, Dispatch, SetStateAction } from "react";
import { DashOutlined } from "@ant-design/icons";
import { Dropdown, Menu, message } from "antd";
import Link from "next/link";
import type { articleListItemType } from "@type/model/article-list-item";
import axios from "axios";
interface propsType {
  data: articleListItemType;
  dispatch: {
    setData: Dispatch<SetStateAction<articleListItemType[]>>;
    setTotal: Dispatch<SetStateAction<number>>;
  };
}

/** 创建下拉菜单（文章ID、设置data的setData、setTotal函数、类型 */
function createMenu(
  id: number,
  setData: propsType["dispatch"]["setData"],
  setTotal: propsType["dispatch"]["setTotal"]
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
  return {
    items: [
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
    ],
  };
}
const ArticleListItem: FC<propsType> = memo(({ data, dispatch }) => {
  return (
    <>
      <li className="px-1 py-4 border-b-solid border-gray-300">
        <div className="flex justify-between">
          <span className="text-black text-base">{data.title}</span>
          <Dropdown
            menu={createMenu(data.id, dispatch.setData, dispatch.setTotal)}
            placement="bottom"
            arrow
          >
            <span className="px-1 hover:bg-gray-300 rounded-sm duration-200 cursor-pointer">
              <DashOutlined />
            </span>
          </Dropdown>
        </div>
        <div className="mt-2 flex text-gray-400">
          <span>{data.update_time || data.create_time}</span>
          {data.state == 1 && (
            <>
              <span className="mx-1.5 text-sm">&bull;</span>
              <span>{data.view_count} 阅读</span>
              <span className="mx-1.5 text-sm">&bull;</span>
              <span>{data.comment_count} 评论</span>
              <span className="mx-1.5 text-sm">&bull;</span>
              <span>{data.like_count} 点赞</span>
            </>
          )}
        </div>
      </li>
    </>
  );
});
export default ArticleListItem;
