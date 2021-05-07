import React, { Component } from "react";

import E from "wangeditor";
class Editor extends Component {
  editor = null;
  editorDom = React.createRef();
  componentDidMount() {
    this.editor = new E("#div1");
    this.editor.config.height = 100;
    this.editor.config.menus = [
      "bold",
      "italic",
      "foreColor",
      "backColor",
      "emoticon",
      "splitLine",
    ];
    this.editor.config.onchange = html => {
      // 检测（并设置长度），传值
      if (this.editor.txt.text().length > 100) {
        this.editor.txt.text(this.editor.txt.text().substr(0, 100));
      }
      this.props.setMes(this.editor.txt.html(), this.editor.txt.text());
    };
    this.editor.create();
  }
  render() {
    return <div id="div1" ref={this.editorDom}></div>;
  }
}
export default Editor;
