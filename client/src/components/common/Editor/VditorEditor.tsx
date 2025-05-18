"use client";

import { useEffect, useRef } from "react";
import { message } from "antd";
import Vditor from "vditor";
import "vditor/dist/index.css";
import LanguageListPlugin from "./LanguageListPlugin";
import { EditorProps, LanguageItem, ThemeItem } from "./index";
import upload from "./upload";

const VditorEditor = (
  props: EditorProps & { languageData: LanguageItem[]; themeData: ThemeItem[] },
) => {
  const editorRef = useRef<Vditor | null>(null);

  // 从本地存储读取模式，默认使用分屏预览 (sv)
  const getEditorMode = (): "wysiwyg" | "ir" | "sv" => {
    const mode = localStorage.getItem("editor-mode");
    return mode === "wysiwyg" || mode === "ir" || mode === "sv" ? mode : "sv";
  };

  useEffect(() => {
    if (!editorRef.current) {
      editorRef.current = new Vditor("vditor", {
        height: props.height || 900,
        mode: getEditorMode(),
        cdn: process.env.CDN + "/static/editor",
        value: props.initValue || "",
        classes: { preview: "content-body" },
        input: () => {
          props.onChange && props.onChange(editorRef.current?.getHTML() || "");
        },
        cache: {
          enable: props.cache, //本地缓存信息
        },
        toolbar: [
          "emoji",
          "headings",
          "bold",
          "italic",
          "strike",
          "link",
          "|",
          "list",
          "ordered-list",
          "check",
          "|",
          "outdent",
          "indent",
          "quote",
          "line",
          "|",
          "code",
          "inline-code",
          {
            name: "language-plugin",
            tip: "插入代码块",
            icon: `<svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path d="M868 568q33 0 53 19t20 52v221q0 36-20 55t-53 19H162q-34 0-57-23t-23-55V643q0-36 20-56t55-20h711zm0-478q33 0 53 19t20 53v220q0 36-20 55t-53 19H162q-34 0-57-23t-23-55V166q0-36 20-56t55-20h711z"/></svg>`,
            click: () => LanguageListPlugin(editorRef.current!),
          },
          "|",
          "insert-after",
          "insert-before",
          "|",
          "table",
          "|",
          "undo",
          "redo",
          "|",
          "upload",
          "|",
          "edit-mode",
          "preview",
          "outline",
          {
            name: "themeSelector",
            tip: "切换主题",
            icon: `<svg t="1691505748627" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1488" width="16" height="16"><path d="M768 388v475.2c0 17.6-14.4 32-32 32H288c-17.6 0-32-14.4-32-32V390.4l-72.8 40c-8 4-17.6 1.6-21.6-6.4L72 268c-4.8-8-1.6-17.6 6.4-21.6l216-117.6h46.4c6.4 0 12.8 4 15.2 10.4 19.2 51.2 82.4 89.6 156.8 89.6 75.2 0 137.6-37.6 156.8-89.6 2.4-6.4 8-10.4 15.2-10.4h46.4l214.4 117.6c8 4 10.4 14.4 5.6 21.6l-88 156c-4 8-14.4 10.4-21.6 5.6L768 388z" p-id="1489" fill="#707070"></path></svg>`, // 16x16 SVG icon
            toolbar: props.themeData.map((item) => ({
              name: item.name, // ✅ 显示用的文字
              click: () => {
                props.onSetTheme && props.onSetTheme(item.id);
              },
            })),
            click: () => {},
          },
        ],
        upload: {
          accept: "image/*",
          multiple: false,
          handler(files) {
            return upload(files, props.target, (progress) =>
              editorRef.current?.tip(progress),
            )
              .then((res) => {
                if (res && res.data && res.data.data.file_href) {
                  const imgUrl = res.data.data.file_href;
                  editorRef.current!.insertValue(`![image](${imgUrl})`);
                  message.success("上传成功");
                  return imgUrl;
                } else {
                  message.error("上传失败，请重试");
                  return null;
                }
              })
              .catch(() => {
                message.error("上传出错，请检查网络或服务器");
                editorRef.current?.tip("");
                return null;
              }) as any;
          },
        },
        preview: {
          hljs: {
            langs: props.languageData.map((item) => item.language),
          },
        },
        after: () => {
          // 切换模式 缓存
          const toolbarButtons = document.querySelectorAll(
            ".vditor-toolbar button",
          );
          toolbarButtons.forEach((button) => {
            button.addEventListener("click", () => {
              const mode = editorRef.current?.getCurrentMode();
              if (mode) {
                localStorage.setItem("editor-mode", mode);
              }
            });
          });
          // 不知道为什么子菜单不显示文字 手动设置一下DOM
          props.themeData.forEach((item) => {
            document.querySelector(
              `button[data-type="${item.name}"]`,
            )!.innerHTML = item.name;
          });
        },
      });
    }
    return () => {
      // 销毁实例
      if (editorRef.current) {
        editorRef.current?.destroy();
        editorRef.current = null;
      }
    };
  }, []);

  return <div id="vditor" />;
};

export default VditorEditor;
