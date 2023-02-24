import type { NoticeAttributes } from "@/db/models/notice";
import DB from "@/db";

// 转换 follow-problem 类型的通知
async function switchNoticeFollowProblem(data: NoticeAttributes) {
  /** 查询问题的id和标题*/
  let problemData = await DB.Problem.findByPk(data.relation_id, {
    attributes: ["id", "title", "author"],
    raw: true,
  })
    .then(row => row)
    .catch(() => false as false);
  if (!problemData) return false;

  let userData = await DB.User.findByPk(problemData.author, {
    attributes: ["id", "name", "avatar_file_name", "avatar_url"],
  });

  return {
    ...data,
    label: {
      type: "problem",
      user_data: userData,
      content_data: problemData,
    },
  };
}
export default switchNoticeFollowProblem;
