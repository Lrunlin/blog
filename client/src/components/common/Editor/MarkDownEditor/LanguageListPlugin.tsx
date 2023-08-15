import { useState, useEffect } from "react";
import { Modal, Select } from "antd";
import axios from "axios";
import type { BytemdPlugin } from "bytemd";

const LanguageListPlugin = (): BytemdPlugin => {
  const { confirm } = Modal;
  const { Option } = Select;
  let [data, setData] = useState<{ title: string; language: string }[]>([]);
  useEffect(() => {
    axios
      .get("/language-list")
      .then(res => {
        setData(res.data.data);
      })
      .catch(() => {});
  }, []);
  return {
    actions: [
      {
        title: "代码高亮语言搜索",
        icon: `<svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2258" width="32" height="32"><path d="M868.352 568.32q32.768 0 53.248 19.456t20.48 52.224l0 221.184q0 35.84-19.968 54.784t-52.736 18.944l-706.56 0q-33.792 0-56.832-22.528t-23.04-55.296l0-212.992q0-35.84 19.968-55.808t54.784-19.968l710.656 0zM868.352 90.112q32.768 0 53.248 18.944t20.48 52.736l0 220.16q0 35.84-19.968 54.784t-52.736 18.944l-706.56 0q-33.792 0-56.832-22.528t-23.04-55.296l0-211.968q0-35.84 19.968-55.808t54.784-19.968l710.656 0z" p-id="2259" fill="#707070"></path></svg>`, // 16x16 SVG icon
        handler: {
          type: "action",
          click(ctx: any) {
            confirm({
              title: "支持代码高亮的语言列表",
              content: (
                <Select
                  style={{ width: "200px" }}
                  showSearch
                  placeholder="输入想要查询的语言"
                  onChange={val => {
                    ctx.appendBlock(`\`\`\`\`${val}\n\n\`\`\`\``);
                    Modal.destroyAll();
                  }}
                >
                  {data.map(item => (
                    <Option value={item.language} key={item.language + item.title}>
                      <em>
                        {item.title}-{item.language}
                      </em>
                    </Option>
                  ))}
                </Select>
              ),
              onOk() {
                Modal.destroyAll();
              },
              onCancel() {
                Modal.destroyAll();
              },
            });
          },
        },
      },
    ],
  };
};
export default LanguageListPlugin;
