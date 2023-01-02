import { memo, useState, useEffect, useRef } from "react";
import axios from "axios";

import MdEditor from "react-markdown-editor-lite";
import { marked } from "marked";
import "react-markdown-editor-lite/lib/index.css";
import { message } from "antd";
import { useRecoilState } from "recoil";
import { writeArticleContext } from "../index";

import style from "./index.module.scss";

import LanguageListPlugin from "./LanguageListPlugin";
MdEditor.use(LanguageListPlugin);


const MarkDonwEdit = memo(() => {
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
    <>
      <MdEditor
        value={value}
        style={{ height: "800px" }}
        renderHTML={text =>
          marked(text, {
            headerIds: false,
          })
        }
        htmlClass={style["view-class"]}
        onImageUpload={async (file: File) => {
          let formData = new FormData();
          formData.append("image", file);
          return await axios
            .post("/static/article", formData)
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
          setArticleData(_data => ({ ..._data, content: html }));
          setValue(text);
        }}
      />
    </>
  );
});
export default MarkDonwEdit;
