import { useState, useRef, useEffect } from "react";
import type { FC } from "react";
import { useRecoilValue, useRecoilState, useSetRecoilState } from "recoil";
import { userDataContext } from "@/store/user-data";
import { Avatar, Button, Input, message } from "antd";
import NextImage from "@/components/next/Image";
import { useParams } from "next/navigation";
import loadStatic, { responseType } from "@/request/load-static";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import i18n from "@emoji-mart/data/i18n/zh.json";
import axios from "axios";
import classNames from "classnames";
import { useSWRConfig } from "swr";
import { marked } from "marked";
import { editorOptionContext } from "./index";
import { currentArticleDataContext } from "@/pages/article/[id]";

interface propsType {
  id: number | string;
  reply?: number;
  hideAvatar?: true;
  className?: string;
  /** 禁止隐藏输入框*/
  notHideInput?: boolean;
}

let { TextArea } = Input;

const Editor: FC<propsType> = props => {
  let params = useParams();
  let articleID = params.id as string;

  let { mutate } = useSWRConfig();
  let userData = useRecoilValue(userDataContext);
  let [value, setValue] = useState("");
  let [editorOption, setEditorOption] = useRecoilState(editorOptionContext);
  let setCurrentArticleData = useSetRecoilState(currentArticleDataContext);

  let showEditor = props.notHideInput || props.id == editorOption.activeInputID; //编辑器是否显示

  let inputDOM = useRef<any>(); //输入框DOM节点

  let cursorPosition = useRef<number>(-1); //插入表情前光标位置
  const insertEmoji = (emoji: string) => {
    let textArea = inputDOM.current?.resizableTextArea?.textArea;
    let start = textArea.selectionStart || 0;
    let end = textArea.selectionEnd || 0;
    cursorPosition.current = start; //查询前保存光标位置
    setValue(`${value.substring(0, start)}${emoji}${value.substring(end)}`);
    inputDOM.current.focus();
  };
  useEffect(() => {
    if (cursorPosition.current < 0) return;
    inputDOM.current.focus();
    cursorPosition.current = -1;
  }, [value]);

  let commentEditorboxDOM = useRef<null | HTMLElement | any>(null); //外部盒子
  let emojiPickerDOM = useRef<null | HTMLElement | any>(null); //表情选择器

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      // 判断输入框失去焦点
      if (!document.getElementById("commentRoot")?.contains(e.target as Node)) {
        setEditorOption(option => ({
          ...option,
          activeInputID: null,
          activeEmojiID: null,
        }));
      }

      //判断表情编辑器失去焦点
      if (!emojiPickerDOM.current?.contains(e.target as Node)) {
        setEditorOption(option => ({
          ...option,
          activeEmojiID: null,
        }));
      }
    };
    if (props.id == editorOption.activeInputID) {
      window.addEventListener("click", handleClick);
    }
    return () => {
      window.removeEventListener("click", handleClick);
    };
  }, [value, editorOption]); // 将 value

  let [picture, setPicture] = useState<responseType | null>(null);
  let [pictureUploading, setPictureUploading] = useState<false | [number, number]>(false);
  function load() {
    let dom = document.getElementById(`commentInput-${props.id}`) as HTMLInputElement;
    let file = (dom.files as FileList)[0];
    if (file.size >= 1024 * 1024 * process.env.UPLOAD_MAX_SIZE) {
      message.warning(`上传图片最大${process.env.UPLOAD_MAX_SIZE}MB`);
      return;
    }
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function (evt) {
      let replaceSrc = evt.target!.result;
      let imageObj = new Image();
      imageObj.src = replaceSrc as string;
      imageObj.onload = function () {
        setPictureUploading([imageObj.width, imageObj.height]);
      };
    };
    loadStatic("comment", file)
      .then(res => {
        if (res.success) {
          setPicture(res.data);
        } else {
          message.error("上传失败");
        }
      })
      .finally(() => {
        setPictureUploading(false);
      });
  }
  function comment() {
    axios
      .post("/comment", {
        belong_id: articleID,
        content: marked.parse(value, { headerIds: false }),
        comment_pics: picture?.file_name || null,
        reply: props.reply || null,
        type: "article",
      })
      .then(res => {
        setValue("");
        setPicture(null);
        mutate(`/comment/article/${articleID}`);
        setCurrentArticleData(_data => ({
          ..._data,
          comment_count: _data.comment_count + 1,
        }));
      })
      .catch(err => {
        message.error(err.message);
        console.log(err);
      });
  }
  // 底部工具栏是否展示
  return (
    <>
      {showEditor && (
        <div className={classNames(["flex", props.className])} ref={commentEditorboxDOM}>
          {/* 顶部输入框 */}
          {!props.hideAvatar && (
            <Avatar size={40} src={userData?.avatar_url} alt={`${userData?.name}头像`} />
          )}
          <div className={classNames(["w-full", !props.hideAvatar && "ml-4"])}>
            <div
              className={classNames([
                "w-full pb-2 pl-2 rounded transition-all duration-500 flex flex-wrap",
                props.id == editorOption.activeInputID
                  ? "bg-white border-[#1e80ff] border border-solid"
                  : "bg-[#f2f3f5]",
              ])}
            >
              <TextArea
                ref={input => (inputDOM.current = input)}
                value={value}
                onChange={e => setValue(e.target.value)}
                placeholder="输入评论"
                maxLength={600}
                bordered={false}
                onFocus={e => {
                  setEditorOption(option => ({
                    ...option,
                    activeInputID: props.id,
                  }));
                }}
              />
              <div
                style={{
                  width: pictureUploading
                    ? pictureUploading[0] / (pictureUploading[1] / 64)
                    : "auto",
                }}
                className={classNames(["relative bg-gray-300", pictureUploading && "h-16"])}
              >
                {picture ? (
                  <div className="h-full w-full">
                    <div
                      className="w-3 h-3 text-xl absolute top-0 right-0 bg-zinc-300 bg-opacity-50"
                      onClick={() => setPicture(null)}
                    >
                      <NextImage
                        width={12}
                        height={12}
                        src="/icon/client/delete.png"
                        className="cursor-pointer absolute top-0 right-0"
                        alt="delete"
                      />
                    </div>
                    <img
                      src={picture.file_href}
                      alt="评论图片"
                      className={classNames(["h-16", "rounded-sm"])}
                    />
                  </div>
                ) : (
                  <div className="h-full w-full bg-gray-300"></div>
                )}
              </div>
            </div>
            {/* 底部工具栏 */}
            <div className="mt-2 flex justify-between select-none">
              <div className="flex items-center">
                <span className="relative flex items-center cursor-pointer">
                  <div className="flex items-center" ref={emojiPickerDOM}>
                    <div
                      onClick={() => {
                        setEditorOption(option => ({
                          ...option,
                          activeEmojiID:
                            editorOption.activeEmojiID == props.id ? null : `${props.id}`,
                        }));
                      }}
                    >
                      <NextImage src="/icon/client/emoji.png" width={18} height={18} alt="emoji" />
                      <span className="ml-1 text-sm text-neutral-500">表情</span>
                    </div>
                    <div
                      className={classNames([
                        "absolute z-10 top-5 left-3 bg-opacity-100",
                        editorOption.activeEmojiID == props.id ? "block" : "hidden",
                      ])}
                    >
                      <Picker
                        i18n={i18n}
                        data={data}
                        onEmojiSelect={({ native }: { native: string }) => insertEmoji(native)}
                        previewPosition="none"
                        searchPosition="none"
                      />
                    </div>
                  </div>
                </span>
                <label
                  htmlFor={`commentInput-${props.id}`}
                  onClick={() => {
                    inputDOM.current.focus();
                  }}
                >
                  <span className="flex items-center ml-4 cursor-pointer">
                    <NextImage
                      src="/icon/client/picture.png"
                      width={18}
                      height={18}
                      alt="picture"
                    />
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
          </div>
        </div>
      )}
    </>
  );
};
export default Editor;
