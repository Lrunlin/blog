import React, { Component } from "react";
import { Input, Tag, Empty } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { Base64 } from "js-base64";
import queryString from "query-string";
import "@/assets/scss/Search.scss";
import Article from "../components/Article";
import api from "../modules/api";

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      types: [],
      isType: "",
    };
    this.articleHub = [];
    this.searchArticle = this.searchArticle.bind(this);
    this.typeSeatch = this.typeSeatch.bind(this);
  }
  //   组件挂载之后就获取全部数组，然后查询,并察看类型
  componentDidMount() {
    document.title="刘润霖||搜索文章"
    api(`
    select * from article where isShow=1;
    select type from articletype;
    `).then(res => {
      this.articleHub = res.res[0];
      this.setState({
        types: res.res[1],
      });
    });

    const { type } = queryString.parse(this.props.location.search);
    if (type) {
      this.typeSeatch(type);
    }
  }
  searchArticle(value) {
    let articleData = [];
    this.articleHub.forEach((item, index) => {
      let text = Base64.decode(item.title) + Base64.decode(item.introduce);
      if (text.indexOf(value) !== -1) {
        articleData.push(item);
      }
    });
    this.setState({ data: articleData });
  }
  typeSeatch(type) {
    this.setState({ isType: type });
    api(`SELECT * from article WHERE type LIKE '%${type}%';`).then(res => {
      this.setState({ data: res.res });
    });
  }
  render() {
    return (
      <div id="search">
        <div className="type">
          <header>
            <Input
              size="large"
              placeholder="文章关键词"
              className="search-text"
              prefix={<SearchOutlined />}
              onInput={e => this.searchArticle(e.target.value)}
            />
          </header>
          <nav>
            {this.state.types.map((item, index) => {
              return (
                <Tag
                  color="blue"
                  key={index}
                  title={`查询关于${item.type}的文章`}
                  onClick={() => this.typeSeatch(item.type)}
                  style={{
                    background:
                      this.state.isType === item.type ? "#9ecbff" : "",
                  }}
                >
                  {item.type}
                </Tag>
              );
            })}
          </nav>
          <Article key="searchArticle" data={this.state.data} />
        </div>
        <Empty
          style={{ display: !!!this.state.data.length ? "block" : "none" }}
        />
      </div>
    );
  }
}
export default Search;
