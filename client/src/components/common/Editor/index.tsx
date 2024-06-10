"use client";
import { FC } from "react";
import dynamic from "next/dynamic";
const Editor = dynamic(() => import("./Editor"), { ssr: false, loading: () => <Skeleton /> });

export interface propsType {
  className?: string;
  /** 上传至哪个文件夹*/
  target: "article" | "problem" | "answer";
  /** 初始化数据*/
  initValue?: string;
  onChange?: (html: string) => any;
  height?: number;
  /** 是否使用主题*/
  theme?: boolean;
  /** 设置主题*/
  onSetTheme?: (id: number) => void;
  defaultTheme?: number;
}

export const Skeleton = () => <div className="w-full h-[700px] bg-gray-200 animate-pulse"></div>;

const ComponentName: FC<propsType> = props => {
  return (
    <>
      <Editor {...props} />
    </>
  );
};
export default ComponentName;
