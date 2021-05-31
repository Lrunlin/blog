import style from "./index.module.scss";
import setHead from "../../components/Head";

export default function about() {
  const code = () => (
    <a
      href="https://github.com/Lrunlin/blog"
      target="_blank"
      className={style.link}
    >
      本站源码
    </a>
  );
  const github = () => (
    <a
      href="https://github.com/Lrunlin/"
      target="_blank"
      className={style.link}
    >
      GitHub
    </a>
  );
  return (
    <>
      {setHead({
        title: "刘润霖||关于作者",
        keywords: "web前端,博客,刘润霖,关于作者",
        description:
          "刘润霖WEB个人博客,本站关于刘润霖作者,博客介绍,以及源代码说明,刘润霖GitHub--刘润霖博客",
      })}
      <h2>关于作者</h2>
      <p className={style.title_red}>
        !!:本站作品均为本人原创,文章观点、思路仅代表个人想法。
      </p>
      <p>
        本站为本人学习、分享网站，网站搭建会使用本人最新学习的技术，并频繁更新(
        {code()})，平时也会分享技术文章，力扣算法
      </p>
      <h2>源码说明</h2>
      <p>
        本站主要为学习用途,会频繁使用最新技术编写{code()}源码地址为本人
        {github()}
      </p>
      <p>现有代码:React Hooks,Vue3,Scss,Next.js,Express,MySql</p>
      <p>
        坚持写文章并不是一件容易的事,如果你认为我的文章对你有帮助,欢迎将本站推荐给你的小伙伴,或者去我的
        {github()}star一下吧。
      </p>
    </>
  );
}
