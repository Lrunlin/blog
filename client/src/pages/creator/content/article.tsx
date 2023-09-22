import { useState } from "react";
import { Input, Tabs } from "antd";
import Layout from "@/components/page/creator/Layout";
import ArticleList from "@/components/page/creator/ArticleList";
import { useParams } from "next/navigation";

// 创作者中心-内容管理-文章管理
const ContentArticle = () => {
  let { Search } = Input;
  let [keyword, setKeyword] = useState("");
  let params = useParams();

  return (
    <Layout className="p-4 bg-white">
      <div className="shadow-sm">
        <Tabs
          defaultActiveKey={(params.key as string | undefined) || "article"}
          tabBarExtraContent={{
            right: (
              <Search
                placeholder="标题或摘要关键字"
                onSearch={val => setKeyword(val)}
                maxLength={30}
                style={{ width: 200 }}
              />
            ),
          }}
          items={[
            {
              label: "文章",
              key: "article",
              children: <ArticleList state={1} keyword={keyword} />,
              forceRender: true,
            },
            {
              label: "草稿箱",
              key: "draft",
              children: <ArticleList state={0} keyword={keyword} />,
              forceRender: true,
            },
          ]}
        />
      </div>
    </Layout>
  );
};
export default ContentArticle;
