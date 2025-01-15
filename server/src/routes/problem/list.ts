import Router from "@koa/router";
import DB from "@/db";
import Sequelize from "@/db/config";
import verify from "@/common/verify/api-verify/problem/list";

let router = new Router();

router.get("/problem/page/:page", verify, async (ctx) => {
  let page = +ctx.params.page;

  try {
    // 查询问题数据并联表查询标签信息
    const { count, rows } = await DB.Problem.findAndCountAll({
      offset: (page - 1) * 10,
      limit: 10,
      attributes: [
        "id",
        "title",
        // "tag",
        "content",
        "view_count",
        "create_time",
        "update_time",
        "answer_id",
        [
          Sequelize.literal(
            `(SELECT COUNT(id) FROM answer WHERE problem.id = answer.problem_id)`,
          ),
          "answer_count",
        ],
      ],
      order: [["create_time", "desc"]],
      include: [
        {
          model: DB.ArticleTag, // 关联 ArticleTag 表
          as: "tag_problem_list", // 使用关联的别名
          attributes: ["tag_id"], // 获取标签ID
          include: [
            {
              model: DB.Tag, // 关联 Tag 表
              as: "tag_data", // Tag 表的别名
              attributes: ["id", "name"], // 获取标签的 id 和 name
            },
          ],
        },
      ],
    });

    // 格式化数据：处理 tag 信息
    const problemList = rows.map((row) => {
      const item: any = row.toJSON();

      // 提取 tag 信息
      const tag = item.tag_problem_list.map((articleTag: any) => ({
        id: articleTag.tag_data.id,
        name: articleTag.tag_data.name,
      }));

      // 返回格式化后的数据
      return {
        ...item,
        tag, // 直接添加 tag
        tag_problem_list: undefined, // 去掉关联表的中间数据
      };
    });

    ctx.body = {
      success: true,
      message: "查询问答成功",
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
