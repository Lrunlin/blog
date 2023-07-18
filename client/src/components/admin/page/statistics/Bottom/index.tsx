import Container from "../Container";
import Referer from "./Referer";
import Occupation from "./Occupation";
import vw from "@/common/utils/vw";

/** 大屏统计页面顶部展示部分*/
const Bottom = () => {
  return (
    <div className="flex mt-1vw">
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
