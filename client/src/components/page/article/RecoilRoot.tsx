import { useEffect } from "react";
import type { FC, ReactNode } from "react";
import { useResetRecoilState, useSetRecoilState, RecoilRoot } from "recoil";
import type { ArticleAttributes } from "@type/model-attribute";
import { currentArticleDataContext } from "@/pages/article/[id]";
interface propsType {
  currentArticleData: ArticleAttributes;
  children: ReactNode;
}
const Recoil: FC<propsType> = props => {
  let resetCurrentArticleData = useResetRecoilState(currentArticleDataContext);
  let setCurrentArticleData = useSetRecoilState(currentArticleDataContext);
  useEffect(() => {
    setCurrentArticleData(props.currentArticleData);
  });
  useEffect(() => {
    return () => {
      resetCurrentArticleData();
    };
  }, [props.currentArticleData]);

  return <RecoilRoot override={false}>{props.children}</RecoilRoot>;
};
export default Recoil;
