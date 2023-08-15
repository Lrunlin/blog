import { useSetRecoilState } from "recoil";
import { editorModeContext } from "../index";
import type { BytemdPlugin } from "bytemd";

const UseRichTextPlugin = (): BytemdPlugin => {
  let setState = useSetRecoilState(editorModeContext);
  return {
    actions: [
      {
        title: "使用富文本编辑器",
        icon: `<svg t="1685373435845" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3064" width="16" height="16"><path d="M218.316 307.727h87.886v205.06h-29.297v29.295h117.179v-29.294H364.79V307.727h87.882v29.293h29.294v-87.882H189.022v87.882h29.294v-29.293z m322.242 58.59h292.945v58.588H540.558v-58.588z m0 117.177h292.945v58.588H540.558v-58.588z m-351.536 117.18h644.481v58.588h-644.48v-58.587z m0 117.176h644.481v58.588h-644.48V717.85z m351.536-468.713h292.945v58.589H540.558v-58.589z m420.923 713.13H61.045V63.309h900.436v898.958z m-864.62-35.816h828.804V99.125H96.861V926.45z" p-id="3065" fill="#24292e"></path></svg>`, // 16x16 SVG icon
        position: "right",
        handler: {
          type: "action",
          click(ctx: any) {
            setState("rich-text");
          },
        },
      },
    ],
  };
};
export default UseRichTextPlugin;
