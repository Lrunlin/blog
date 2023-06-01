import { useState } from "react";
import { Button, Input, message } from "antd";
import Head from "@/components/next/Head";
import Tag from "@/components/page/problem/write/Tag";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";

import Editor from "@/components/common/Editor";

const Write = () => {
  let [title, setTitle] = useState("");
  let [content, setContent] = useState("");
  let [tag, setTag] = useState<number[]>([]);
  let router = useRouter();
  function submit() {
    if (title.length < 5 || title.length > 50) {
      message.warning("标题长度在5-50之间");
      return;
    }
    if (tag.length < 1 || tag.length > 6) {
      message.warning("标签个数在1-6之间");
      return;
    }
    if (content.length < 20) {
      message.warning("内容长度需要大于20");
      return;
    }

    axios
      .post("/problem", { title, tag, content })
      .then(res => {
        message.success(res.data.message);
        router.back();
      })
      .catch(() => {
        message.error("请求失败");
      });
  }

  return (
    <>
      <Head title="提问" />
      <div className="bg-[#f4f5f5] min-w-screen min-h-screen relative">
        <header className="w-full h-12 bg-white shadow-sm top-0">
          <div className="w-full fixed z-50 bg-white">
            <div className="max-w-[1440px] h-12 mx-auto flex justify-between items-center px-6">
              <Link href="/">
                <img src="/favicon.svg" className="h-8" alt="logo" />
              </Link>
              <span className="text-gray-500 text-xl">提问题</span>
              <Button type="primary" onClick={submit}>
                发布问题
              </Button>
            </div>
          </div>
        </header>
        <main className="w-4/5 max-w-[1200px] mx-auto mt-2 bg-[#f4f5f5] ">
          <Input
            placeholder="请输入问题标题"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
          <div>
            <Tag onChange={tags => setTag(tags)} />
          </div>
          <div className="mt-2">
            <Editor target="problem" onChange={html => setContent(html)} />
          </div>
        </main>
      </div>
    </>
  );
};
export default Write;
