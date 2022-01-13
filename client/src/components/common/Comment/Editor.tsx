import { FunctionComponent } from "react";
import { Button, Input, message } from "antd";
import axios from "axios";
import type { response } from "@/types";
import { useRouter } from "next/router";

/** 编辑器组件接收的参数*/
interface editorTypes {
  articleId: string | null;
  value: string;
  onChange: (value: string) => void;
}

/**
 * 评论编辑组件
 * !包含input不要套在另一个函数内，会因为组件渲染导致每次输入都会失去焦点问题
 */
const Editor: FunctionComponent<editorTypes> = props => {
  const { TextArea } = Input;
  let router = useRouter();
  const createComment = () => {
    axios
      .post<response>("/comment", { articleId: props.articleId, content: props.value })
      .then(res => {
        if (res.data.success) {
          message.success("评论成功");
          props.onChange("");
          router.reload();
        } else {
          message.error("评论失败");
        }
      });
  };
  return (
    <>
      <div>
        <TextArea
          rows={4}
          onChange={e => props.onChange(e.target.value)}
          value={props.value}
          placeholder="评论后您的邮箱会显示（评论可删除），评论字数为1-200"
          maxLength={200}
        />
      </div>
      <div style={{ marginTop: "10px" }}>
        <Button onClick={createComment} type="primary">
          发表评论
        </Button>
      </div>
    </>
  );
};
export default Editor;
