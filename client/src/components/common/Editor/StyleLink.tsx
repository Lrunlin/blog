import Head from "next/head";
import { memo } from "react";
import type { FC } from "react";
const StyleLink: FC<{ id: number }> = memo(({ id }) => {
  return (
    <Head>
      <link rel="stylesheet" href={`${process.env.CDN}/static/theme/${id}.css`}></link>
    </Head>
  );
});
export default StyleLink;
