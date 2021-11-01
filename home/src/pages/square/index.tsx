import { useState, Fragment } from "react";
import style from "./index.module.scss";
import News from "@/components/News";
import TheCommunistParty from "@/components/theCommunistParty";
import SquareMessage from "@/components/squareMessage";
import { useRouter } from "next/router";
import Head from "@/modules/Head";

interface navType {
  label: string;
  componsent: JSX.Element;
}
function Square({ tag }: { tag: undefined | string }) {
  let router = useRouter();
  const nav: navType[] = [
    {
      label: "新闻",
      componsent: <News />,
    },
    {
      label: "学习强国",
      componsent: <TheCommunistParty />,
    },
    {
      label: "留言",
      componsent: <SquareMessage />,
    },
  ];
  const [active, setActive] = useState<string>(tag || "新闻");
  function switchActive(label: string) {
    router.push({ query: { tag: label } });
    setActive(label);
  }
  return (
    <Fragment>
      {Head({
        title: "广场",
        keywords: "广场,学习强国,评论",
        description: "广场功能，展示学习强国新闻，视频入口，评论",
      })}
      <nav className={style.nav}>
        {nav.map((item: navType) => {
          return (
            <span
              className={`${style.item} ${active == item.label && style.active}`}
              onClick={() => switchActive(item.label)}
              key={item.label}
            >
              {item.label}
            </span>
          );
        })}
      </nav>
      <div className={style.container}>
        {/* <main>{nav.find(item => item.label == active).componsent}</main> */}
        <main>
          {nav.map((item: navType) => {
            return (
              <div
                key={item.label + Math.random()}
                style={{ display: item.label == active ? "block" : "none" }}
              >
                {item.componsent}
              </div>
            );
          })}
        </main>
      </div>
    </Fragment>
  );
}
Square.getInitialProps = async props => {
  return { tag: props.query.tag };
};
export default Square;
