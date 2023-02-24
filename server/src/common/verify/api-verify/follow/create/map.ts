import DB from "@/db";
import {
  AnswerAttributes,
  ArticleAttributes,
  ProblemAttributes,
  UserAttributes,
} from "@/db/models/init-models";

/** 传入参数判断文章、答案、问题是否存在*/
export type type = "problem" | "user";
function map(type: type, attributes?: string[]) {
  return {
    problem: {
      db: (value: number) =>
        DB.Problem.findByPk(value, {
          attributes: attributes || ["id"],
          raw: true,
        }),
      message: "未找到指定的问题",
    },
    user: {
      db: (value: number) =>
        DB.User.findByPk(value, {
          attributes: attributes || ["id"],
          raw: true,
        }),
      message: "未找到指定的用户",
    },
  }[type];
}
export default map;
