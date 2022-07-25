import { useMemo } from "react";
import { FC } from "react";
import Link from "next/link";
import type { LinkProps } from "next/link";
import { useRouter } from "next/router";
import classNames from 'classnames';

interface porpsType extends LinkProps {
  /** 如果路劲一致设置classNames*/
  activeClassName?: string;
  children: React.ReactNode;
  className?:string;
}

/**
 * 高亮超链接，默认className:active-link
 */
const ActiveLink: FC<porpsType> = props => {
  let router = useRouter();
  let className = useMemo(() => {
    return router.pathname == props.href ? props.activeClassName || "active-link" : "";
  }, [router]);

  
  return (
    <>
      <Link {...props}>
        <a className={classNames([className,props.className])}>{props.children}</a>
      </Link>
    </>
  );
};
export default ActiveLink;
