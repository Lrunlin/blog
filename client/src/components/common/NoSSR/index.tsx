import { useState, useEffect, ReactNode, FC } from "react";
interface propsType {
  children: ReactNode;
}
const NoSSR: FC<propsType> = props => {
  let [load, setLoad] = useState(typeof window != "undefined");
  useEffect(() => {
    !load && setLoad(true);
  }, []);
  return <>{load && props.children}</>;
};
export default NoSSR;
