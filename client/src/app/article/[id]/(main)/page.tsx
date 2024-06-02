import { Suspense } from "react";
import axios from "@axios";
import { cookies, headers } from "next/headers";
import Head from "@/components/next/Head";
import View from "@/components/page/article/View";
import ArticleUserData from "@/components/page/article/UserData";
import type { ArticleAttributes } from "@type/model-attribute";
import Comments from "@/components/page/article/Comments";
import Recommend from "@/components/page/article/Recommend";
import NoFound from "@/components/page/article/NoFound";
import Reprint from "@/components/page/article/Reprint";
import readingRecords from "@/common/modules/readingRecords";
import { response } from "@type/response";
import StyleLink from "@/components/common/Editor/StyleLink";
import HightLight from "@/layout/Content/HightLight";
import Store from "@/components/page/article/Store";
import BackTop from "@/components/common/BackTop";
import { notFound } from "next/navigation";

const Article = async ({ params: { id } }: { params: { id: string } }) => {
  const cookie = cookies();
  const header = headers();
  const token = cookie.get("token");

  let data = await axios<response<ArticleAttributes>>(`/article/${id}`, {
    headers: { authorization: token?.value },
  })
    .then(res => res.data.data)
    .catch(err => null);

  if (!data) {
    new Response(undefined, { status: 404 });
  } else {
    readingRecords(header, id, "article");
  }

  // if (!data) return <NoFound />;
  if (!data) {
    notFound();
  }

  return (
    <>
      <Head
        title={`${data.title}-${process.env.NEXT_PUBLIC_SITE_NAME}`}
        keywords={[
          process.env.NEXT_PUBLIC_SITE_NAME,
          "技术文章",
          "博客社区",
          ...data.tag.map(item => item.name),
        ]}
        description={data.description}
      />
      <Store data={data} />
      <StyleLink id={data.theme_id} />
      {data.language && <HightLight language={data.language} />}
      <article className="p-8 pb-5 bg-white break-all shadow-sm w-full">
        <h1 className="text-4xl font-semibold">{data.title}</h1>
        <ArticleUserData data={data} type="article" />
        <View content={data.content} />
        <Reprint reprint={data.reprint} />
      </article>
      <div className="p-8 pb-10 mt-4 bg-white shadow-sm">
        <Suspense>
          <Comments title="评论" />
        </Suspense>
      </div>
      <Suspense>
        <Recommend />
      </Suspense>
      <BackTop />
    </>
  );
};
export default Article;
