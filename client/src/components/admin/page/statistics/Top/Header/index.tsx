import type { FC } from "react";
import useAnimateNumber from "use-animate-number";
import userAdminStatisticsData from "@/store/admin/admin-statistics-data";
import Container from "./HeaderItem";

const AnimateNumer: FC<{ number: number }> = ({ number }) => {
  const [animateValue] = useAnimateNumber(number, { decimals: 0 });
  return <>{animateValue}</>;
};

/** 大屏页面左侧顶部数据展示*/
const Header: FC = () => {
  let data = userAdminStatisticsData((s) => s.data);

  return (
    <div className="flex justify-between">
      <Container
        title="文章个数"
        data={<AnimateNumer number={data.article.article_count} />}
      />
      <Container
        title="类型|标签个数"
        data={
          <>
            <AnimateNumer number={data.type.type_count} />
            <span className="mx-1">|</span>
            <AnimateNumer number={data.type.tag_count} />
          </>
        }
      />

      <Container
        title="用户个数"
        data={<AnimateNumer number={data.user.user_count} />}
      />
      <Container
        title="友链个数"
        data={<AnimateNumer number={data.link.link_count} />}
      />
    </div>
  );
};
export default Header;
