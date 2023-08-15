import { useState, useEffect, useRef, startTransition } from "react";
import type { FC } from "react";
import { editorPropsType } from "../index";
import { message } from "antd";
import { Editor } from "@bytemd/react";
import { marked } from "marked";
import zhHans from "bytemd/lib/locales/zh_Hans.json";
import gfm from "@bytemd/plugin-gfm";
import highlight from "@bytemd/plugin-highlight";
import LanguageListPlugin from "./LanguageListPlugin";
import UseRichTextPlugin from "./UseRichTextPlugin";
import ThemeSelect from "./ThemeSelect";
import HTMLToMarkDown from "@/common/utils/HtmlToMarkDown";
import "bytemd/dist/index.css";
import upload from "../upload";

const MarkDownEditor: FC<editorPropsType> = props => {
  const [value, setValue] = useState("");
  let allowChangeValue = useRef(true);
  useEffect(() => {
    if (!props.initValue) return;
    if (allowChangeValue.current) {
      allowChangeValue.current = false;
      setValue(HTMLToMarkDown(props.initValue));
    }
  }, [props.initValue]);

  // 后代选择，方式污染
  let id = `editor-${+new Date()}`;
  useEffect(() => {
    document.querySelector(`#${id} .bytemd-preview`)?.classList.add("content-body");
  }, []);

  /** 主题选择器被选中的主题高亮效果*/
  const [styleContent, setStyleContent] = useState("");

  return (
    <>
      <style jsx global>{`
        ${styleContent}
        .bytemd {
          height: ${props.height || 700}px;
        }
        .bytemd-preview img {
          min-width: 30%;
          max-width: 70%;
        }
        pre code.hljs {
          display: block;
          overflow-x: auto;
          padding: 1em;
        }
        code.hljs {
          padding: 3px 5px;
        }
        .hljs {
          color: #a9b7c6;
          background: #282b2e;
        }
        .hljs-bullet,
        .hljs-literal,
        .hljs-number,
        .hljs-symbol {
          color: #6897bb;
        }
        .hljs-deletion,
        .hljs-keyword,
        .hljs-selector-tag {
          color: #cc7832;
        }
        .hljs-link,
        .hljs-template-variable,
        .hljs-variable {
          color: #629755;
        }
        .hljs-comment,
        .hljs-quote {
          color: grey;
        }
        .hljs-meta {
          color: #bbb529;
        }
        .hljs-addition,
        .hljs-attribute,
        .hljs-string {
          color: #6a8759;
        }
        .hljs-section,
        .hljs-title,
        .hljs-type {
          color: #ffc66d;
        }
        .hljs-name,
        .hljs-selector-class,
        .hljs-selector-id {
          color: #e8bf6a;
        }
        .hljs-emphasis {
          font-style: italic;
        }
        .hljs-strong {
          font-weight: 700;
        }
        .bytemd-fullscreen {
          z-index: 99 !important;
        }
      `}</style>
      <div id={id}>
        <Editor
          locale={zhHans}
          value={value}
          onChange={md => {
            let html = marked(md, {
              headerIds: false,
            });
            allowChangeValue.current = false;
            setValue(md);
            startTransition(() => {
              if (props.onChange) props.onChange(html);
            });
          }}
          plugins={[
            gfm(),
            LanguageListPlugin(),
            highlight(),
            UseRichTextPlugin(),
            ...(props.theme
              ? [
                  ThemeSelect(
                    id => {
                      props.onSetTheme && props.onSetTheme(id);
                    },
                    props.defaultTheme!,
                    styleContent => setStyleContent(styleContent)
                  ),
                ]
              : []),
          ]}
          uploadImages={async (files: File[]) => {
            return upload(files, props.target, val => {
              props.changePploadProgress(val);
            })
              .then(res => {
                if (res) {
                  return [
                    {
                      url: res.data.data.file_href,
                      alt: "",
                    },
                  ];
                } else {
                  return [];
                }
              })
              .catch(err => {
                message.error("上传失败");
                console.log(err);
                return [];
              })
              .finally(() => {
                props.changePploadProgress(null);
              });
          }}
        />
      </div>
    </>
  );
};
export default MarkDownEditor;
