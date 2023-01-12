import { useState, useRef, useEffect, useContext } from "react";
import type { FC } from "react";
import { commentContext } from "./index";
import { useRecoilValue, useRecoilState } from "recoil";
import { userDataContext } from "@/store/user-data";
import { commentEmojiActiveContext } from "./store";
import { Avatar, Button, Input, message } from "antd";
import Image from "@/components/next/Image";
import { useRouter } from "next/router";
import loadStatic, { responseType } from "@/request/load-static";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import i18n from "@emoji-mart/data/i18n/zh.json";
import axios from "axios";
import classNames from "classnames";
import { useSWRConfig } from "swr";
import type { propsType as commentPropsType } from "./index";

interface propsType {
  id: number | string;
  reply?: number;
  hideAvatar?: true;
  onFocus?: () => any;
  onBlur?: () => any;
  autoFocus?: boolean;
}

let { TextArea } = Input;

const Editor: FC<propsType> = props => {
  let router = useRouter();
  let articleID = router.query.id;
  let { mutate } = useSWRConfig();
  let userData = useRecoilValue(userDataContext);
  let [activeEmojiID, setActiveEmojiID] = useRecoilState(commentEmojiActiveContext);
  let [value, setValue] = useState("");
  let ref = useRef<any>();

  const insertEmoji = (emoji: string) => {
    let textArea = ref.current?.resizableTextArea?.textArea;
    let start = textArea.selectionStart || 0;
    let end = textArea.selectionEnd || 0;
    setValue(`${value.substring(0, start)}${emoji}${value.substring(end)}`);
    ref.current.focus();
  };

  useEffect(() => {
    function closeEmoji() {
      setActiveEmojiID("");
    }
    window.addEventListener("click", closeEmoji);
    return () => {
      closeEmoji();
      window.removeEventListener("click", closeEmoji);
    };
  }, []);

  let [picture, setPicture] = useState<responseType | null>(null);
  function load() {
    let dom = document.getElementById(`commentInput-${props.id}`) as HTMLInputElement;
    let file = (dom.files as FileList)[0];
    loadStatic("comment", file).then(res => {
      if (res.success) {
        setPicture(res.data);
      } else {
        message.error("上传失败");
      }
    });
  }
  let { type } = useContext(commentContext);
  function comment() {
    axios
      .post("/comment", {
        belong_id: router.query.id,
        content: value,
        comment_pics: picture?.file_name || null,
        reply: props.reply || null,
        type: type,
      })
      .then(res => {
        if (res.data.success) {
          setValue("");
          setPicture(null);
          mutate(`/comment/list/${articleID}`);
        } else {
          message.error(res.data.message);
        }
      });
  }

  // 底部工具栏是否展示
  const [showToolBar, setShowToolBar] = useState(false);

  return (
    <div className="flex">
      {/* 顶部输入框 */}
      {!props.hideAvatar && (
        <Avatar size={40} src={userData?.avatar_url} alt={`${userData?.name}头像`} />
      )}
      <div className="w-full ml-4">
        <div
          className={classNames([
            "w-full pb-2 pl-2 rounded transition-all duration-500",
            showToolBar ? "bg-white border-[#1e80ff] border border-solid" : "bg-[#f2f3f5]",
          ])}
        >
          <TextArea
            ref={input => (ref.current = input)}
            value={value}
            onChange={e => setValue(e.target.value)}
            placeholder="输入评论（Enter换行，Ctrl + Enter发送）"
            maxLength={600}
            bordered={false}
            className={classNames(["group"])}
            onFocus={e => {
              setShowToolBar(true);
              props.onFocus && props.onFocus();
            }}
            onBlur={() => {
              props.onBlur && props.onBlur();
            }}
            autoFocus={props.autoFocus}
          />
          {/* 使用的图片 */}
          {picture && (
            <div className="h-16 relative inline-block">
              <div
                className="w-3 h-3 text-xl absolute top-0 right-0 bg-zinc-300  bg-opacity-50"
                onClick={() => setPicture(null)}
              >
                <img
                  src="/icon/delete.png"
                  className="w-3 h-3 absolute top-0 right-0"
                  alt="delete"
                />
              </div>
              <img
                src={picture.file_href}
                alt="评论图片"
                className={classNames(["h-16", "rounded-sm"])}
              />
            </div>
          )}
        </div>

        {/* 底部工具栏 */}
        {showToolBar && (
          <div className="mt-2 flex justify-between select-none">
            <div className="flex items-center">
              <span
                className="relative flex items-center cursor-pointer"
                onClick={e => {
                  setActiveEmojiID(props.id);
                  e.stopPropagation();
                }}
              >
                <Image src="/icon/emoji.png" width={18} height={18} alt="emoji" />
                <span className="ml-1 text-sm text-neutral-500">表情</span>
                <div
                  className={classNames([
                    "absolute z-10 top-3 left-30 bg-opacity-100",
                    activeEmojiID == props.id ? "block" : " hidden",
                  ])}
                >
                  <Picker
                    i18n={i18n}
                    data={data}
                    onEmojiSelect={({ native }: { native: string }) => insertEmoji(native)}
                    previewPosition="none"
                  />
                </div>
              </span>
              <label
                htmlFor={`commentInput-${props.id}`}
                onClick={() => {
                  ref.current.focus();
                }}
              >
                <span className="flex items-center ml-4 cursor-pointer">
                  <Image src="/icon/picture.png" width={18} height={18} alt="picture" />
                  <span className="ml-1 text-sm text-neutral-500">图片</span>
                </span>
              </label>
              <input
                className="hidden"
                type="file"
                id={`commentInput-${props.id}`}
                accept="image/*"
                onChange={load}
              />
            </div>
            <Button
              type="primary"
              onClick={comment}
              disabled={!/^[\s\S]*.*[^\s][\s\S]*$/.test(value)}
            >
              发表评论
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
export default Editor;
