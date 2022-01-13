import { useState, FunctionComponent, useEffect } from "react";
interface propsTypes {
  /** 骨架，SSR*/
  onLoad?: JSX.Element;
}

/** 通过useEffect、useState来CSR */
const NoSSR: FunctionComponent<propsTypes> = props => {
  const [state, setstate] = useState(false);
  useEffect(() => {
    setstate(true);
  }, []);
  return <>{!state ? props.onLoad : props.children}</>;
};
export default NoSSR;
