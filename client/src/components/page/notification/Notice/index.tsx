import type { FC } from "react";
import dynamic from "next/dynamic";
import type {
  noticeCommentListType,
  noticeAnswerListType,
  noticeFollowListType,
} from "@/pages/notification/[type]";

const CommentItem = dynamic(import("./Comment"));
const FollowItem = dynamic(import("./Follow"));
const AnswerItem = dynamic(import("./Answer"));

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
  return map.find(_item => type.startsWith(_item.lable))?.component as JSX.Element;
};

type listData = (noticeCommentListType | noticeAnswerListType | noticeFollowListType)[];

/** 对多个通知数据进行指定类型的转换*/
const Notice: FC<{
  data: listData;
}> = ({ data }) => {
  return (
    <div className="w-5/6">
      {data.map(item => {
        return (
          <div
            key={`notice-${item.id}`}
            className="bg-white p-2 mt-2 relative shadow-sm flex max-w-full"
          >
            <Component type={item.type as componentsType} data={item} />
            {item.is_read == 0 && (
              <div className="w-2 h-2 absolute bg-red-400 rounded-full top-3 right-3"></div>
            )}
          </div>
        );
      })}
    </div>
  );
};
export default Notice;
