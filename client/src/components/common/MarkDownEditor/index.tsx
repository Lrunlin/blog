import { memo, useState, useEffect, useRef } from "react";
import type { FC, CSSProperties } from "react";
import axios from "axios";

import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import type { PluginProps } from "react-markdown-editor-lite";
import { marked } from "marked";
import { message } from "antd";

import style from "./index.module.scss";

import LanguageListPlugin from "./LanguageListPlugin";
MdEditor.use(LanguageListPlugin);

export interface propsType {
  className?: string;
  /** 上传至哪个文件夹*/
  target: "article" | "problem" | "answer";
  /** 初始化数据*/
  initValue?: string;
  onChange?: (html: string) => any;
  style?: CSSProperties;
  view?: PluginProps["editorConfig"]["view"];
}
const MarkDonwEdit: FC<propsType> = memo(props => {
  const [value, setValue] = useState("");
  let allowChangeValue = useRef(true);
  useEffect(() => {
    if (allowChangeValue.current) {
      allowChangeValue.current = false;
      props.initValue && setValue(props.initValue);
    }
    if (props.initValue && props.initValue.length == 0) {
      setValue("");
    }
  }, [props.initValue]);

  return (
    <>
      <MdEditor
        view={props.view}
        value={value}
        style={Object.assign({ height: "800px" }, props.style)}
        renderHTML={text =>
          marked(text, {
            headerIds: false,
          })
        }
        className={props.className}
        htmlClass={style["view-class"]}
        onImageUpload={async (file: File) => {
          let formData = new FormData();
          formData.append("image", file);
          return await axios
            .post(`/static/${props.target}`, formData)
            .then(res => {
              return res.data.data.file_href;
            })
            .catch(err => {
              message.error("上传失败");
              console.log(err);
            });
        }}
        imageAccept="image/*"
        table={{ maxRow: 10, maxCol: 6 }}
        onChange={({ html, text }) => {
          setValue(text);
          props.onChange && props.onChange(html);
        }}
      />
    </>
  );
});
export default MarkDonwEdit;
