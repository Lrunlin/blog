// https://github.com/ant-design/ant-design-examples/blob/main/examples/with-nextjs-generate-css-on-demand/pages/_document.tsx#L35

import Document, { Html, Head, Main, NextScript, DocumentContext } from "next/document";
import { doExtraStyle } from "@/styles/genAntdCss";
import { StyleProvider, createCache } from "@ant-design/cssinjs";

let antdFileNameMap: { [key: string]: string } = {};

const MyDocument = () => (
  <Html lang="zh-CN">
    <Head />
    <body>
      <Main />
      <NextScript />
    </body>
  </Html>
);

MyDocument.getInitialProps = async (ctx: DocumentContext) => {
  let fileName = antdFileNameMap[ctx.pathname] || "";

  let cache = createCache();
  let originalRenderPage = ctx.renderPage;
  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: App => props =>
        !fileName ? (
          <StyleProvider cache={cache}>
            <App {...props} />
          </StyleProvider>
        ) : (
          <App {...props} />
        ),
    });
  let initialProps = await Document.getInitialProps(ctx);

  if (!fileName) {
    fileName = doExtraStyle({
      cache,
    });
    antdFileNameMap[ctx.pathname] = fileName;
  }

  return {
    ...initialProps,
    styles: (
      <>
        {initialProps.styles}
        <link rel="stylesheet" href={`${process.env.CDN}${fileName}`} />
      </>
    ),
  };
};

export default MyDocument;
