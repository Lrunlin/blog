"use client";

import { startTransition, useContext, useState } from "react";
import type { FC } from "react";
import { Alert, Button, Input, message } from "antd";
import axios from "@axios";
import type { CommentAttributes } from "@type/model-attribute";
import { marked } from "marked";
import { Context } from "@/components/page/problem/ProblemDetail";

interface propsType {
  belong_id: number;
  onSuccess?: () => any;
  reply: CommentAttributes["reply"];
  type: "problem" | "answer";
}

/** 问答页面中用于回复的评论组件*/
const Editor: FC<propsType> = (props) => {
  const { TextArea } = Input;
  /** 最终的值HTML*/
  const [content, setContent] = useState("");
  /** 输入框显示内容*/
  const [value, setValue] = useState("");

  const disabled = content.replace(/ /g, "").length < 5;
  let { reload } = useContext(Context);
  function submit() {
    axios
      .post("/comment", {
        belong_id: props.belong_id,
        content: content,
        comment_pics: null,
        reply: props.reply || null,
        type: props.type,
      })
      .then((res) => {
        if (res.data.success) {
          message.success(res.data.message);
          props.onSuccess && props.onSuccess();
          reload();
          setValue("");
        } else {
          message.error(res.data.message);
        }
      })
      .catch((err) => {
        message.error("评论失败");
        console.log(err);
      });
  }

  return (
    <div>
      <TextArea
        value={value}
        rows={3}
        className="!mt-2"
        onChange={(e) => {
          setValue(e.target.value);
          startTransition(() => {
            let content = marked(e.target.value) as string;
            setContent(content);
          });
        }}
      />
      <div className="mt-4 flex items-center justify-between">
        <span className="text-sm text-gray-600">
          评论用于指出存在的问题，提醒作者澄清改进，请勿在评论里回答或补充信息
        </span>
        <Button type="primary" disabled={disabled} onClick={submit}>
          提交评论
        </Button>
      </div>
      <Alert
        message="评论支持部分 Markdown 语法：**粗体** _斜体_ [链接](http://example.com) `代码` - 列表 > 引用。评论后会自动@对应的用户。"
        type="info"
        className="!mt-4"
      />
    </div>
  );
};
export default Editor;
