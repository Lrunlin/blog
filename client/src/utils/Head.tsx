import Head from "next/head";
interface props {
  title: string;
  description: string;
  keyword: string[];
}

/**Head组件封装 title keywords  description*/
function HeadComponent({ title, description, keyword }: props) {

  return (
    <Head>
      <title>{title}</title>
      <meta name="viewport" content="width=device-width, initial-scale=1,user-scalable=no" />
      <meta name="description" content={description} />
      <meta name="keywords" content={"前端路上,博客" + keyword.join(",")} />
      <link rel="shortcut icon" href="/favicon.svg" type="image/x-icon" />
    </Head>
  );
}
export default HeadComponent;
