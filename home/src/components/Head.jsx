import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import "@/assets/scss/Head.scss";
import face from "@/assets/image/writer-face.png";
import github from "@/assets/image/github.png";
import wechat from "@/assets/image/wechat.png";
import qq from "@/assets/image/qq.png";
import wechatQrcode from "@/assets/image/wechat-qrcode.jpg";
import qqQrcode from "@/assets/image/qq-qrcode.jpg";

class Head extends Component {
  constructor(props) {
    super(props);
    this.state = {
      qrcodeShow: false,
    };
    this.hideQrcode = this.hideQrcode.bind(this);
    this.showQrcode = this.showQrcode.bind(this);
    this.setTitle = this.setTitle.bind(this);
  }
  hideQrcode() {
    this.setState({ qrcodeShow: false });
  }
  showQrcode(type) {
    this.setState({ qrcodeShow: type });
  }
  setTitle(title) {
    if (title) {
      document.title = "刘润霖||" + title;
    }
  }
  render() {
    return (
      <header id="head">
        <img src={face} alt="左侧导航栏作者头像" className="writer-face" />
        <nav>
          <h1 className="writer-name">刘润霖</h1>
          <p className="write-text">WEB开发</p>
          <div className="nav">
            <NavLink exact to="/" onClick={() => this.setTitle("web博客")}>
              首页
            </NavLink>
            <NavLink
              exact
              to="/search"
              onClick={() => this.setTitle("搜索文章")}
            >
              搜索
            </NavLink>
            <NavLink
              exact
              to="/resume"
              onClick={() => this.setTitle("个人简历")}
            >
              作者简历
            </NavLink>
            <NavLink exact to="/about" onClick={() => this.setTitle("关于作者")}>
              关于
            </NavLink>
          </div>
          <div className="navs">
            <a href="https://github.com/Lrunlin">
              <img src={github} alt="作者GitHub" className="clearMargin" />
            </a>
            <span>
              <img
                src={wechat}
                alt="作者微信"
                className="show-qrcode"
                onClick={e => this.showQrcode("wechat")}
              />
            </span>
            <span>
              <img
                src={qq}
                alt="作者QQ"
                className="show-qrcode"
                onClick={e => this.showQrcode("qq")}
              />
            </span>
          </div>
        </nav>
        <div
          className="layer"
          style={{ display: this.state.qrcodeShow ? "block" : "none" }}
          onClick={() => this.hideQrcode()}
        >
          <img
            src={this.state.qrcodeShow === "wechat" ? wechatQrcode : qqQrcode}
            alt={`作者${
              this.state.qrcodeShow === "wechat" ? "微信" : "QQ"
            }二维码`}
          />
        </div>
      </header>
    );
  }
}
export default Head;
