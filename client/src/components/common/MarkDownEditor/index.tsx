import { memo, useState, useEffect, useRef } from "react";
import type { FC } from "react";
import axios from "axios";

import MdEditor from "react-markdown-editor-lite";
import { marked } from "marked";
import "react-markdown-editor-lite/lib/index.css";
import { message } from "antd";
import { useRecoilState } from "recoil";
import { writeArticleContext } from "../ArticleEditor/index";

import style from "./index.module.scss";

import LanguageListPlugin from "./LanguageListPlugin";
MdEditor.use(LanguageListPlugin);

interface propsType {
  className?: string;
  /** 上传至哪个文件夹*/
  target: "article" | "questions";
  /** 初始化数据*/
  initValue?: string;
  onChange?: (html: string) => any;
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
        value={value}
        style={{ height: "800px" }}
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
