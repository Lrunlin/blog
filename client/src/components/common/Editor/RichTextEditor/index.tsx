import { useEffect, useRef, useState, memo } from "react";
import type { FC } from "react";
import type { editorPropsType } from "../index";
import { message, List } from "antd";
import { editorModeContext } from "../index";

import ReactWEditor from "wangeditor-for-react";
import upload from "../upload";
import { useSetRecoilState } from "recoil";
import axios from "axios";

import classNames from "classnames";
import CodeEditor from "./CodeEditor";
import type { event } from "./CodeEditor";

const RechTextEditor: FC<editorPropsType> = memo(props => {
  // 两个数组，用于记录按钮和下拉菜单是否全部移出
  const [showThemeListLayer, setShowThemeListLayer] = useState([false, false]);
  const editor = useRef<ReactWEditor | null>(null);
  let setState = useSetRecoilState(editorModeContext);
  let codeEditorRef = useRef<event>(null);

  const excludeKeys = [
    "fontSize",
    "fontName",
    "indent",
    "lineHeight",
    "foreColor",
    "backColor",
    "justify",
    "undo",
    "video",
    "redo",
    "emoticon",
    "code",
  ];
  let [themeList, setThemeList] = useState<{ id: number; name: string }[]>([]);
  useEffect(() => {
    axios
      .get("/theme")
      .then(res => {
        setThemeList(res.data.data);
      })
      .catch(() => {});
  }, []);
  useEffect(() => {
    return () => {
      if (editor.current == null) return;
      editor.current.destroy();
    };
  }, [editor]);

  useEffect(() => {
    // 添加主题展示className
    editor.current?.editor?.$textElem?.elems[0].classList.add("content-body");

    if (!document.getElementById("useMarkDown")) {
      let useMarkDown = document.createElement("div");
      useMarkDown.setAttribute("class", "w-e-menu");
      useMarkDown.setAttribute("id", "useMarkDown");
      useMarkDown.setAttribute("data-title", "使用MarkDown编辑器");
      useMarkDown.innerHTML = `<svg t="1685596470235" class="icon" viewBox="0 0 1280 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2393" width="14" height="14"><path d="M1187.6 118.2H92.4C41.4 118.2 0 159.6 0 210.4v603c0 51 41.4 92.4 92.4 92.4h1095.4c51 0 92.4-41.4 92.2-92.2V210.4c0-50.8-41.4-92.2-92.4-92.2zM677 721.2H554v-240l-123 153.8-123-153.8v240H184.6V302.8h123l123 153.8 123-153.8h123v418.4z m270.6 6.2L763 512H886V302.8h123V512H1132z" p-id="2394" fill="#999999"></path></svg>`;
      document.querySelector(".w-e-toolbar")?.append(useMarkDown);
      useMarkDown.onclick = () => setState("markdown");
    }

    if (!document.getElementById("codeEditorIcon")) {
      let menuElements = document.querySelectorAll(".w-e-menu");
      let codeEditorIcon = document.createElement("div");
      codeEditorIcon.setAttribute("class", "w-e-menu");
      codeEditorIcon.setAttribute("id", "themeSwitch");
      codeEditorIcon.setAttribute("data-title", "代码编辑");
      codeEditorIcon.innerHTML = `<svg t="1694361145942" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4038" width="16" height="16"><path d="M958.17 447.4L760.69 249.92l-65.82 65.83 197.47 197.47L694.87 710.7l65.82 65.82 197.48-197.47 65.83-65.83zM263.3 249.92L65.82 447.4 0 513.22l65.82 65.83L263.3 776.52l65.82-65.82-197.47-197.48 197.47-197.47zM343.247 949.483L590.96 52.19l89.72 24.768-247.713 897.295z" fill="#999999" p-id="4039"></path></svg>`;
      codeEditorIcon.onclick = () => codeEditorRef.current!.showModal();
      menuElements[4].parentNode!.insertBefore(codeEditorIcon, menuElements[4].nextSibling);
    }

    if (!document.getElementById("themeSwitch") && props.theme) {
      let themeSwitch = document.createElement("div");
      themeSwitch.setAttribute("class", "w-e-menu");
      themeSwitch.setAttribute("id", "themeSwitch");
      themeSwitch.setAttribute("data-title", "主题切换");
      themeSwitch.innerHTML = `<svg t="1691505748627" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1488" width="16" height="16"><path d="M768 388v475.2c0 17.6-14.4 32-32 32H288c-17.6 0-32-14.4-32-32V390.4l-72.8 40c-8 4-17.6 1.6-21.6-6.4L72 268c-4.8-8-1.6-17.6 6.4-21.6l216-117.6h46.4c6.4 0 12.8 4 15.2 10.4 19.2 51.2 82.4 89.6 156.8 89.6 75.2 0 137.6-37.6 156.8-89.6 2.4-6.4 8-10.4 15.2-10.4h46.4l214.4 117.6c8 4 10.4 14.4 5.6 21.6l-88 156c-4 8-14.4 10.4-21.6 5.6L768 388z" p-id="1489" fill="#707070"></path></svg>`;
      document.querySelector(".w-e-toolbar")?.append(themeSwitch);

      themeSwitch.onmouseenter = () => {
        setShowThemeListLayer(arr => [true, arr[1]]);
      };
      themeSwitch.onmouseleave = () => {
        setShowThemeListLayer(arr => [false, arr[1]]);
      };
    }
    return () => {
      document.getElementById("useMarkDown")?.remove();
      document.getElementById("themeSwitch")?.remove();
      document.getElementById("codeEditorIcon")?.remove();
    };
  }, [props]);

  return (
    <>
      <CodeEditor
        ref={codeEditorRef}
        onFinish={val => {
          editor.current?.editor?.cmd.do("insertHTML", val);
          editor.current?.editor?.cmd.do("insertHTML", "<br/>");
        }}
      />
      <div className="relative" style={{ border: "1px solid #ccc", zIndex: 10 }}>
        {(showThemeListLayer[0] || showThemeListLayer[1]) && (
          <div
            onMouseEnter={() => setShowThemeListLayer(arr => [arr[0], true])}
            onMouseLeave={() => setShowThemeListLayer(arr => [arr[0], false])}
            className="bg-red-900"
          >
            <List
              style={{ top: 36, left: 550 }}
              className="absolute z-[11]"
              bordered
              key={props.defaultTheme}
              dataSource={themeList}
              renderItem={item => (
                <List.Item
                  className={classNames(
                    "cursor-pointer hover:bg-gray-100",
                    item.id == props.defaultTheme ? "bg-gray-100" : "bg-white"
                  )}
                  onClick={() => {
                    props.onSetTheme && props.onSetTheme(item.id);
                    setShowThemeListLayer([false, false]);
                  }}
                >
                  <div>{item.name}</div>
                </List.Item>
              )}
            />
          </div>
        )}
        <ReactWEditor
          ref={editor}
          key={props.initValue}
          defaultValue={props.initValue}
          config={{
            zIndex: 10,
            showFullScreen: false,
            height: props.height || 700,
            excludeMenus: excludeKeys,
            showLinkImg: false,
            uploadImgMaxLength: 1,
            uploadImgAccept: ["jpg", "jpeg", "png", "gif", "bmp", "webp", "svg"],
            uploadImgMaxSize: +process.env.UPLOAD_MAX_SIZE * 1024 * 1024,
            customUploadImg: (Files: File[], insertImgFn: (val: string) => void) => {
              upload(Files, props.target, val => {
                props.changePploadProgress(val);
              })
                .then(res => {
                  if (res) {
                    insertImgFn(res.data.data.file_href);
                  }
                })
                .catch(() => {
                  message.error("上传失败");
                })
                .finally(() => {
                  props.changePploadProgress(null);
                });
            },
          }}
          onChange={html => {
            props.onChange && props.onChange(html);
          }}
        />
      </div>
    </>
  );
});

export default RechTextEditor;
