import { useState, useEffect, useRef, useContext } from "react";
import type { NextPage } from "next";
import { Button, Select, Input, message } from "antd";
import axios from "axios";
import { useRouter } from "next/router";
import Layout from "@/layout/Base";
import { Context } from "@/store";
import { response, articleType } from "@/types";
import If from "@/utils/If";

const NextPageName: NextPage = () => {
  let store = useContext(Context);
  const editor = useRef<any>(null);
  const [typeSelect, setTypeSelect] = useState<articleType[]>([]);
  const [title, setTitle] = useState("");
  const [type, SetType] = useState<articleType[]>([]);
  const router = useRouter();
  const { Option } = Select;
  const createEditor = async () => {
    const E = await import("wangeditor");
    editor.current = new E.default("#wangeditor");
    editor.current.config.menus = [
      "head",
      "bold",
      "fontSize",
      "fontName",
      "italic",
      "underline",
      "strikeThrough",
      "indent",
      "lineHeight",
      "foreColor",
      "backColor",
      "link",
      "list",
      "todo",
      "justify",
      "quote",
      "image",
      "table",
      "code",
      "splitLine",
    ];

    // 设置代码语言
    editor.current.config.languageType = [
      "JavaScript",
      "VUE",
      "React",
      "HTML",
      "CSS",
      "NodeJS",
      "TypeScript",
      "JSON",
      "C",
      "C#",
      "C++",
      "Java",
      "SQL",
      "Go",
      "PHP",
      "Python",
      "Code",
    ];

    editor.current.config.height = 500; //高度500
    editor.current.config.zIndex = 500;
    editor.current.config.uploadImgAccept = ["jpg", "jpeg", "png"]; //类型
    editor.current.config.showLinkImg = false; //禁止网络图片
    //自定义图上上传
    editor.current.config.customUploadImg = function (resultFiles: any, insertImgFn: any) {
      let formData = new FormData();
      formData.append("image", resultFiles[0]);
      axios.post(store.assetsPath + "/assets", formData).then(res => {
        insertImgFn(res.data.data);
      });
    };
    editor.current.create();
  };
  useEffect(() => {
    createEditor();
    axios.get<response<articleType[]>>("/type", { params: { decorate: true } }).then(res => {
      setTypeSelect(res.data.data);
    });

    return () => {
      editor.current.destroy();
    };
  }, []);
  function createArticle() {
    axios
      .post<response>("/article", { article: editor.current.txt.html(), title: title, type: type })
      .then(res => {
        if (res.data.success) {
          message.success("发布成功");
          router.push("/");
        } else {
          message.error("发布失败");
        }
      });
  }
  return (
    <>
      <Layout>
        <Input
          placeholder="文章标题(不超过20字)"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <div id="wangeditor"></div>
        <Select
          mode="multiple"
          allowClear
          style={{ width: "100%", marginTop: "20px" }}
          placeholder="文章类型"
          defaultValue={[]}
          onChange={value => SetType(value)}
        >
          {typeSelect.map(item => (
            <Option key={item.type} value={item.type}>
              {item.type}
            </Option>
          ))}
        </Select>
        <If if={title && type.length}>
          <Button type="primary" block style={{ marginTop: "10px" }} onClick={createArticle}>
            发布文章
          </Button>
        </If>
      </Layout>
    </>
  );
};
export default NextPageName;
