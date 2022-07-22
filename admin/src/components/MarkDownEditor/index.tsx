import { FC, memo, useState, useEffect, useRef } from "react";
import axios from "axios";
import { message } from "antd";
import { Editor } from "@bytemd/react";
import { marked } from "marked";

import zhHans from "bytemd/lib/locales/zh_Hans.json";
import gfm from "@bytemd/plugin-gfm";
import LanguageListPlugin from "./LanguageListPlugin";
import "bytemd/dist/index.css";
import "./index.css";



interface propsType {
  value?: string;
  onChange?: (val: string) => void;
}
const MarkDonwEdit: FC<propsType> = memo(props => {
  const [value, setValue] = useState("");

  //如果传来初始值就设置初始化值,并在只在第一次props.value变化时设置
  let setContentCount = useRef(0);
  useEffect(() => {
    if (props.value && !setContentCount.current) {
      setValue((props.value));
      setContentCount.current++;
    }
  }, [props.value]);
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
                alt:''
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
