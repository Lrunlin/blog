import React, { Component } from "react";
import { Badge } from "antd";
import { LikeFilled } from "@ant-design/icons";
import { Base64 } from "js-base64";
import "@/assets/scss/Article.scss";
class Article extends Component {
  constructor(props) {
    super(props);
    this.accept = this.accept.bind(this);
  }
  accept(e) {
    e.target.classList.add("articleSvgActive");
  }
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
                <time
                  className="article-time"
                  onClick={e => this.accept(e)}
                >
                  {/* 察看是否置顶，置顶就显示书签不置顶就显示时间 */}
                  {!!item.isTop ? (
                    <Badge.Ribbon
                      text={
                        <>
                          <LikeFilled />
                          作者推荐
                        </>
                      }
                    ></Badge.Ribbon>
                  ) : (
                    item.time.substring(0, 10)
                  )}
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
