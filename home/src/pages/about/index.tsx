import { useState, Fragment } from "react";
import style from "./index.module.scss";
import Head from "@/modules/Head";

function about() {
  return (
    <div className={style.container}>
      {Head({
        title: "刘润霖||关于作者",
        keywords: "关于作者",
        description:
          "刘润霖WEB个人博客,本站关于作者,博客介绍,以及源代码说明",
      })}
      <h1>关于作者</h1>
      <p style={{ color: "red" }}>
        !!:本站作品均为本人原创,文章观点、思路仅代表个人想法。
      </p>
      <p>19届大连东软信息学院学生</p>
      <p>
        本站为本人学习、分享网站，网站搭建会使用本人最新学习的技术，平时也会分享技术文章，力扣算法。
      </p>
      <h1>本站源码</h1>
      <p>
        在本站源码v
        1.0后本站仓库改为私人仓库，如果您需要本站源码可以通过本人社交联系方式联系我
      </p>
      <p>
        本站使用技术:React Hooks、Next.js、Vue3 Composition API、Node
        Express、MySQL、Scss
      </p>
      <h1>订阅本站</h1>
      <p>
        点击右侧订阅按钮进入订阅页面，您可以获取本站文章，格式暂时为JSON，或者您输入邮箱在本站有新文章发布时我们会以邮件的方式提醒您。
      </p>
      <h1>GitHub</h1>
      <p>
        如果你对我的网站感兴趣，欢迎推荐给其他伙伴，或者去我的
        <a href="https://github.com/Lrunlin" target="_blank">
          GitHub
        </a>
        star一下吧
      </p>
    </div>
  );
}
export default about;
