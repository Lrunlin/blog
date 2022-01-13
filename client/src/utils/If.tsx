import type { FunctionComponent } from "react";
interface propsTypes {
  if: any;
  else?: JSX.Element;
}
/**
 * todo 类似v-if通过if参数判断是否展示children内容
 * @params if else  类似v-if v-else
 * * 如有需要可添加else-if
 */
const If: FunctionComponent<propsTypes> = props => {
  return <>{!!props.if ? props.children : props.else}</>;
};
export default If;
