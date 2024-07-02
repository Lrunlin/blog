"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { Button, Input, Result, Skeleton, message } from "antd";
import axios from "@axios";
import useFetch from "@/common/hooks/useFetch";
import Editor from "@/components/common/Editor";
import Header from "@/components/common/Header";
import Head from "@/components/next/Head";
import Tag from "@/components/page/problem/write/Tag";

const Write = () => {
  let params = useParams();
  let { data, isLoading } = useFetch(() =>
    axios.get(`/problem/update/${params.id}`).then((res) => res.data.data),
  );

  let [title, setTitle] = useState("");
  let [content, setContent] = useState("");
  let [tag, setTag] = useState<number[]>([]);
  let router = useRouter();

  useEffect(() => {
    if (data) {
      setTitle(data.title);
      setContent(data.content);
      setTag(data.tag);
    }
  }, [data]);

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
      .put(`/problem/${params.id}`, { title, tag, content })
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
      {data ? (
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
              <Tag onChange={(tags) => setTag(tags)} initValue={tag} />
            </div>
            <div className="mt-2">
              <Editor
                target="problem"
                initValue={content}
                onChange={(html) => setContent(html)}
              />
            </div>
          </main>
        </div>
      ) : isLoading ? (
        <Skeleton active paragraph={{ rows: 10 }} />
      ) : (
        <>
          <Header />
          <Result
            title="没有找到对应的问题"
            extra={
              <Button type="primary" onClick={() => router.replace("/")}>
                返回首页
              </Button>
            }
          />
        </>
      )}
    </>
  );
};
export default Write;
