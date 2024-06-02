import Head from "@/components/next/Head";
import getTypeTreeIndex from "@/request/type/type-tree-index";
import getArticleList from "@/request/article/article-list";
import Page from "@/components/page/index";
import Advertisement from "@/components/common/Advertisement";
import Ranking from "@/components/page/index/Ranking";
import Footer from "@/components/page/index/Footer";
import Repository from "@/components/page/article/Aside/Repository";
import AdSense from "@/components/common/AdSense";
import Header from "@/components/common/Header";
import BackTop from "@/components/common/BackTop";

const Home = async () => {
  let reponse = await Promise.all([getTypeTreeIndex(), getArticleList(1, { sort: "recommend" })]);

  return (
    <>
      <Head
        title={`${process.env.NEXT_PUBLIC_SITE_NAME}-技术社区`}
        description={`${process.env.NEXT_PUBLIC_SITE_NAME}是面向中文开发者的技术内容分享与交流平台。我们通过技术文章、问答服务，打造一个激发开发者创作灵感，激励开发者沉淀分享，陪伴开发者成长的综合类技术社区。`}
        keywords={[process.env.NEXT_PUBLIC_SITE_NAME, "技术社区,博客,前端开发,WEB"]}
      />
      <Header />
      <Page type={reponse[0]} article_list={reponse[1]}>
        <aside className="w-60 sm:hidden">
          <Repository />
          <Advertisement type="index" />
          <AdSense />
          <Ranking />
          <Footer />
        </aside>
      </Page>
      <BackTop />
    </>
  );
};

export default Home;
