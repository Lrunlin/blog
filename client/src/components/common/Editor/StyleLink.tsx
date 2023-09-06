import { memo } from "react";
import type { FC } from "react";
const StyleLink: FC<{ id: number }> = memo(({ id }) => {
  return (
    <link
      rel="stylesheet"
      href={`${process.env.CDN}/static/theme/${id}.css?v=${+new Date()}`}
    ></link>
  );
});
export default StyleLink;
