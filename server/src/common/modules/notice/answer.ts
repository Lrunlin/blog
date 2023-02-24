import type { NoticeAttributes } from "@/db/models/notice";
import DB from "@/db";

// 转换 answer 类型的通知
async function switchNoticeAnswer(data: NoticeAttributes) {
  /** 先查询答案隶属于哪个问题和回答问题的用户*/
  let answerData = await DB.Answer.findByPk(data.relation_id, {
    attributes: ["problem_id", "author"],
    raw: true,
  })
    .then(row => row)
    .catch(() => false as false);
  if (!answerData) return false;

  /** 查询问题的id和标题*/
  let problemData = await DB.Problem.findByPk(answerData.problem_id, {
    attributes: ["id", "title"],
    raw: true,
  })
    .then(row => row)
    .catch(() => false as false);
  if (!problemData) return false;

  let userData = await DB.User.findByPk(answerData.author, {
    attributes: ["id", "name", "avatar_file_name", "avatar_url"],
  });

  return {
    ...data,
    label: {
      type: "problem",
      user_data: userData,
      problem_data: problemData,
    },
  };
}
export default switchNoticeAnswer;
