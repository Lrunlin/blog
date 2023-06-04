import type { FC } from "react";
import ImageNext from "next/image";
import type { ImageProps } from "next/image";

const Image: FC<ImageProps> = props => {
  return (
    <>
      <ImageNext
        quality={100}
        {...props}
        src={`${
          (props.src as string).startsWith("http") ? props.src : `${process.env.CDN}${props.src}`
        }`}
      />
    </>
  );
};

export default Image;
