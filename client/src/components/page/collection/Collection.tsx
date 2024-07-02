"use client";

import { useMemo } from "react";
import type { FC } from "react";
import { useParams } from "next/navigation";
import { Empty, Spin, Tabs } from "antd";
import axios from "@axios";
import { RootObject } from "@type/model/favorites-collection-list";
import { response } from "@type/response";
import useFetch from "@/common/hooks/useFetch";
import ArticleItem from "@/components/common/ArticleList/ArticleItem";
import ToolsBar from "@/components/page/collection/ToolsBar";
import ProblemList from "@/components/page/problem/List";
import useUserData from "@/store/user/user-data";

const Collection: FC<{ data: RootObject }> = ({ data: propsData }) => {
  let params = useParams();
  let id = params.id as string;
  let userData = useUserData((s) => s.data);

  let {
    data: refetchData,
    isLoading,
    refetch,
  } = useFetch(
    () =>
      axios
        .get<response<RootObject>>(`/favorites/list/${id}`)
        .then((res) => res.data.data)
        .catch((err) => {
          console.log(err);
          return null;
        }),
    { manual: true },
  );

  let data = useMemo(() => refetchData || propsData, [propsData, refetchData]);
  const items = [
    {
      label: `文章 ${data.article_list.length} 篇`,
      key: "item-1",
      children: (
        <>
          {data.article_list.length ? (
            data.article_list.map((item) => (
              <ArticleItem
                className="group"
                key={item.id}
                data={item}
                topRight={
                  userData?.id == data.author_data.id && (
                    <div className="hidden group-hover:block">
                      <ToolsBar refetch={refetch} belong_id={item.id} />
                    </div>
                  )
                }
              />
            ))
          ) : (
            <Empty description="当前收藏集暂无文章" />
          )}
        </>
      ),
    },
    {
      label: `问题 ${data.problem_list.length} 篇`,
      key: "item-2",
      children: (
        <>
          {data.problem_list.length ? (
            <ProblemList
              className="group"
              data={data.problem_list}
              topRight={(id) =>
                userData?.id == data.author_data.id && (
                  <div className="hidden group-hover:block">
                    <ToolsBar refetch={refetch} belong_id={id} />
                  </div>
                )
              }
            />
          ) : (
            <Empty description="当前收藏集暂无问题" />
          )}
        </>
      ),
    },
  ];
  return (
    <>
      <main className="w-full bg-white p-2">
        <Spin spinning={isLoading} tip="Loading...">
          <Tabs items={items}></Tabs>
        </Spin>
      </main>
    </>
  );
};

export default Collection;
