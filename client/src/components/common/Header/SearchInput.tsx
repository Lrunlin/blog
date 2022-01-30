import { memo, useState } from "react";
import type { FunctionComponent } from "react";
import router from "next/router";
import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";

/** 顶部搜索框组件*/
const SearchInput: FunctionComponent = memo(() => {
  const [search, setSearch] = useState<string>(""); //搜索框内容
  /** 文章搜索函数*/
  const articleArticle = (text: string): boolean | void => {
    if (!/^[\s\S]*.*[^\s][\s\S]*$/.test(text)) {
      return false;
    }
    router.push({
      pathname: "/search",
      query: {
        text: text,
      },
    });
  };
  return (
    <Input
      style={{
        width: "280px",
        height: "32px",
        borderRadius: "20px",
        backgroundColor: "#f0f1f4",
      }}
      value={search}
      placeholder="搜索内容"
      bordered={false}
      prefix={<SearchOutlined />}
      maxLength={20}
      onChange={e => setSearch(e.target.value)}
      onPressEnter={e => articleArticle(search)}
    />
  );
});
export default SearchInput;
