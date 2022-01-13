import { useState, useEffect, FunctionComponent, memo, useRef } from "react";
import UpgradeComment from "./UpgradeComment";
import type { formatCommentsType } from "./index";
import axios from "axios";
import type { response, comment as commentType } from "@/types";
import css from "styled-jsx/css";
import If from "@/utils/If";
interface propsTypes {
  articleId: string | null;
}

const Style = css`
  .comment-container {
    background-color: white;
    padding: 10px 20px;
    margin-top: 10px;
  }
`;

/** 将评论数据处理并渲染 */
const Comments: FunctionComponent<propsTypes> = props => {
  const [data, setData] = useState<formatCommentsType[]>([]);
  /** 重新获取评论数据*/
  function resetData() {
    axios.get<response<commentType[]>>(`/comment/${props.articleId}`).then(res => {
      let _data: formatCommentsType[] = [];
      //处理一级
      res.data.data.forEach(item => {
        if (!item.superior) {
          (item as any).childrenComment = [];
          _data.push(item);
        }
      });
      // 处理二级
      res.data.data.forEach(item => {
        let result = _data.find((el: commentType) => el.id == item.superior);
        if (result) {
          result?.childrenComment?.push(item);
        }
      });
      // 处理剩下的子级评论
      res.data.data.forEach(item => {
        _data.forEach((el, index) => {
          if (el?.childrenComment?.some(arr => arr.id === item.superior)) {
            _data[index].childrenComment?.push(item);
          }
        });
      });
      setData(_data);
    });
  }
  useEffect(() => {
    resetData();
  }, [props.articleId]);

  return (
    <>
      <style jsx>{Style}</style>
      <If if={data.length > 0}>
        <div className="comment-container">
          {data.map(item => {
            return (
              item.childrenComment && (
                <UpgradeComment data={data} item={item} key={item.id + Math.random()}>
                  {item.childrenComment.map(el => {
                    //?处理一下评论者名字显示格式
                    return <UpgradeComment data={data} item={el} key={item.id + Math.random()} />;
                  })}
                </UpgradeComment>
              )
            );
          })}
        </div>
      </If>
    </>
  );
};
export default memo(Comments);
