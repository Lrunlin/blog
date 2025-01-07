"use client";

import { startTransition, useEffect, useRef, useState } from "react";
import type { FC } from "react";
import { message } from "antd";
import gfm from "@bytemd/plugin-gfm";
import highlight from "@bytemd/plugin-highlight";
import { Editor } from "@bytemd/react";
import "bytemd/dist/index.css";
import zhHans from "bytemd/lib/locales/zh_Hans.json";
import { marked } from "marked";
import HTMLToMarkDown from "@/common/utils/HtmlToMarkDown";
import { editorPropsType } from "../Editor";
import upload from "../upload";
import LanguageListPlugin from "./LanguageListPlugin";
import ThemeSelect from "./ThemeSelect";
import UseRichTextPlugin from "./UseRichTextPlugin";

const MarkDownEditor: FC<editorPropsType> = (props) => {
  const [value, setValue] = useState("");
  let allowChangeValue = useRef(true);
  useEffect(() => {
    if (!props.initValue) return;
    if (allowChangeValue.current) {
      allowChangeValue.current = false;
      setValue(HTMLToMarkDown(props.initValue));
    }
  }, [props.initValue]);

  // 后代选择，防止污染
  let id = `editor-markdown`;
  useEffect(() => {
    document
      .querySelector(`#${id} .bytemd-preview`)
      ?.classList.add("content-body");
  }, []);

  /** 主题选择器被选中的主题高亮效果*/
  const [styleContent, setStyleContent] = useState("");

  return (
    <>
      <style jsx global>{`
        ${styleContent}
        .bytemd {
          height: ${props.height || 700}px !important;
        }
      `}</style>
      <div id={id}>
        <Editor
          locale={zhHans}
          value={value}
          onChange={(md) => {
            let html = marked(md) as string;
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
                    (id) => {
                      props.onSetTheme && props.onSetTheme(id);
                    },
                    props.defaultTheme!,
                    (styleContent) => setStyleContent(styleContent),
                  ),
                ]
              : []),
          ]}
          uploadImages={async (files: File[]) => {
            return upload(files, props.target, (val) => {
              props.changePploadProgress(val);
            })
              .then((res) => {
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
              .catch((err) => {
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
