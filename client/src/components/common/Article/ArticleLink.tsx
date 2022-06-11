import Link from "next/link";
import type { FunctionComponent } from "react";

interface propsTypes {
  id: string|number;
}

/** 文章跳转的超链接标签*/
const ArticleLink: FunctionComponent<propsTypes> = props => {
  return (
    <>
      <Link href={`/article/${props.id}`}>
        <a>{props.children}</a>
      </Link>
    </>
  );
};
export default ArticleLink;
