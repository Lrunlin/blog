import React, { Component } from "react";
import { Base64 } from "js-base64";
import "../assets/scss/ArticleShow.scss";
import api from "@/modules/api";
class ArticleShow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        title: "",
        article: "",
      },
    };
  }
  componentDidMount() {
    let router = this.props.location.pathname.replace("/", "");
    api(`select * from article where router='${router}';`).then(res => {
      this.setState({
        data: res.res[0],
      });
      let head = document.head;
      let jq = document.createElement("script");
      jq.src = "https://blogweb.cn/cdn/jquery.js";
      jq.id = "jq";
      head.append(jq);
      let js = document.createElement("script");
      js.src = "https://blog.blogweb.cn/js/article.js";
      js.id = "js";
      head.append(js);
    });
  }
  componentWillUnmount() {
    document.getElementById("js").remove();
    document.getElementById("jq").remove();
  }
  render() {
    let data = this.state.data;
    return (
      <div id="articleShow">
        <article>
          <div className="article-head">
            <h1 className="article-title">{Base64.decode(data.title)}</h1>
            <div className="article-time" id="articleTime">
              {data.time}
            </div>
          </div>
          <br />
          <div
            dangerouslySetInnerHTML={{ __html: Base64.decode(data.article) }}
          ></div>
        </article>
      </div>
    );
  }
}
export default ArticleShow;
