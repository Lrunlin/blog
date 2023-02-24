import DB from "@/db";

/** 传入参数判断文章、答案、问题是否存在*/
export type type = "article" | "problem" | "answer" | "user";
function map(type: type, attributes?: string[]) {
  return {
    article: {
      db: (value: number) =>
        DB.Article.findOne({
          where: {
            id: value,
            state: 1,
          },
          attributes: attributes || ["id"],
          raw: true,
        }),
      message: "未找到指定的文章",
    },
    problem: {
      db: (value: number) =>
        DB.Problem.findByPk(value, {
          attributes: attributes || ["id"],
          raw: true,
        }),
      message: "未找到指定的问题",
    },
    answer: {
      db: (value: number) =>
        DB.Answer.findByPk(value, {
          attributes: attributes || ["id"],
          raw: true,
        }),
      message: "未找到指定的答案",
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
