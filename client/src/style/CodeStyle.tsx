import css from "styled-jsx/css";
import type { FunctionComponent } from "react";

interface propsTypes {
  type?: "open-api" | "article";
}

const HighLight = css.global`
  pre code.hljs {
    display: block;
  }
  .hljs {
    color: #abb2bf;
    background: #282c34;
  }
  .hljs-comment,
  .hljs-quote {
    color: #5c6370;
    font-style: italic;
  }
  .hljs-doctag,
  .hljs-formula,
  .hljs-keyword {
    color: #c678dd;
  }
  .hljs-deletion,
  .hljs-name,
  .hljs-section,
  .hljs-selector-tag,
  .hljs-subst {
    color: #e06c75;
  }
  .hljs-literal {
    color: #56b6c2;
  }
  .hljs-addition,
  .hljs-attribute,
  .hljs-meta .hljs-string,
  .hljs-regexp,
  .hljs-string {
    color: #98c379;
  }
  .hljs-attr,
  .hljs-number,
  .hljs-selector-attr,
  .hljs-selector-class,
  .hljs-selector-pseudo,
  .hljs-template-variable,
  .hljs-type,
  .hljs-variable {
    color: #d19a66;
  }
  .hljs-bullet,
  .hljs-link,
  .hljs-meta,
  .hljs-selector-id,
  .hljs-symbol,
  .hljs-title {
    color: #61aeee;
  }
  .hljs-built_in,
  .hljs-class .hljs-title,
  .hljs-title.class_ {
    color: #e6c07b;
  }
  .hljs-emphasis {
    font-style: italic;
  }
  .hljs-strong {
    font-weight: 700;
  }
  .hljs-link {
    text-decoration: underline;
  }
`;
const Prism = css.global`
  code[class*="language-"],
  pre[class*="language-"] {
    color: #f8f8f2;
    background: 0 0;
    text-shadow: 0 1px rgba(0, 0, 0, 0.3);
    font-family: Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace;
    font-size: 1em;
    text-align: left;
    white-space: pre;
    word-spacing: normal;
    word-break: normal;
    word-wrap: normal;
    line-height: 1.5;
    -moz-tab-size: 4;
    -o-tab-size: 4;
    tab-size: 4;
    -webkit-hyphens: none;
    -moz-hyphens: none;
    -ms-hyphens: none;
    hyphens: none;
  }

  pre[class*="language-"] {
    margin: 0.5em 0;
    overflow: auto;
    border-radius: 0.3em;
  }

  :not(pre) > code[class*="language-"],
  pre[class*="language-"] {
    background: #272822;
  }

  :not(pre) > code[class*="language-"] {
    border-radius: 0.3em;
    white-space: normal;
  }

  .token.cdata,
  .token.comment,
  .token.doctype,
  .token.prolog {
    color: #8292a2;
  }

  .token.punctuation {
    color: #f8f8f2;
  }

  .token.namespace {
    opacity: 0.7;
  }

  .token.constant,
  .token.deleted,
  .token.property,
  .token.symbol,
  .token.tag {
    color: #f92672;
  }

  .token.boolean,
  .token.number {
    color: #ae81ff;
  }

  .token.attr-name,
  .token.builtin,
  .token.char,
  .token.inserted,
  .token.selector,
  .token.string {
    color: #a6e22e;
  }

  .language-css .token.string,
  .style .token.string,
  .token.entity,
  .token.operator,
  .token.url,
  .token.variable {
    color: #f8f8f2;
  }

  .token.atrule,
  .token.attr-value,
  .token.class-name,
  .token.function {
    color: #e6db74;
  }

  .token.keyword {
    color: #66d9ef;
  }

  .token.important,
  .token.regex {
    color: #fd971f;
  }

  .token.bold,
  .token.important {
    font-weight: 700;
  }

  .token.italic {
    font-style: italic;
  }

  .token.entity {
    cursor: help;
  }
`;
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

/** 处理代码高亮和表格样式*/
const Style: FunctionComponent<propsTypes> = ({ type = "article" }) => {
  const CodeHighLisght = type == "article" ? Prism : HighLight;
  return (
    <>
      <style jsx>{CodeHighLisght}</style>
      <style jsx>{CodeStyle}</style>
      <style jsx>{TableStyle}</style>
    </>
  );
};
export default Style;
