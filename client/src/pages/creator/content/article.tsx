import { useState, Fragment } from "react";
import { Tabs } from "antd";
import Layout from "@/components/page/creator/Layout";
import ArticleList from "@/components/page/creator/ArticleList";

// 创作者中心-内容管理-文章管理
const ContentArticle = () => {
  return (
    <Layout className="p-4 bg-white">
      <div className="shadow-sm">
        <Tabs
          defaultActiveKey="1"
          items={[
            {
              label: "文章",
              key: "1",
              children: <ArticleList state={1} />,
              forceRender: true,
            },
            {
              label: "草稿箱",
              key: "2",
              children: <ArticleList state={0} />,
              forceRender: true,
            },
          ]}
        />
      </div>
    </Layout>
  );
};
export default ContentArticle;
