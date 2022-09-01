import { useState, Fragment } from "react";
import { Tabs } from "antd";
import Layout from "@/components/page/creator/Layout";
import ArticleList from "@/components/page/creator/ArticleList";

const { TabPane } = Tabs;
// 创作者中心-内容管理-文章管理
const ContentArticle = () => {
  return (
    <Layout className="p-4 bg-white">
      <div className="shadow-sm">
        <Tabs defaultActiveKey="1">
          <TabPane tab="文章" key="1" forceRender={true}>
            <ArticleList state={1} />
          </TabPane>
          <TabPane tab="草稿箱" key="2" forceRender={true}>
            <ArticleList state={0} />
          </TabPane>
        </Tabs>
      </div>
    </Layout>
  );
};
export default ContentArticle;
