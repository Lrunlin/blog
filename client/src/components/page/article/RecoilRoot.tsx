import { useEffect } from "react";
import type { FC, ReactNode } from "react";
import { useResetRecoilState, RecoilRoot } from "recoil";
import type { ArticleAttributes } from "@type/model-attribute";
import { currentArticleDataContext } from "@/pages/article/[id]";
interface propsType {
  currentArticleData: ArticleAttributes;
  children: ReactNode;
}
const Recoil: FC<propsType> = props => {
  let resetCurrentArticleData = useResetRecoilState(currentArticleDataContext);
  useEffect(() => {
    return () => {
      resetCurrentArticleData();
    };
  }, [props.currentArticleData]);
  return (
    <RecoilRoot
      initializeState={({ set }) => set(currentArticleDataContext, props.currentArticleData)}
    >
      {props.children}
    </RecoilRoot>
  );
};
export default Recoil;
