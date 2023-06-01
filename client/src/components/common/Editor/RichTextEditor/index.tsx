import { useState, useEffect, useRef } from "react";
import type { FC } from "react";
import { editorPropsType } from "../index";
import { message } from "antd";
import { editorModeContext } from "../index";

import ReactWEditor from "wangeditor-for-react";
import upload from "../upload";
import UseMarkDownEditor from "./UseMarkDownEditor";
import { useSetRecoilState } from "recoil";

type InsertFnType = (url: string, alt: string, href: string) => void;
const RechTextEditor: FC<editorPropsType> = props => {
  const editor = useRef<ReactWEditor | null>(null);
  const [html, setHtml] = useState("");
  let setState = useSetRecoilState(editorModeContext);

  // 工具栏配置
  const toolbarConfig = {
    excludeKeys: [
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
    ],
  };

  useEffect(() => {
    return () => {
      if (editor.current == null) return;
      editor.current.destroy();
    };
  }, [editor]);

  return (
    <>
      <div style={{ border: "1px solid #ccc", zIndex: 100 }}>
        <ReactWEditor
          ref={editor}
          defaultValue={props.initValue}
          config={{
            excludeMenus: toolbarConfig.excludeKeys,
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
          instanceHook={{
            // 使用数组时，通常 key 代表的钩子是一个方法，此处 menus.extend 是个方法，那么数组就是其参数。
            "menus.extend": [
              "my-button-menu",
              (editor: any) => new UseMarkDownEditor(editor, () => setState("markdown")),
            ],
            // 使用方法是，通常 key 代表的钩子是一个对象，可以利用方法来绑定。方法的形参第一位是当前实例的 editor，后面依次是 key 分割代表的对象。
            "config.menus": function (editor, config: any, menus: any) {
              config.menus = menus.concat("my-button-menu");
            },
          }}
          onChange={html => {
            setHtml(html);
            props.onChange && props.onChange(html);
          }}
        />
      </div>
    </>
  );
};

export default RechTextEditor;
