"use client";
import { useState } from "react";
import { Skeleton, Pagination, Dropdown, message, Result, Button } from "antd";
import Layout from "@/components/page/creator/Layout";
import useFetch from "@/common/hooks/useFetch";
import axios from "@axios";
import { CheckOutlined, EllipsisOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";

// 创作者中心-内容管理-文章管理
const ContentArticle = () => {
  let router = useRouter();
  const [page, setPage] = useState(1);

  let { data, isLoading, error, setData, refetch } = useFetch(
    () => axios.get("/problem/list/" + page).then(res => res.data.data),
    { deps: [page] }
  );
  let rotuer = useRouter();

  function createMenu(id: number) {
    function remove() {
      axios.delete(`/problem/${id}`).then(res => {
        if (res.data.success) {
          message.success(res.data.message);

          setData((_data: any) => {
            return {
              total: --_data.total,
              list: _data.list.filter((item: any) => item.id != id),
            };
          });
        } else {
          message.error(res.data.message);
        }
      });
    }
    return {
      items: [
        {
          key: `creator-problem-list-delete-${id}`,
          label: (
            <div className="px-1 py-0.5" onClick={remove}>
              删除
            </div>
          ),
        },
        {
          key: `creator-problem-list-edit-${id}`,
          label: (
            <div className="px-1 py-0.5" onClick={() => router.push(`/problem/editor/${id}`)}>
              编辑
            </div>
          ),
        },
      ],
    };
  }

  return (
    <Layout className="p-4 bg-white">
      <div className="shadow-sm">
        {isLoading ? (
          <div>
            <Skeleton />
            <Skeleton />
          </div>
        ) : error ? (
          <Result
            status="error"
            title="请求失败"
            extra={
              <Button type="primary" onClick={refetch}>
                重新请求
              </Button>
            }
          />
        ) : (
          <div>
            {data.list!.map((item: any) => (
              <div
                className="p-1 cursor-pointer border-slate-100 border-b-solid flex justify-between"
                key={item.id}
              >
                <div>
                  <div
                    className="font-bold text-base"
                    onClick={() => rotuer.push(`/problem/editor/${item.id}`)}
                  >
                    {item.title}
                  </div>
                  {item.answer_id && (
                    <div className="text-green-700 mr-2">
                      <CheckOutlined />
                      已采纳
                    </div>
                  )}
                  <div className="mt-2">
                    已有<span className="font-bold mx-1">{item.answer_count}</span>个评论
                  </div>
                </div>
                <Dropdown menu={createMenu(item.id)} placement="bottom">
                  <div className="w-6 h-6 flex justify-center items-center hover:bg-gray-200">
                    <EllipsisOutlined />
                  </div>
                </Dropdown>
              </div>
            ))}
            <div className="flex justify-center">
              <Pagination
                defaultPageSize={10}
                className="mt-4 mb-4"
                defaultCurrent={1}
                current={page}
                total={data.total}
                onChange={page => setPage(page)}
                showSizeChanger={false}
              />
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};
export default ContentArticle;
