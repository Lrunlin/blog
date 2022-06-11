import type { FunctionComponent } from "react";
import { articlePageTypes } from "@/types";
import ArticleItem from "./ArticleItem";

interface propsTypes {
  data: articlePageTypes[];
}

/** 输入文章相关数组展示大概文章内容*/
const Article: FunctionComponent<propsTypes> = props => {
  return (
    <>
      {props.data.map(item => {
        return <ArticleItem key={item.id} {...item} />;
      })}
    </>
  );
};
export default Article;
