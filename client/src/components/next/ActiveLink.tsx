import { useMemo } from "react";
import { FC } from "react";
import Link from "next/link";
import type { LinkProps } from "next/link";
import { usePathname } from "next/navigation";
import classNames from "classnames";

interface porpsType extends LinkProps {
  /** 如果路径一致设置classNames*/
  activeClassName?: string;
  children: React.ReactNode;
  className?: string;
  /** 是否对a标签设置不跟踪属性*/
  noFollow?: boolean;
}

/**
 * 高亮超链接，默认className:active-link
 */
const ActiveLink: FC<porpsType> = props => {
  let pathname = usePathname();
  let className = useMemo(() => {
    return pathname == props.href ? props.activeClassName || "active-link" : "";
  }, [pathname]);

  return (
    <>
      <Link
        href={props.href}
        className={classNames([props.className, className])}
        target={props.noFollow ? "_blank" : undefined}
        rel={props.noFollow ? "noreferrer nofollow" : undefined}
      >
        {props.children}
      </Link>
    </>
  );
};
export default ActiveLink;
