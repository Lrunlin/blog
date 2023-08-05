import { useEffect, useRef } from "react";
import type { FC } from "react";
import type { editorPropsType } from "../index";
import { message } from "antd";
import { editorModeContext } from "../index";

import ReactWEditor from "wangeditor-for-react";
import upload from "../upload";
import { useSetRecoilState } from "recoil";

const RechTextEditor: FC<editorPropsType> = props => {
  const editor = useRef<ReactWEditor | null>(null);
  let setState = useSetRecoilState(editorModeContext);

  const excludeKeys = [
    "fontSize",
    "fontName",
    "indent",
    "lineHeight",
    "foreColor",
    "backColor",
    "justify",
    "undo",
    "video",
    "redo",
  ];

  useEffect(() => {
    return () => {
      if (editor.current == null) return;
      editor.current.destroy();
    };
  }, [editor]);

  useEffect(() => {
    let div = document.createElement("div");
    div.setAttribute("class", "w-e-menu");
    div.setAttribute("data-title", "使用MarkDown编辑器");
    div.innerHTML = `<svg t="1685596470235" class="icon" viewBox="0 0 1280 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2393" width="14" height="14"><path d="M1187.6 118.2H92.4C41.4 118.2 0 159.6 0 210.4v603c0 51 41.4 92.4 92.4 92.4h1095.4c51 0 92.4-41.4 92.2-92.2V210.4c0-50.8-41.4-92.2-92.4-92.2zM677 721.2H554v-240l-123 153.8-123-153.8v240H184.6V302.8h123l123 153.8 123-153.8h123v418.4z m270.6 6.2L763 512H886V302.8h123V512H1132z" p-id="2394" fill="#999999"></path></svg>`;
    document.querySelector(".w-e-toolbar")!.append(div);
    div.onclick = () => setState("markdown");
    return () => {
      div.remove();
    };
  });

  return (
    <>
      <div style={{ border: "1px solid #ccc", zIndex: 100 }}>
        <ReactWEditor
          ref={editor}
          key={props.initValue}
          defaultValue={props.initValue}
          config={{
            height: props.height || 700,
            excludeMenus: excludeKeys,
            showLinkImg: false,
            uploadImgMaxLength: 1,
            uploadImgAccept: ["jpg", "jpeg", "png", "gif", "bmp", "webp", "svg"],
            uploadImgMaxSize: +process.env.UPLOAD_MAX_SIZE * 1024 * 1024,
            customUploadImg: (Files: File[], insertImgFn: (val: string) => void) => {
              upload(Files, props.target, val => {
                props.changePploadProgress(val);
              })
                .then(res => {
                  if (res) {
                    insertImgFn(res.data.data.file_href);
                  }
                })
                .catch(() => {
                  message.error("上传失败");
                })
                .finally(() => {
                  props.changePploadProgress(null);
                });
            },
          }}
          onChange={html => {
            props.onChange && props.onChange(html);
          }}
        />
      </div>
    </>
  );
};

export default RechTextEditor;
