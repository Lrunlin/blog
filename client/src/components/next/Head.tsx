import HeadComponent from "next/head";
import type { FunctionComponent } from "react";
interface props {
  title?: string;
  description?: string;
  keywords?: string[];
  children?: JSX.Element;
}

/**Head组件封装 title keywords  description children*/
const Head: FunctionComponent<props> = props => {
  let { title, description, keywords } = props;
  return (
    <HeadComponent>
      {title && <title>{title}</title>}
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, maximum-scale=5, user-scalable=no"
      />
      {description && <meta name="description" content={description} />}
      {keywords && <meta name="keywords" content={keywords.join(",")} />}
      <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
      {props.children}
    </HeadComponent>
  );
};

export default Head;
