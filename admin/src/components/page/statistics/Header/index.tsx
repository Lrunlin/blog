import type { FC } from "react";
import Container from "../common/HeaderItem";
import useAnimateNumber from "use-animate-number";
interface propsType {
  type: { type_count: number; tag_count: number };
  user: { user_count: number };
  link: { link_count: number };
}

const AnimateNumer: FC<{ number: number }> = ({ number }) => {
  const [animateValue] = useAnimateNumber(number, { decimals: 0 });
  return <>{animateValue}</>;
};

/** 大屏页面左侧顶部数据展示*/
const Header: FC<propsType> = props => {
  return (
    <div className="flex justify-between">
      <Container
        title="类型个数"
        data={<AnimateNumer number={props.type.type_count} />}
        footer={<></>}
      />
      <Container
        title="标签个数"
        data={<AnimateNumer number={props.type.tag_count} />}
        footer={<></>}
      />
      <Container
        title="用户个数"
        data={<AnimateNumer number={props.user.user_count} />}
        footer={<></>}
      />
      <Container
        title="友链个数"
        data={<AnimateNumer number={props.link.link_count} />}
        footer={<></>}
      />
    </div>
  );
};
export default Header;
