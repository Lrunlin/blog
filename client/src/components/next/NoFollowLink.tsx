import type { FC, DetailedHTMLProps, AnchorHTMLAttributes } from "react";

type propsType = DetailedHTMLProps<AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>;

/** 不需要搜索引擎抓取的外站链接*/
const NoFollowLink: FC<propsType> = props => {
  return (
    <a target="_blank" rel="nofollow noopener noreferrer" {...props}>
      {props.children}
    </a>
  );
};
export default NoFollowLink;
