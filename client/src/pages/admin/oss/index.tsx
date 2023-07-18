import { useState, Fragment, useEffect } from "react";
import Layout from "@/layout/Admin/Base";
import Head from "@/components/next/Head";
import io from "socket.io-client";

const OSS = () => {
  const socket = io("http://localhost:3000", {
    path: "/socket",
  });

  useEffect(() => {
    // 监听来自服务端的消息
    socket.on("message", data => {
      console.log(data.message);
    });

    return () => {
      // 清理Socket.io连接
      socket.off("message");
      socket.disconnect();
    };
  }, []);
  return (
    <>
      <Head title="对象存储管理" />
      <Layout>
        <div></div>
      </Layout>
    </>
  );
};
export default OSS;
