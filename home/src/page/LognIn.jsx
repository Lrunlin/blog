// f30eca863cc4efdecd374b73bce18dec60e3852e;
import React, { Component } from "react";
import { Base64 } from "js-base64";

import { Spin, message } from "antd";
import queryString from "query-string";

import axios from "axios";
class LognIn extends Component {
  timer = null;
  componentDidMount() {
    const { code } = queryString.parse(this.props.location.search);
    axios({
      method: "POST",
      url: "/github-logn-in",
      data: {
        code: code,
      },
      timeout: 10000,
      headers: {
        accept: "application/json",
      },
    })
      .then(res => {
        window.localStorage.github = Base64.encode(
          JSON.stringify(res.data.data)
        );
        this.props.history.replace(`${localStorage.articleURL}`);
      })
      .catch(code => {
        message.error("登录失败");
        this.timer = setTimeout(() => {
          this.props.history.replace(`${localStorage.articleURL}`);
        }, 2000);
      });
  }
  componentWillUnmount() {
    clearTimeout(this.timer);
  }
  render() {
    return (
      <div>
        <h2>
          登陆中请稍后
          <Spin />
        </h2>
      </div>
    );
  }
}
export default LognIn;
