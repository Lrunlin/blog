import vw from "@/common/utils/vw";
import Container from "../Container";
import Occupation from "./Occupation";
import Referer from "./Referer";

/** 大屏统计页面顶部展示部分*/
const Bottom = () => {
  return (
    <div className="mt-[1vw] flex">
      <Container>
        <Referer />
      </Container>
      <Container className="w-full" style={{ marginLeft: vw(35) }}>
        <Occupation />
      </Container>
    </div>
  );
};
export default Bottom;
