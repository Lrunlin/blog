import type { NextPage } from "next";
import type { FunctionComponent } from "react";
import Head from "@/utils/Head";
import Image from "next/image";

import Index from "@/components/home/Index";
import Nav from "@/components/home/Nav";
import About from "@/components/home/About";
import Example from "@/components/home/Example";
import Contact from "@/components/home/Contact";
import Helper from "@/components/home/Helper";

import CodeSVG from "../../../public/image/code.svg";

const Footer: FunctionComponent = () => {
  return (
    <>
      <style jsx>{`
        .footer-logo {
          background-color: #2f3238;
          text-align: center;
          padding-top: 30px;
          padding-bottom: 50px;
          img {
            width: 100px;
            height: 100px;
          }
        }
        .bottom {
          height: 50px;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: #26292e;
          font-size: 18px;
          color: #fff;
          letter-spacing: 1px;
        }
      `}</style>
      <footer>
        <div className="footer-logo">
          <Image src="/image/code.svg" unoptimized={true} width={100} height={100}></Image>
        </div>
        <div className="bottom">THANKS</div>
      </footer>
    </>
  );
};

const Home: NextPage = () => {
  return (
    <>
      <Head
        title="前端路上-技术博客 | 网站Web前端 | 网站设计"
        description="技术文章分享、个人简历以及网站页面设计"
        keyword={["首页", "介绍", "Web前端", "React.js", "页面设计"]}
      />
      <style jsx global>{`
        html,
        body {
          scroll-behavior: smooth; /* 锚点滚动 */
        }
      `}</style>
      <div style={{ maxWidth: "100%" }}>
        <Nav />
        <Index />
        <About />
        <Example />
        <Helper />
        <Contact />
        <Footer />
      </div>
    </>
  );
};

export default Home;
