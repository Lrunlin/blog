import css from "styled-jsx/css";
import { useEffect, memo } from "react";
import type { FunctionComponent } from "react";
import useScript from "@/hooks/useScript";
import getConfig from "next/config";
//时间戳项目重启时缓存

const CodeStyle = css.global`
  pre,
  code {
    scrollbar-width: none; /* Firefox */
    -ms-overflow-style: none; /* IE 10+ */
  }
  pre::-webkit-scrollbar,
  code::-webkit-scrollbar {
    display: none; /* Chrome Safari */
  }
  pre {
    display: block !important;
    color: #abb2bf;
    background: #282c34;
    border-radius: 10px;
    padding: 10px;
  }

  pre code {
    width: 100%;
    overflow: hidden !important;
    white-space: pre-wrap !important;
    word-wrap: break-word !important;
  }
`;
const TableStyle = css.global`
  table,
  table tr th,
  table tr td {
    border: 1px solid black;
    text-align: left;
    padding: 5px 0px;
    padding-left: 10px;
  }
  table tr:nth-child(1) {
    background: rgb(245, 245, 245);
  }
`;

/**
 * 处理代码高亮和表格样式
 * @params key {any} 响应式的值触发更新
 */
const Style: FunctionComponent = () => {
  useEffect(() => {
    let link = document.createElement("link");
    link.href = `/css/prism.css`;
    link.id = `prismHightLightStyle`;
    link.rel = "stylesheet";
    document.head.append(link);
    return ()=>{
       (document.getElementById(link.id) as HTMLElement).remove();
    }
  }, []);
  useScript(`/js/prism.js`);

  return (
    <>
      <style jsx>{CodeStyle}</style>
      <style jsx>{TableStyle}</style>
    </>
  );
};
export default memo(Style);
