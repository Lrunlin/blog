import Head from "next/head";
export default function setHead(data: {
  title: string;
  keywords: string;
  description: string;
}) {
  return (
    <Head>
      <meta name="application name" content="刘润霖个人博客" />
      <meta name="keywords" content={`刘润霖,web前端,博客,${data.keywords}`} />
      <meta name="description" content={data.description} />
      <meta name="author" content="刘润霖" />
      <meta name="copyright" content="刘润霖博客网站:https://blogweb.cn" />
      <meta
        name="subject"
        content="网站为门户页面、管理页面,用户文章页面使用vue3,next10,react17,node14,mysql5.X,jquery3.51"
      />
      <meta name="url" content="https://blogweb.com/" />
      <meta name="warn" content="当你纠结是否要使用某项技术时那就不用" />
      <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
      <meta name="google" content="notranslate" />
      <title>{data.title}</title>
    </Head>
  );
}
