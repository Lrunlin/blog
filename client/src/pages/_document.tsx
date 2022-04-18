import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="zh-CN">
        <Head></Head>
        <body>
          <Main />
          <NextScript />
        </body>
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-G0R6YEF4YG"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
    window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-G0R6YEF4YG');
`,
          }}
        ></script>
      </Html>
    );
  }
}
export default MyDocument;
