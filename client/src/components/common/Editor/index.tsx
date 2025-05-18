"use client";

import type { FC } from "react";
import dynamic from "next/dynamic";
import axios from "@axios";
import { response } from "@type/response";
import useFetch from "@/common/hooks/useFetch";
import Skeleton from "./Skeleton";
import "./index.scss";

export interface EditorProps {
  className?: string;
  target: "article" | "problem" | "answer";
  initValue?: string;
  onChange?: (content: string) => void;
  height?: number;
  theme?: boolean;
  defaultTheme?: number;
  onSetTheme?: (id: number) => void;
  cache?: boolean;
}

export interface LanguageItem {
  title: string;
  language: string;
}

export interface ThemeItem {
  id: number;
  name: string;
  author: number;
  state: number;
  indexes: number;
  create_time: string;
}

const VditorEditor = dynamic(() => import("./VditorEditor"), {
  ssr: false,
  loading: () => <Skeleton />,
});

const Editor: FC<EditorProps> = (props) => {
  let { data: languageData } = useFetch(() =>
    axios
      .get<response<LanguageItem[]>>("/language-list")
      .then((res) => res.data.data.map((item) => item)),
  );
  let { data: themeData } = useFetch(() =>
    axios
      .get<response<ThemeItem[]>>("/theme")
      .then((res) => res.data.data.map((item) => item)),
  );
  return (
    <div className={props.className} style={{ height: props.height || 900 }}>
      {languageData && themeData && (
        <VditorEditor
          {...props}
          languageData={languageData!}
          themeData={themeData!}
        />
      )}
    </div>
  );
};

export default Editor;
