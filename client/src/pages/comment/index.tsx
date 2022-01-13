import { FunctionComponent } from "react";
import Comments from "@/components/common/Comment";
import Layout from "@/layout/Main";
import { Card } from "antd";
import Head from "@/utils/Head";


const CommentPage: FunctionComponent = () => {
  return (
    <Layout>
      <Head
        title="前端路上-技术博客 | 问题反馈"
        keyword={["评论区", "留言", "用户互动"]}
        description="用户评论区，可以行用户评论，与管理员进行交流和提出建议"
      />
      <Card>
        <style jsx>{`
          p {
            margin: 0px;
            color: #939393;
          }
        `}</style>
        <p>分享您此刻的想法</p>
        <p>也可以反馈您的问题</p>
      </Card>
      <Comments articleId={null} />
    </Layout>
  );
};
export default CommentPage;
