import { useState } from "react";
import { Button, Input } from "antd";
import Head from "@/components/next/Head";
import dynamic from "next/dynamic";
import Tag from "@/components/page/questions/write/Tag";
const MarkDownEditor = dynamic(() => import("@/components/common/MarkDownEditor"), {
  ssr: false,
});

const Write = () => {
  let [title, setTitle] = useState("");
  let [content, setContent] = useState("");

  return (
    <>
      <Head title="提问" />
      <div className="bg-[#f4f5f5] min-w-screen min-h-screen relative">
        <header className="w-full h-12 bg-white shadow-sm top-0">
          <div className="w-full fixed z-50 bg-white">
            <div className="max-w-[1440px] h-12 mx-auto flex justify-between items-center px-6">
              <img src="/favicon.svg" className="h-8" alt="logo" />
              <span className="text-gray-500 text-xl">提问题</span>
              <Button type="primary">发布问题</Button>
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
            <Tag />
          </div>
          <div className="mt-2">
            <MarkDownEditor target="questions" onChange={html => setContent(html)} />
          </div>
        </main>
      </div>
    </>
  );
};
export default Write;
