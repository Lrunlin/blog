import Router from "@koa/router";
import DB from "@/db";
import Sequelize from "@/db/config";
import auth from "@/common/middleware/auth";
import getTagData from "@/common/modules/article/get/set-tag-data";
import verify from "@/common/verify/api-verify/problem/list";

let router = new Router();

router.get("/problem/list/:page", auth(0), async (ctx) => {
  let page = +ctx.params.page;

  try {
    // 查询用户创建的问题，并关联 ArticleTag 和 Tag 表
    let { count, rows } = await DB.Problem.findAndCountAll({
      offset: (page - 1) * 10,
      limit: 10,
      attributes: [
        "id",
        "title",
        "content",
        "view_count",
        "create_time",
        "update_time",
        [
          Sequelize.literal(
            `(SELECT COUNT(id) FROM answer WHERE problem.id = answer.problem_id)`,
          ),
          "answer_count",
        ],
      ],
      where: { author: ctx.id },
      order: [["create_time", "desc"]],
      include: [
        {
          model: DB.ArticleTag, // 通过中间表关联标签
          as: "tag_problem_list", // 使用 Problem 与 ArticleTag 之间关系的别名
          attributes: ["tag_id"], // 获取 tag_id
          include: [
            {
              model: DB.Tag, // 关联 Tag 表
              as: "tag_data", // Tag 表的别名
              attributes: ["id", "name"], // 获取 Tag 的 id 和 name
            },
          ],
        },
      ],
    });

    // 格式化数据：处理 tags 信息
    let problemList = rows.map((row) => {
      let item: any = row.toJSON();

      // 获取标签数据
      let tag = item.tag_problem_list.map((article_tag: any) => ({
        id: article_tag.tag_data.id,
        name: article_tag.tag_data.name,
      }));

      // 返回问题数据，包含 tag 信息
      return {
        ...item,
        tag,
        tag_problem_list: undefined, // 去掉关联表的中间数据
      };
    });

    // 返回查询结果
    ctx.body = {
      success: true,
      message: "查询指定用户问答成功",
      data: {
        total: count,
        list: problemList,
      },
    };
  } catch (err) {
    ctx.body = { success: false, message: "请求错误" };
    console.error(err);
  }
});

export default router;
