import React, { Component } from "react";
import "@/assets/scss/about.scss";

class About extends Component {
  componentDidMount() {
    document.title = "刘润霖||关于作者";
  }
  render() {
    return (
      <div id="about">
        <h2 className="about-title">关于</h2>
        <p className="about-text">
          !!:本站作品均为本人原创,文章观点、思路仅代表个人想法。
        </p>
        <div className="about-main">
          本站为本人学习、分享网站，网站搭建会使用本人最新学习的技术，并频繁更新(
          <a
            href="https://github.com/Lrunlin/blog"
            target="_blank"
            rel="noreferrer"
          >
            本站源码
          </a>
          )，平时也会分享技术文章，力扣算法
        </div>

        <div className="support">
          <div className="support-title">源码说明</div>
          <div>
            博客门户页面自
            <a
              href="https://github.com/Lrunlin/blog/tree/632a14be081fadc51970393995edaf30445b988e"
              rel="noreferrer"
              target="_blank"
            >
              v0.4版本
            </a>
            以及之前的版本使用Vue3 CompositionAPI使用script setup编写
            <a
              href="https://github.com/Lrunlin/blog/tree/632a14be081fadc51970393995edaf30445b988e"
              rel="noreferrer"
              target="_blank"
            >
              v0.4版本
            </a>
            后门户页面使用React17重构，并在v1.0版本之前完成代码优化
          </div>
          <div className="support-title">支持本站</div>
          <div>
            坚持写文章并不是一件容易的事，如果你认为我的文章对你有帮助，欢迎将本站推荐给你的小伙伴！或者去我的
            <a
              href="https://github.com/Lrunlin/blog"
              rel="noreferrer"
              target="_blank"
            >
              GitHub
            </a>
            star一下吧
          </div>
        </div>
      </div>
    );
  }
}
export default About;
