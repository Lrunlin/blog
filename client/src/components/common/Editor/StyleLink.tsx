import type { FC } from "react";
const StyleLink: FC<{ id: number }> = ({ id }) => {
  return (
    <link rel="stylesheet" href={`${process.env.CDN}/theme/${id}.css?v=${+new Date()}`}></link>
  );
};
export default StyleLink;
