import Router from "@koa/router";
import DB from "@/db";
import Sequelize from "@/db/config";
import interger from "@/common/verify/integer";
import getUserId from "@/common/middleware/getUserId";
import setDescription from "@/common/modules/article/get/set-description";
import getTagData from "@/common/modules/article/get/set-tag-data";
import { Op } from "sequelize";

let router = new Router();
// 根据集合ID查询对应的收藏ID
router.get("/favorites/list/:id", getUserId, interger([], ["id"]), async ctx => {
  let id = +ctx.params.id; //收藏集ID

  let favoritesData = await DB.Favorites.findByPk(id, {
    attributes: { exclude: ["create_time", "id"] },
    raw: true,
  });

  if (!favoritesData) {
    ctx.status = 404;
    ctx.body = { success: false, message: "为查到到指定收藏集" };
    return;
  }

  // 如果不是本人查询，并且收藏集是隐私模式
  if (favoritesData.user_id != ctx.id && favoritesData.is_private) {
    ctx.status = 401;
    ctx.body = { success: false, message: "禁止查询" };
    return;
  }

  let articleId = await DB.Collection.findAll({
    where: {
      favorites_id: { [Op.like]: `%${id}%` },
    },
    attributes: ["belong_id", "type"],
    order: [["create_time", "desc"]],
    raw: true,
  });

  let articleList = await DB.Article.findAll({
    attributes: [
      "id",
      "title",
      "description",
      "view_count",
      "cover_file_name",
      "cover_url",
      "update_time",
      "create_time",
      "tag",
      "content",
      "reprint",
      [
        Sequelize.literal(
          `(SELECT COUNT(id) FROM comment WHERE comment.belong_id = article.id and type="article")`
        ),
        "comment_count",
      ],
      [
        Sequelize.literal(`(SELECT COUNT(id) FROM likes WHERE likes.belong_id = article.id)`),
        "like_count",
      ],
    ],
    include: [
      {
        model: DB.User,
        as: "author_data",
        attributes: ["name"],
      },
    ],
    where: { id: articleId.filter(item => item.type == "article").map(item => item.belong_id) },
  })
    .then(rows => {
      return rows.map(row => {
        let item = row.toJSON();
        let description = setDescription(item.content);
        let tag = getTagData(item.tag as unknown as number[], ["name"]);
        return Object.assign(item, {
          description,
          tag,
          state: undefined,
          content: undefined,
          reprint: undefined,
          cover_file_name: undefined,
        });
      });
    })
    .catch(err => {
      ctx.status = 500;
      ctx.body = { success: false, message: "查询失败" };
      console.log(err);
    });

  let problemList = await DB.Problem.findAll({
    attributes: [
      "id",
      "title",
      "tag",
      "content",
      "view_count",
      "create_time",
      "update_time",
      [
        Sequelize.literal(`(SELECT COUNT(id) FROM answer WHERE problem.id = answer.problem_id)`),
        "answer_count",
      ],
    ],
    where: { id: articleId.filter(item => item.type == "problem").map(item => item.belong_id) },
  })
    .then(rows => {
      return rows.map(row => {
        return {
          ...row.toJSON(),
          tag: getTagData(row.toJSON().tag as unknown as number[], ["name"]),
        };
      });
    })
    .catch(err => {
      console.log(err);
      return [];
    });

  let authorData = await DB.User.findByPk(favoritesData.user_id, {
    attributes: ["id", "name", "avatar_file_name", "avatar_url"],
  });

  ctx.body = {
    success: true,
    message: "查询收藏集对应的收藏文章、问题",
    data: {
      favorites_data: favoritesData,
      article_list: articleList,
      problem_list: problemList,
      author_data: authorData,
    },
  };
});
export default router;
