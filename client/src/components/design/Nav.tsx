import Link from "next/link";
import Image from "next/image";
import { FunctionComponent } from "react";
interface navListTypes {
  readonly href: string;
  readonly text: string;
}

const Nav: FunctionComponent = () => {
  let navList: navListTypes[] = [
    {
      href: "/",
      text: "博客",
    },
    {
      href: "#about",
      text: "关于",
    },
    {
      href: "#example",
      text: "样例",
    },
    {
      href: "#contact",
      text: "联系",
    },
  ];

  return (
    <>
      <style jsx>
        {`
          header {
            background-color: black;
          }
          .container {
            height: 44px;
            color: white;
            display: flex;
            padding: 0px 20px;
            justify-content: space-between;
            align-items: center;
          }
          nav {
            width: 300px;
            display: flex;
            justify-content: space-around;
          }
          a {
            color: white;
          }
          .logo-animate {
            position: relative;
            width: 30px;
            overflow: hidden;
          }
          .logo {
            width: 60px;
            position: absolute;
          }
        `}
      </style>
      <header>
        <div className="container">
          <div className="logo-animate">
            <Image height={32} width={32} className="logo" src="/image/logo.png" alt="logo" />
          </div>
          <nav>
            {navList.map(item => (
              <Link href={item.href} key={`navList${item.text}`}>
                <a>{item.text}</a>
              </Link>
            ))}
          </nav>
        </div>
      </header>
    </>
  );
};
export default Nav;
