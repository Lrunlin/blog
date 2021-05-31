import style from "./index.module.scss";
export default function Footer() {

    return (
      <footer className={style.footer}>
        @2021-刘润霖的小站-
        <a href="https://beian.miit.gov.cn/" target="_blank">辽ICP备2020014377号-2</a>
      </footer>
    );
}