import type { FC } from "react";
import { Link } from "react-router-dom";
import { Empty, Button } from "antd";

interface propsType {
  data: { type: "link" | "comment"; count: number }[];
}

function switchText(type: "link" | "comment") {
  if (type == "link") {
    return "友情链接申请待处理";
  } else if (type == "comment") {
    return "新评论发布";
  }
  return "";
}

/** 首页同时显示组件*/
const Notice: FC<propsType> = ({ data }) => {
  return (
    <>
      {data.length ? (
        data.map(item => (
          <div className="flex justify-between" key={`index-${item.type}-${item.count}`}>
            <div>
              有 <b>{item.count}</b> {switchText(item.type)}
            </div>
            <Link to={`/${item.type}`}>
              <Button>去看看</Button>
            </Link>
          </div>
        ))
      ) : (
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="暂时没有通知" />
      )}
    </>
  );
};
export default Notice;
