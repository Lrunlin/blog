import { Modal, Select } from "antd";
import axios from "@axios";
import Vditor from "vditor";

interface LanguageItem {
  title: string;
  language: string;
}

const LanguageListPlugin = (editor: Vditor) => {
  axios.get("/language-list").then((res) => {
    const data: LanguageItem[] = res.data.data;

    Modal.confirm({
      title: "选择代码高亮语言",
      content: (
        <Select
          showSearch
          style={{ width: 250 }}
          placeholder="输入语言搜索"
          onChange={(val) => {
            // const cursorPosition = editor.getCursorPosition();
            editor.focus();
            editor.insertValue(`\`\`\`${val}\n\n\`\`\`\n`);
            Modal.destroyAll();
          }}
        >
          {data.map((item) => (
            <Select.Option key={item.language} value={item.language}>
              {item.title} - {item.language}
            </Select.Option>
          ))}
        </Select>
      ),
      onCancel() {
        Modal.destroyAll();
      },
      okButtonProps: { style: { display: "none" } },
    });
  });
};

export default LanguageListPlugin;
