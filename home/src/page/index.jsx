// react-router-config
import React, { Component } from "react";
import { Pagination } from "antd";
// import { Base64 } from "js-base64";
import Article from "../components/Article";
import api from "../modules/api";
import "@/assets/scss/Index.scss";
class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      index: 1,
      max: 0,
    };
    this.getArticle = this.getArticle.bind(this);
  }
  getArticle(page) {
    this.setState(
      () => ({
        index: page - 1,
      }),
      function () {
        let i = page - 1;
        api(
          `select * from article WHERE isShow=1 ORDER by time DESC limit ${
            0 + i * 10
          }, ${i * 10 + 10};`
        ).then(res => {
          this.setState({ data: res.res });
        });
      }
    );
  }
  componentDidMount() {
    api(`select * from article WHERE isShow=1 ORDER by time DESC;`).then(
      res => {
        this.setState({
          max: res.res.length,
        });
      }
    );
    this.getArticle(true);
  }
  render() {
    return (
      <div id="index">
        <Article key="indexArtice" data={this.state.data} />
        <div style={{ textAlign: "center", marginTop: "30px" }}>
          <Pagination
            current={this.state.index + 1}
            defaultCurrent={this.state.index + 1}
            total={this.state.max}
            onChange={current => {
              this.getArticle(current);
            }}
          />
        </div>
      </div>
    );
  }
}
export default Index;
