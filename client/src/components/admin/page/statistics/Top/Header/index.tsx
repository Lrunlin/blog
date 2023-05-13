import type { FC } from "react";
import Container from "./HeaderItem";
import useAnimateNumber from "use-animate-number";
import { useRecoilValue } from "recoil";
import { statisticsDataContext } from "@/pages/admin/statistics/index";
const AnimateNumer: FC<{ number: number }> = ({ number }) => {
  const [animateValue] = useAnimateNumber(number, { decimals: 0 });
  return <>{animateValue}</>;
};

/** 大屏页面左侧顶部数据展示*/
const Header: FC = () => {
  let data = useRecoilValue(statisticsDataContext);

  return (
    <div className="flex justify-between">
      <Container title="类型个数" data={<AnimateNumer number={data.type.type_count} />} />
      <Container title="标签个数" data={<AnimateNumer number={data.type.tag_count} />} />
      <Container title="用户个数" data={<AnimateNumer number={data.user.user_count} />} />
      <Container title="友链个数" data={<AnimateNumer number={data.link.link_count} />} />
    </div>
  );
};
export default Header;
