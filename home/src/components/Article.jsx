import React, { Component } from "react";
import { Base64 } from "js-base64";
import "@/assets/scss/Article.scss";
class Article extends Component {
  render() {
    const url = "https://blog.blogweb.cn/";
    const data = this.props.data;
    return (
      <div className="article-box">
        {data.map((item, index) => {
          return (
            <article key={item.router} className="box">
              <div className="article-head">
                <a className="article-title" href={url + item.router}>
                  {Base64.decode(item.title)}
                  {/* {item.router} */}
                </a>
                <time className="article-time">
                  {item.time.substring(0, 10)}
                </time>
              </div>
              <div className="article-text">
                {Base64.decode(item.introduce)}
              </div>
              <p className="read">
                <a href={url + item.router}>阅读全文»</a>
              </p>
            </article>
          );
        })}
      </div>
    );
  }
}
export default Article;
