import { memo, useState, useImperativeHandle } from "react";
import type { FC, MutableRefObject } from "react";
import axios from "axios";
import { message } from "antd";
import { Editor } from "@bytemd/react";
import { marked } from "marked";

import zhHans from "bytemd/lib/locales/zh_Hans.json";
import gfm from "@bytemd/plugin-gfm";
import LanguageListPlugin from "./LanguageListPlugin";
import "bytemd/dist/index.css";
import "./index.css";

export type event = { setValue: (md: string) => void };
interface propsType {
  value?: string;
  onChange?: (val: string) => void;
  event?: MutableRefObject<event>;
}

/**
 * MarkDown插件
 * 在Form表单中使用时，需要使用Div包裹并使用setValue和onChange进行手动值设置
 */
const MarkDonwEdit: FC<propsType> = memo(props => {
  const [value, setValue] = useState("");

  useImperativeHandle(props.event, () => ({
    setValue: (md: string) => {
      setValue(md);
    },
  }));

  return (
    <Editor
      locale={zhHans as any}
      value={value}
      onChange={md => {
        setValue(md);
        if (props.onChange) {
          props.onChange(
            marked(md, {
              headerIds: false,
            })
          );
        }
      }}
      plugins={[gfm(), LanguageListPlugin() as any]}
      uploadImages={async files => {
        let formData = new FormData();
        formData.append("image", files[0]);
        return await axios
          .post("/static/article", formData)
          .then(res => {
            return [
              {
                url: res.data.data.file_href,
                alt: "",
              },
            ];
          })
          .catch(err => {
            message.error("上传失败");
            console.log(err);
            return [];
          });
      }}
    />
  );
});
export default MarkDonwEdit;
