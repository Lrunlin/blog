import { FunctionComponent } from "react";
import Image from "next/image";
import css from "styled-jsx/css";

// https:zhuanlan.zhihu.com/p/437382427

const Style = css`
  .banner-container {
    height: 600px;
    width: 100vw;
    background-repeat: repeat-y;
    background-image: url(/image/banner.jpg);
  }
  .typing {
    color: white;
    font-size: 2em;
    width: 30em;
    height: 1.5em;
    margin: 0px auto;
    border-right: 1px solid transparent;
    animation: typing 2s steps(42, end), blink-caret 0.7s step-end infinite;
    font-family: Consolas, Monaco;
    word-break: break-all;
    overflow: hidden;
    position: relative;
    top: 200px;
  }
  /* 打印效果 */
  @keyframes typing {
    from {
      width: 0;
    }

    to {
      width: 30em;
    }
  }

  /* 光标 */
  @keyframes blink-caret {
    from,
    to {
      border-color: transparent;
    }

    50% {
      border-color: currentColor;
    }
  }
`;
const Index: FunctionComponent = () => {
  return (
    <>
      <style jsx>{Style}</style>
      <div className="banner-container">
        <div className="typing">{`<title>【前端实验室】分享前端最新、最实用前端技术</title>`}</div>
      </div>
    </>
  );
};
export default Index;
