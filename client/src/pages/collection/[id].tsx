import { useMemo } from "react";
import type { FC } from "react";
import { GetServerSideProps } from "next";
import { useRouter, useParams } from "next/navigation";
import { Tabs, Empty, Result, Button, Spin } from "antd";
import axios from "axios";
import { ParsedUrlQuery } from "querystring";
import ArticleItem from "@/components/common/ArticleList/ArticleItem";
import Brow from "@/components/page/collection/Brow";
import ProblemList from "@/components/page/problem/List";
import Base from "@/layout/Base";
import useUserData from "@/store/user-data";
import { RootObject } from "@type/model/favorites-collection-list";
import { response } from "@type/response";
import dynamic from "next/dynamic";
import useFetch from "@/common/hooks/useFetch";
const ToolsBar = dynamic(() => import("@/components/page/collection/ToolsBar"), { ssr: false });

const FavoritesList: FC<{ data: RootObject | null }> = ({ data: propsData }) => {
  let params = useParams();
  let id = params.id as string;
  let router = useRouter();
  let [userData] = useUserData();

  if (!propsData) {
    return (
      <Base>
        <main className="w-full p-2 bg-white">
          <Result
            status="404"
            title="404"
            subTitle="没有找到此收藏集"
            extra={
              <Button type="primary" onClick={() => router.replace("/")}>
                返回首页
              </Button>
            }
          />
        </main>
      </Base>
    );
  }
  let {
    data: refetchData,
    isLoading,
    refetch,
  } = useFetch(
    () =>
      axios
        .get<response<RootObject>>(`/favorites/list/${id}`)
        .then(res => res.data.data)
        .catch(err => {
          console.log(err);
          return null;
        }),
    true
  );

  let data = useMemo(() => refetchData || propsData, [propsData, refetchData]);
  const items = [
    {
      label: `文章 ${data.article_list.length} 篇`,
      key: "item-1",
      children: (
        <>
          {data.article_list.length ? (
            data.article_list.map(item => (
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
              topRight={id =>
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
      <Base brow={<Brow authorData={data.author_data} favoritesData={data.favorites_data} />}>
        <main className="w-full p-2 bg-white">
          <Spin spinning={isLoading} tip="Loading...">
            <Tabs items={items}></Tabs>
          </Spin>
        </main>
      </Base>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ctx => {
  let id = (ctx.params as ParsedUrlQuery).id as string;

  let data = await axios
    .get<response<RootObject>>(`/favorites/list/${id}`)
    .then(res => res.data.data)
    .catch(() => {
      ctx.res.statusCode = 404;
      return null;
    });

  return { props: { data } };
};
export default FavoritesList;
