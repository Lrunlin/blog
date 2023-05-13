import classNames from "classnames";
import Image from "@/components/next/Image";
import { currentArticleDataContext } from "@/pages/article/[id]";
import { useRecoilValue } from "recoil";
import itemClassName from "./class";
import { Badge } from "antd";

const Comment = () => {
  let currentArticleData = useRecoilValue(currentArticleDataContext);
  return (
    <>
      <a className={classNames([itemClassName, "block"])} href="#comment">
        <Badge count={currentArticleData.comment_count} color="#adb1b8" offset={[10, -10]}>
          <Image src="/icon/client/comments.png" height={24} width={24} alt="comments" />
        </Badge>
      </a>
    </>
  );
};
export default Comment;
