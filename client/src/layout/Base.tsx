import Header from "@/components/common/Header";
import type { FC } from "react";

interface propsType{
  children:JSX.Element;
  className?:string;
}
/** 
 * 基本布局文件，只提供Header组件，使用main报错children
*/
const Base: FC<propsType> = (props) => {
  return (
    <>
      <Header />
      <main className={props.className}>{props.children}</main>
    </>
  );
};
export default Base;
