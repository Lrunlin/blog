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
        description="技术博客用于日常技术文章分享,游客可以编辑文章进行共享,网站开放部分API接口,所有文章均为原创,并且分享可做项目类型和日常开源分享。"
        keyword={["首页", "介绍", "Web前端", "React.js"]}
      />
      <Nav />
      <Index />
      <About />
      <Example />
      <Helper />
      <Contact />
      <Footer />
    </>
  );
};

export default Home;
