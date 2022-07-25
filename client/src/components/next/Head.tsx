import Head from "next/head";
import type { FunctionComponent } from "react";
interface props {
  title: string;
  description: string;
  keyword: string[];
  children?: JSX.Element;
}

/**Head组件封装 title keywords  description children*/
const HeadComponent: FunctionComponent<props> = prop => {
  return (
    <Head>
      <title>{prop.title}</title>
      <meta name="viewport" content="width=device-width, initial-scale=1,user-scalable=no" />
      <meta name="description" content={prop.description} />
      <meta name="keywords" content={"网络日志,博客,前端开发,WEB," + prop.keyword.join(",")} />
      <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
      {prop.children}
    </Head>
  );
};

export default HeadComponent;
