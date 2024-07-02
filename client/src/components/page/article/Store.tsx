"use client";

import { FC, useEffect } from "react";
import type { ArticleAttributes } from "@type/model-attribute";
import userUserCurrentArticleData from "@/store/user/user-current-article-data";

const Store: FC<{ data: ArticleAttributes }> = ({ data }) => {
  let setUserCurrentArticleData = userUserCurrentArticleData(
    (s) => s.setArticleData,
  );
  let resetUserCurrentArticleData = userUserCurrentArticleData(
    (s) => s.resetData,
  );

  useEffect(() => {
    setUserCurrentArticleData(data);
    return () => {
      resetUserCurrentArticleData();
    };
  }, []);
  return <></>;
};
export default Store;
