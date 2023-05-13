import { useEffect, useRef } from "react";
import type { ReactNode, FC } from "react";
import { Watermark } from "@pansy/watermark";
import type { Watermark as WatermarkType } from "@pansy/watermark";

interface propsType {
  text: string;
  children: ReactNode;
}

const WaterMark: FC<propsType> = props => {
  const watermark = useRef<WatermarkType>();
  useEffect(() => {
    watermark.current = new Watermark({
      text: props.text,
      container: "watermark-01",
      opacity: 0.25,
    });
    return () => {
      watermark.current && watermark.current.destroy();
    };
  }, [props]);

  return <div id="watermark-01">{props.children}</div>;
};
export default WaterMark;
