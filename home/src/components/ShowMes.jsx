import React, { Component } from "react";
import github from "@/assets/image/github.png";
import { DownOutlined, UpOutlined } from "@ant-design/icons";
import { Base64 } from "js-base64";

class ShowMes extends Component {
  state = {
    data: [],
  };
  setMessageData = () => {
    let data = [];
    this.props.data.forEach((item, index) => {
      if (item.father === "null") {
        item.children = [];
        data.push(item);
      }
    });
    this.props.data.forEach((item, index) => {
      if (item.father !== "null") {
        this.props.data.forEach((el, i) => {
          if (el.id === item.father) {
            data[i].children.push(item);
          }
        });
      }
    });
    // 转成字符串判断两个数组是否一样，如果不一样就更新
    if (this.state.data.toString() !== data.toString()) {
      this.setState({
        data: data,
      });
    }
  };
  componentDidUpdate() {
    this.setMessageData();
  }
  //是否显示子留言（回复）
  setShowChil(index) {
    this.isUpdata = true;
    let data = this.state.data;
    data[index].isShowChil = !!!data[index].isShowChil;
    this.setState({
      data: data,
    });
  }
  setReply(name, father, id) {
    this.props.setReply(name, father, id);
  }
  Message(data) {
    return (
      <div
        className="mes"
      >
        <div className="mes-userdata">
          <img src={data.face} alt={`用户的头像`} className="mes-face" />
          <div className="mes-text">
            <>
              <span className="mes-name">{data.name}</span>
              <time className="mes-time">{data.time.substr(0, 10)}</time>
              <span
                className="mes-reply"
                onClick={() => {
                  this.setReply(data.name, data.father, data.fatherId);
                }}
              >
                回复
              </span>
            </>
            <div
              className="mes-message"
              dangerouslySetInnerHTML={{ __html: Base64.decode(data.text) }}
            ></div>
          </div>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div id="showMes">
        {this.state.data.map((item, index) => {
          return (
            <div key={item.id + "" + index}>
              {this.Message({
                name: item.name,
                face: item.face,
                time: item.time,
                text: item.text,
                father: item.father,
                fatherId: item.id,
              })}
              {/* 这里是遍历子留言，因为默认值是undefined所以默认是不显示子留言 */}
              {item.children.map(chil => {
                return (
                  <div
                    className="mes-children"
                    key={Math.random()}
                    style={{ display: item.isShowChil ? "block" : "none" }}
                  >
                    {this.Message({
                      name: chil.name,
                      face: chil.face,
                      time: chil.time,
                      text: chil.text,
                      father: chil.father,
                      fatherId: item.id,
                    })}
                  </div>
                );
              })}
              {item.children.length ? (
                <div className="mes-foot">
                  <span
                    onClick={() => this.setShowChil(index)}
                    className="mes-showMes"
                  >
                    {item.isShowChil ? (
                      <>
                        隐藏留言
                        <UpOutlined />
                      </>
                    ) : (
                      <>
                        展示留言
                        <DownOutlined />
                      </>
                    )}
                  </span>
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
    );
  }
}
export default ShowMes;
