"use client";

import type { FC } from "react";
import ImageNext from "next/image";
import type { ImageProps } from "next/image";

const Image: FC<ImageProps> = (props) => {
  return (
    <>
      <ImageNext
        {...props}
        src={props.src}
        loader={({ src, width, quality }) => {
          return `${process.env.CDN}${src}?w=${width}&q=${100}`;
        }}
      />
    </>
  );
};

export default Image;
