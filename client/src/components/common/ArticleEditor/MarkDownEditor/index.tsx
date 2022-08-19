import { memo, useState, useEffect, useRef } from "react";
import type { FC } from "react";
import axios from "axios";
import { message } from "antd";
import { Editor } from "@bytemd/react";
import { marked } from "marked";

import zhHans from "bytemd/lib/locales/zh_Hans.json";
import gfm from "@bytemd/plugin-gfm";
import highlight from "@bytemd/plugin-highlight";
import LanguageListPlugin from "./LanguageListPlugin";
import "bytemd/dist/index.css";

import { useRecoilState } from "recoil";
import { writeArticleContext } from "../index";

const MarkDonwEdit: FC = memo(() => {
  let [articleData, setArticleData] = useRecoilState(writeArticleContext);
  const [value, setValue] = useState("");
  let allowChangeValue = useRef(true);
  useEffect(() => {
    if (allowChangeValue.current) {
      allowChangeValue.current = false;
      setValue(articleData.content);
    }
    if (articleData.content.length == 0) {
      setValue("");
    }
  }, [articleData.content]);

  return (
    <Editor
      locale={zhHans as any}
      value={value}
      onChange={md => {
        let html = marked(md, {
          headerIds: false,
        });
        setArticleData(_data => ({ ..._data, content: html }));
        setValue(md);
      }}
      plugins={[gfm(), LanguageListPlugin() as any, highlight()]}
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
