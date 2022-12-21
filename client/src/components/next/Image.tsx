import type { FC } from "react";
import ImageNext from "next/image";
import type { ImageProps } from "next/image";

const Image: FC<ImageProps> = props => {
  return (
    <>
      <ImageNext
        loader={({ src, width }) => {
          return `${src.startsWith("http") ? src : `${process.env.CDN}${src}`}?w=${width}&q=${100}`;
        }}
        quality={100}
        {...props}
      />
    </>
  );
};

export default Image;