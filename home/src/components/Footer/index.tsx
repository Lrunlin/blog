import style from "./index.module.scss";
export default function Footer() {
  return (
    <footer className={style.footer}>
      <p>
        <a href="https://beian.miit.gov.cn/" target="_blank" rel="external nofollow">
          辽ICP备2020014377号-2
        </a>
      </p>
      <p>本站搭建:Next.js、Node.js、MySQL、Antd</p>
      <p>&copy;刘润霖 2021-</p>
    </footer>
  );
}
