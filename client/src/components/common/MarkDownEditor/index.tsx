import { memo, useState, useEffect, useRef, startTransition } from "react";
import type { FC } from "react";
import axios from "axios";
import { message, Spin } from "antd";
import { Editor } from "node_modules/@bytemd/react";
import { marked } from "marked";
import zhHans from "bytemd/lib/locales/zh_Hans.json";
import gfm from "@bytemd/plugin-gfm";
import highlight from "@bytemd/plugin-highlight";
import LanguageListPlugin from "./LanguageListPlugin";
import "bytemd/dist/index.css";

export interface propsType {
  className?: string;
  /** 上传至哪个文件夹*/
  target: "article" | "problem" | "answer";
  /** 初始化数据*/
  initValue?: string;
  onChange?: (html: string) => any;
}
const MarkDonwEdit: FC<propsType> = memo(props => {
  const [value, setValue] = useState("");
  const [uploadProgress, setPploadProgress] = useState<null | string>(null);
  let allowChangeValue = useRef(true);

  useEffect(() => {
    if (!props.initValue) return;
    if (allowChangeValue.current) {
      allowChangeValue.current = false;
      setValue(props.initValue);
    }
  }, [props.initValue]);

  return (
    <>
      <style jsx global>{`
        .bytemd {
          height: 700px;
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
      `}</style>
      <Spin spinning={!!uploadProgress} tip={uploadProgress}>
        <Editor
          locale={zhHans as any}
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
          plugins={[gfm(), LanguageListPlugin() as any, highlight()]}
          uploadImages={async (files: File[]) => {
            let formData = new FormData();
            formData.append("image", files[0]);
            if (files[0].size >= 1024 * 1024 * process.env.UPLOAD_MAX_SIZE) {
              message.warn(`上传图片最大${process.env.UPLOAD_MAX_SIZE}MB`);
              return [];
            }
            return await axios
              .post(`/static/${props.target}`, formData, {
                onUploadProgress: progressEvent => {
                  if (progressEvent.lengthComputable) {
                    let complete = ((progressEvent.loaded / progressEvent.total) * 100) | 0;
                    if (complete < 100) {
                      setPploadProgress(`上传中:${complete}%`);
                    } else {
                      setPploadProgress("等待响应...");
                    }
                  }
                },
              })
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
              })
              .finally(() => {
                setPploadProgress(null);
              });
          }}
        />
      </Spin>
    </>
  );
});
export default MarkDonwEdit;
