import Link from "next/link";
import style from './index.module.scss'
export default function noFound() {
  return (
    <div className={style.noFound}>
      <h1>404</h1>
      <p>并没有找到您需要的文章,不如去首页看一下吧</p>
      <Link href="/">首页</Link>
    </div>
  );
}
