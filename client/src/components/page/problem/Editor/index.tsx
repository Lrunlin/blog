import { useState, useContext, startTransition } from "react";
import type { FC } from "react";
import { Button, message } from "antd";
import TextEditor, { propsType as MarkDownPropsType } from "@/components/common/Editor";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import classNames from "classnames";
import Message from "./Message";
import { Context } from "@/pages/problem/[id]";
import useUserData from "@/store/user-data";
import uswSwr from "swr";
interface propsType {
  className?: string;
  onSuccess: () => any;
}

/** 问答页面中底部回答答案的评论组件*/
const Editor: FC<propsType> = props => {
  /** 是否显示编辑框*/
  const [isEditorState, setIsEditorState] = useState(false);
  /** 编辑框是否使用黏性定位*/
  const [isSticky, setIsSticky] = useState(true);
  const searchParams = useSearchParams();

  const [content, setContent] = useState("");
  const [key, setKey] = useState(0);
  const [userData] = useUserData();
  const { data, reload } = useContext(Context);
  function submit() {
    axios
      .post("/answer", {
        content,
        problem_id: searchParams!.get("id"),
      })
      .then(res => {
        message.success(res.data.message);
        reload();
        setIsEditorState(false);
        startTransition(() => {
          setKey(_key => ++_key); //刷新MD编辑器
        });
        props.onSuccess();
      })
      .catch(err => {
        message.error("回答失败");
        console.log(err);
      });
  }
  function update() {
    axios
      .put(`/answer/${answerData.id}`, { content })
      .then(res => {
        message.success(res.data.message);
        reload();
        setIsEditorState(false);
        startTransition(() => {
          setKey(_key => ++_key); //刷新MD编辑器
        });
        props.onSuccess();
      })
      .catch(err => {
        message.error("修改失败");
        console.log(err);
      });
  }
  const { data: answerData } = uswSwr(`answer-md-${searchParams!.get("id")}`, () =>
    data.answer_list.some(item => item.author == userData?.id)
      ? axios
          .get(`/answer`, { params: { problem_id: searchParams!.get("id") } })
          .then(res => res.data.data)
      : undefined
  );

  return (
    <div
      className={classNames([
        "bg-white mt-4 p-4 border border-solid border-gray-300",
        props.className,
        isEditorState && isSticky && "sticky bottom-0 z-10",
      ])}
    >
      {isEditorState ? (
        <>
          <div className="pb-3 text-base flex justify-between">
            <div className="font-bold">撰写答案</div>
            <div>
              <span className="mr-2 cursor-pointer" onClick={() => setIsSticky(state => !state)}>
                {isSticky && "取消"}停靠
              </span>
              <span className="cursor-pointer" onClick={() => setIsEditorState(false)}>
                暂不回答
              </span>
            </div>
          </div>
          {answerData ? (
            <>
              <TextEditor
                key={key}
                target="answer"
                onChange={html => setContent(html)}
                initValue={answerData.content}
              />
              <div className="bg-gray-100 h-8 mt-3 rounded-md"></div>
              <Button type="primary" className="mt-4" onClick={update}>
                修改答案
              </Button>
            </>
          ) : (
            <>
              <TextEditor key={key} target="answer" onChange={html => setContent(html)} />
              <div className="bg-gray-100 h-7 mt-3 rounded-md"></div>
              <Button type="primary" className="mt-4" onClick={submit}>
                提交回答
              </Button>
            </>
          )}
        </>
      ) : (
        <>
          <Message />
          <Button type="primary" className="mt-4" onClick={() => setIsEditorState(true)}>
            {data.answer_list.some(item => item.author == userData?.id) ? "修改答案" : "撰写回答"}
          </Button>
        </>
      )}
    </div>
  );
};
export default Editor;
