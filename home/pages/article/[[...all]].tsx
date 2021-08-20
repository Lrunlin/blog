import { useEffect } from "react";
import { Empty } from "antd";
import style from "./index.module.scss";
import { Tag } from "antd";
import axios from "axios";
import Head from "../../modules/Head";
interface article {
  router?: string;
  type?: string;
  introduce?: string;
  article?: string;
  time?: string;
  isTop?: boolean;
  isShow?: boolean;
  title?: string;
}
function Article({ data }: { data: article }) {
  // todo 绑定和删除图片懒加载和复制修改文字事件
  useEffect(() => {
    function imageLazyLoad() {
      function getTop(e) {
        var T = e.offsetTop;
        while ((e = e.offsetParent)) {
          T += e.offsetTop;
        }
        return T;
      }
      function lazyLoad(imgs) {
        var H = document.documentElement.clientHeight;
        var S = document.documentElement.scrollTop || document.body.scrollTop;
        for (var i = 0; i < imgs.length; i++) {
          if (H + S > getTop(imgs[i]) && !imgs[i].src) {
            imgs[i].src = imgs[i].getAttribute("data-src");
          }
        }
      }
      lazyLoad(document.getElementsByTagName("img"));
    }
    function textCopy(e: any) {
      const userSelectt = window.getSelection().toString();
      const template = `\n文章作者:刘润霖\n文章地址:${window.location.href}`;
      e.preventDefault();
      e.clipboardData.setData("text", userSelectt + template);
    }
    let copy;
    window.addEventListener(
      "copy",
      (copy = e => {
        textCopy(e);
      })
    );
    window.addEventListener("scroll", imageLazyLoad);
    imageLazyLoad();
    // 处理代码块
    let pre: any = document.querySelectorAll("pre");
    for (let i = 0; i < pre.length; i++) {
      pre[i].classList = style.pre;
    }
    return () => {
      window.removeEventListener("copy", copy);
      window.removeEventListener("scroll", imageLazyLoad);
    };
  }, []);
  const articleData: article | undefined = data[0];
  const articleContainer = (article: article) => {
    return (
      <main className={style.container}>
        <h1>{article.title}</h1>
        <div>
          {!!article.isTop && <Tag color="blue">置顶</Tag>}
          <time>{article.time}</time>
        </div>
        <article
          dangerouslySetInnerHTML={{
            __html: article.article.replace(
              /\/blogweb.cn\/assets/g,
              "/file.blogweb.cn/assets"
            ),
            // !有的图片地址是旧地址，给他转换一下
          }}
        ></article>
      </main>
    );
  };
  const notFound = () => (
    <Empty description="没有找到对应的文章，去首页看看吧" />
  );
  return (
    <>
      {Head({
        title: articleData ? articleData.title : "没有找到对应的文章",
        keywords: articleData ? articleData.type : "Not found,刘润霖,404",
        description: articleData
          ? articleData.introduce
          : "没有找到对应的文章,请前往首页查询文章blogweb.cn",
      })}
      <div>{articleData ? articleContainer(articleData) : notFound()}</div>
    </>
  );
}
Article.getInitialProps = async ({ asPath }) => {
  let data;
  const router = asPath.replace("/article/", "");
  await axios
    .get(`/article/${router}`, {
      params: { key: "router,article,isTop,type,introduce,title,time" },
    })
    .then(res => {
      data = res.data.data;
    });
  return {
    data: data,
  };
};
export default Article;
