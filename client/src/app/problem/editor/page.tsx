"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button, Input, message } from "antd";
import axios from "@axios";
import Editor from "@/components/common/Editor";
import Head from "@/components/next/Head";
import Tag from "@/components/page/problem/write/Tag";

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
      .then((res) => {
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
      <div className="min-w-screen relative min-h-screen bg-[#f4f5f5]">
        <header className="top-0 h-12 w-full bg-white shadow-sm">
          <div className="fixed z-50 w-full bg-white">
            <div className="mx-auto flex h-12 max-w-[1440px] items-center justify-between px-6">
              <Link href="/">
                <img src="/favicon.svg" className="h-8" alt="logo" />
              </Link>
              <span className="text-xl text-gray-500">提问题</span>
              <Button type="primary" onClick={submit}>
                发布问题
              </Button>
            </div>
          </div>
        </header>
        <main className="mx-auto mt-2 w-4/5 max-w-[1200px] bg-[#f4f5f5]">
          <Input
            placeholder="请输入问题标题"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <div>
            <Tag onChange={(tags) => setTag(tags)} />
          </div>
          <div className="mt-2">
            <Editor target="problem" onChange={(html) => setContent(html)} />
          </div>
        </main>
      </div>
    </>
  );
};
export default Write;
