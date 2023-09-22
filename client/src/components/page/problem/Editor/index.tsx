import { useState, useContext } from "react";
import type { FC } from "react";
import { Button, message } from "antd";
import TextEditor from "@/components/common/Editor";
import axios from "axios";
import { useParams } from "next/navigation";
import classNames from "classnames";
import Message from "./Message";
import { Context } from "@/pages/problem/[id]";
import useUserData from "@/store/user-data";
import useFetch from "@/common/hooks/useFetch";
interface propsType {
  className?: string;
  onSuccess: () => any;
}

/** 问答页面中底部回答答案的评论组件*/
const Editor: FC<propsType> = props => {
  let params = useParams();
  let id = params.id as string;
  /** 是否显示编辑框*/
  const [isEditorState, setIsEditorState] = useState(false);
  /** 编辑框是否使用黏性定位*/
  const [isSticky, setIsSticky] = useState(true);

  const [content, setContent] = useState("");
  const [userData] = useUserData();
  const { data, reload } = useContext(Context);
  function submit() {
    axios
      .post("/answer", {
        content,
        problem_id: id,
      })
      .then(res => {
        message.success(res.data.message);
        reload();
        refetch();
        setIsEditorState(false);
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
        refetch();
        setIsEditorState(false);
        props.onSuccess();
      })
      .catch(err => {
        message.error("修改失败");
        console.log(err);
      });
  }

  let { data: answerData, refetch } = useFetch(() =>
    axios.get(`/answer`, { params: { problem_id: id } }).then(res => res.data.data)
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
                height={240}
                target="answer"
                onChange={html => setContent(html)}
                initValue={answerData.content}
              />
              <div className="bg-gray-100 h-7 mt-3 rounded-md"></div>
              <Button type="primary" disabled={!content} className="mt-4" onClick={update}>
                修改答案
              </Button>
            </>
          ) : (
            <>
              <TextEditor height={240} target="answer" onChange={html => setContent(html)} />
              <div className="bg-gray-100 h-7 mt-3 rounded-md"></div>
              <Button type="primary" disabled={!content} className="mt-4" onClick={submit}>
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
