import { FunctionComponent } from "react";
import Link from "next/link";
import css from "styled-jsx/css";
import setClassName from "classnames";
import { useRouter } from "next/router";

interface navListTypes {
  href: string;
  text: string;
}
const navList: navListTypes[] = [
  {
    href: "/",
    text: "首页",
  },
  {
    href: "/design",
    text: "Design",
  },
  {
    href: "/comment",
    text: "随便说说",
  },
  {
    href: "/open-api",
    text: "开放API",
  },
];
const Style = css`
  nav {
    width: 360px;
    a {
      margin-left: 25px !important;
      color: #333;
    }
  }
  
  .logo {
    width: 32px;
    height: 32px;
    opacity: 0.6;
  }
  .logo:hover {
    transition: 0.5s;
    opacity: 1;
  }
`;

const Nav: FunctionComponent = () => {
  let router = useRouter();
  return (
    <>
      <nav>
        <style jsx>{Style}</style>
        <img src="/favicon.svg" className="logo" alt="logo" />
        {navList.map(item => (
          <Link href={item.href} key={item.text}>
            <a className={setClassName({ active: router.pathname == item.href })}>{item.text}</a>
          </Link>
        ))}
      </nav>
    </>
  );
};
export default Nav;
