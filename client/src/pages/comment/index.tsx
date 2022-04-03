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
      <style jsx>{`
        p {
          margin: 0px;
          color: #939393;
        }
        blockquote {
          border-left: 4px solid #20a0ff;
          color: #555;
          background-color: rgb(245, 245, 245);
          font-size: 1em;
          padding: 10px 20px;
          border-radius: 5px;
          ol {
            list-style-type: none;
            padding-left: 0px;
            margin-left: 0px;
          }
        }
      `}</style>
      <Card>
        <p>分享您此刻的想法</p>
        <p>也可以反馈您的问题</p>
      </Card>
      <Card>
        <p>如果您想要互换友链，可以参考以下信息将本站信息添加到您的网站上后在评论区留言</p>
        <blockquote>
          <ol>
            <li>网站名称:前端路上-技术博客</li>
            <li>网站地址:https://blogweb.cn</li>
            <li>网站描述:原创前端技术博客</li>
            <li>Logo地址:https://blogweb.cn/favicon.ico</li>
          </ol>
        </blockquote>
      </Card>
      <Comments articleId={null} />
    </Layout>
  );
};
export default CommentPage;
