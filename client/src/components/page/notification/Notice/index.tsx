import type { FC } from "react";
import type {
  noticeAnswerListType,
  noticeCommentListType,
  noticeFollowListType,
} from "@/app/notification/[type]/page";
import AnswerItem from "./Answer";
import CommentItem from "./Comment";
import FollowItem from "./Follow";

type componentsType = "comment" | "follow" | "answer";

/** 根据通知类型返回对应的显示组件*/
const Component: FC<{
  type: componentsType;
  data: noticeCommentListType | noticeAnswerListType | noticeFollowListType;
}> = ({ type, data }) => {
  let map = [
    {
      lable: "comment",
      component: <CommentItem data={data as noticeCommentListType} />,
    },
    {
      lable: "follow",
      component: <FollowItem data={data as noticeFollowListType} />,
    },
    {
      lable: "answer",
      component: <AnswerItem data={data as noticeAnswerListType} />,
    },
  ];
  return map.find((_item) => type.startsWith(_item.lable))
    ?.component as JSX.Element;
};

type listData = (
  | noticeCommentListType
  | noticeAnswerListType
  | noticeFollowListType
)[];

/** 对多个通知数据进行指定类型的转换*/
const Notice: FC<{
  data: listData;
}> = ({ data }) => {
  return (
    <div className="w-5/6">
      {data.map((item) => {
        return (
          <div
            key={`notice-${item.id}`}
            className="relative mt-2 flex max-w-full bg-white p-2 shadow-sm"
          >
            <Component type={item.type as componentsType} data={item} />
            {item.is_read == 0 && (
              <div className="absolute right-3 top-3 h-2 w-2 rounded-full bg-red-400"></div>
            )}
          </div>
        );
      })}
    </div>
  );
};
export default Notice;
