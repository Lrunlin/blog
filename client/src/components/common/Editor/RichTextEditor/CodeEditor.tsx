import { useState, useImperativeHandle, forwardRef } from "react";
import type { FC } from "react";
import { Button, Modal } from "antd";
import CodeMirror from "@uiw/react-codemirror";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";
import axios from "axios";
import useFetch from "@/common/hooks/useFetch";
import { response } from "@type/response";
import { Select } from "antd";

export type event = { showModal: () => void };

const CodeEditor: FC<{ onFinish: (val: string) => void; ref: any }> = forwardRef((props, ref) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [content, setContent] = useState("");
  const [language, setLanguage] = useState("");

  let { data: languageList } = useFetch(() =>
    axios
      .get<response<{ title: string; language: string }[]>>("/language-list")
      .then(res => res.data.data)
  );

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  function finish() {
    props.onFinish(`<pre class="language-${language}"><code>${content}</code></pre>`);
    setIsModalOpen(false);
  }

  useImperativeHandle(ref, () => ({
    showModal,
    handleCancel,
  }));
  return (
    <>
      <Modal
        width={700}
        title="代码编辑器"
        footer={
          <div>
            <Button onClick={handleCancel}>取消</Button>
            <Button type="primary" onClick={finish} disabled={!(language && content.length)}>
              确定
            </Button>
          </div>
        }
        open={isModalOpen}
        onCancel={handleCancel}
      >
        <Select
          value={language || undefined}
          className="mt-2 w-60"
          showSearch
          filterOption={(inputValue, option) =>
            (option?.label + "" + option?.value).toLocaleLowerCase().includes(inputValue)
          }
          onChange={val => setLanguage(val)}
          placeholder="代码块语言"
          optionFilterProp="children"
          options={(languageList || []).map(item => {
            return { value: item.language, label: item.title };
          })}
        />
        <CodeMirror
          className="mt-3"
          value={content}
          theme={vscodeDark}
          height="500px"
          onChange={val => {
            setContent(val);
          }}
        />
      </Modal>
    </>
  );
});
export default CodeEditor;
