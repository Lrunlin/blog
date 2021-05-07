import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Button, message } from "antd";
import { SendOutlined, CloseOutlined } from "@ant-design/icons";
import { Base64 } from "js-base64";
import ShowMes from "@/components/ShowMes.jsx";
import Editor from "@/components/Editor.jsx";
import github from "@/assets/image/github.png";
import api from "@/modules/api";
import "@/assets/scss/message.scss";
// import axios from "axios";

class Message extends Component {
  state = {
    data: [],
    userData: null,
    isDisabled: true,
  };

  getData = () => {
    let router = this.props.location.pathname.replace("/", "");
    api(`select * from message where router='${router}'`).then(res => {
      this.setState({ data: res.res });
    });
  };

  componentDidMount() {
    this.getData();
  }
  lognIn = () => {
    window.localStorage.articleURL = this.props.location.pathname;
    window.location.href =
      "https://github.com/login/oauth/authorize?client_id=fa17b3676791f6cfa668&";
  };
  signOut = () => {
    localStorage.removeItem("github");
    this.props.history.go(0);
  };
  setGithubData = () => {
    if (localStorage.github) {
      let setGithubData = JSON.parse(Base64.decode(localStorage.github));
      this.setState({
        userData: {
          user: setGithubData.login,
          face: setGithubData.avatar_url,
        },
      });
    }
  };
  ShowData = () => {
    return this.state.userData ? (
      <div className="signed-in">
        <span>{this.state.userData.user}</span>
        <img
          src={this.state.userData.face}
          alt={`用户${this.state.userData.user}的头像`}
          title={`用户${this.state.userData.user}的头像,双击退出`}
          onDoubleClick={this.signOut}
        />
      </div>
    ) : (
      <div className="logn-in">
        <span>未登录</span>
        <img
          src={github}
          alt="使用GitHub登录"
          title="使用GitHub登录"
          onClick={this.lognIn}
        />
      </div>
    );
  };
  shouldComponentUpdate() {
    if (!!!this.state.userData) {
      this.setGithubData();
    }
    return true;
  }

  fatherId = null; //回复人ID（father字段）
  message = (mes, text) => {
    let switchText = text.replace(/&nbsp;/g, ""); //处理&nbsp;全局匹配然后换成空
    this.setState({
      mes: Base64.encode(mes),
      //富文本的输入内容
      isDisabled: !!!/^[\s\S]*.*[^\s][\s\S]*$/.test(switchText),
      //判断是否有传来内容
    });
  };
  father = null; //只是判断文字的显示，变量不进数据库
  // name和father仅为展示消息，不做数据库存储
  setReply = (name, father, id) => {
    this.father = father;
    this.fatherId = id;
    this.setState({
      name: name,
    });
  };
  timer = null;
  comment = () => {
    let id = +new Date();
    let father = this.fatherId;
    let router = this.props.location.pathname.replace("/", "");
    let name = this.state.userData.user;
    let face = this.state.userData.face;
    let text = this.state.mes;
    let sql = `
    INSERT INTO message ( id, father,router,name,face,text,time )
    VALUES
    ( '${id}', '${father}','${router}','${name}','${face}','${text}',NOW());
    `;
    api(sql).then(res => {
      if (res.res) {
        message.success({
          content: "评论成功。",
        });
        this.timer = setTimeout(() => {
          this.props.history.go(0);
        }, 1000);
      } else {
        message.error({
          content: "评论失败！！！",
        });
      }
    });
  };
  componentWillUnmount() {
    clearInterval(this.timer);
  }
  render() {
    return (
      <div id="messgae">
        <div className="mes-head">{this.ShowData()}</div>
        <p>
          回复:
          {this.state.name != null ? this.state.name : "作者"}
          {this.state.name != null ? (
            <CloseOutlined onClick={() => this.setReply(null, null, null)} />
          ) : null}
        </p>
        <Editor setMes={this.message} switchDisabled={this.switchDisabled} />
        <Button
          type="primary"
          children="发送评论"
          icon={<SendOutlined rotate="-90" />}
          className="send"
          disabled={this.state.isDisabled || !this.state.userData?.user}
          onClick={this.comment}
        />
        <ShowMes data={this.state.data} setReply={this.setReply} />
      </div>
    );
  }
}
export default withRouter(Message);
// 使用withRouter包裹住导出的组件使组件也可以使用路由的属性、方法
