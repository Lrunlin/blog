import Head from "next/head";
import type { FunctionComponent } from "react";
import type { GetServerSideProps } from "next";

interface props {
  title: string;
  description: string;
  keyword: string[];
}

/**Head组件封装 title keywords  description*/
const HeadComponent: FunctionComponent<props> = props => {
  return (
    <Head>
      <title>{props.title}</title>
      <meta name="viewport" content="width=device-width, initial-scale=1,user-scalable=no" />
      <meta name="description" content={props.description} />
      <meta name="keywords" content={"前端路上,博客" + props.keyword.join(",")} />
      <link rel="shortcut icon" href="/favicon.svg" type="image/x-icon" />
      {props.children}
    </Head>
  );
};

export default HeadComponent;
