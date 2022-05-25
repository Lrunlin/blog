import { useState, FunctionComponent, useRef, useEffect, } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { MessageOutlined } from "@ant-design/icons";
import { Input, Button, message } from "antd";
import { response } from "@/types";
import type {Input as InputType} from 'antd';

interface propsTypes {
  articleId: string | null;
  superior: string | null; //上级的ID（回复谁）
}

/** 回复组件*/
const Reply: FunctionComponent<propsTypes> = props => {
  /** 是否展示回复栏*/
  const [isShow, setIsShow] = useState(false);
  const [value, setValue] = useState("");
  const { Search } = Input;
  
  let router = useRouter();
  const createComment = () => {
    axios
      .post<response>("/comment", {
        articleId: props.articleId,
        superior: props.superior,
        content: value,
      })
      .then(res => {
        res.data.success
          ? (message.success("评论成功"), router.reload())
          : message.error(res.data.message);
      });
  };

  /** 回复框的DOM*/
  const inputDom = useRef<InputType | null>(null);
  useEffect(() => {
    inputDom.current?.focus();
  }, []);
  return (
    <>
      <style jsx>{`
        .input {
          background-color: #f0f1f4;
          margin-top: 10px;
        }
        .btn {
          margin-left: 10px;
        }
      `}</style>
      <span onClick={() => setIsShow(value => !value)}>
        <MessageOutlined />
        回复
      </span>
      {isShow && (
        <Search
          ref={inputDom}
          onSearch={createComment}
          enterButton={<Button type="primary">回复</Button>}
          placeholder="回复"
          value={value}
          onChange={e => setValue(e.target.value)}
        />
      )}
    </>
  );
};
export default Reply;
