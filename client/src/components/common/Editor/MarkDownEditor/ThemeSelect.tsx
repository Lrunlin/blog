import { useState, useEffect } from "react";
import axios from "axios";
import type { BytemdPlugin } from "bytemd";

const ThemeSelect = (
  callback: (id: number) => void,
  defaultTheme: number,
  setThemeHighlightCSS: (style: string) => void
): BytemdPlugin => {
  let [data, setData] = useState<{ id: number; name: string }[]>([]);
  useEffect(() => {
    axios
      .get("/theme")
      .then(res => {
        setData(res.data.data);
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    let index = data.findIndex(item => item.id == defaultTheme);
    setThemeHighlightCSS(`[bytemd-tippy-path="15-${index}"]{background-color: #f6f8fa;}`);
  }, [data, defaultTheme]);

  return {
    actions: [
      {
        title: "代码高亮语言搜索",
        icon: `<svg t="1691505748627" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1488" width="16" height="16"><path d="M768 388v475.2c0 17.6-14.4 32-32 32H288c-17.6 0-32-14.4-32-32V390.4l-72.8 40c-8 4-17.6 1.6-21.6-6.4L72 268c-4.8-8-1.6-17.6 6.4-21.6l216-117.6h46.4c6.4 0 12.8 4 15.2 10.4 19.2 51.2 82.4 89.6 156.8 89.6 75.2 0 137.6-37.6 156.8-89.6 2.4-6.4 8-10.4 15.2-10.4h46.4l214.4 117.6c8 4 10.4 14.4 5.6 21.6l-88 156c-4 8-14.4 10.4-21.6 5.6L768 388z" p-id="1489" fill="#707070"></path></svg>`, // 16x16 SVG icon
        handler: {
          type: "dropdown",
          actions: data.map(item => ({
            title: item.name,
            handler: {
              type: "action",
              click(ctx: any) {
                callback(item.id);
              },
            },
          })),
        },
      },
    ],
  };
};
export default ThemeSelect;
