import Router from "@koa/router";
import DB from "@/db";
import { Op } from "sequelize";
import Sequelize from "@/db/config";
import getUserId from "@/common/middleware/auth/getUserId";
import setDescription from "@/common/modules/article/get/set-description";
import interger from "@/common/verify/integer";

let router = new Router();

// 根据集合ID查询对应的收藏ID
router.get(
  "/favorites/list/:id",
  getUserId,
  interger([], ["id"]),
  async (ctx) => {
    let id = +ctx.params.id; // 收藏集ID

    try {
      // 查询收藏集信息
      let favoritesData = await DB.Favorites.findByPk(id, {
        attributes: { exclude: ["create_time", "id"] },
        raw: true,
      });

      if (!favoritesData) {
        ctx.status = 404;
        ctx.body = { success: false, message: "未查找到指定收藏集" };
        return;
      }

      // 如果收藏集是隐私模式，且查询用户非本人
      if (favoritesData.user_id !== ctx.id && favoritesData.is_private) {
        ctx.status = 401;
        ctx.body = { success: false, message: "禁止查询" };
        return;
      }

      // 查询收藏集中的文章和问题
      let articleId = await DB.Collection.findAll({
        where: {
          favorites_id: id,
        },
        attributes: ["belong_id", "type"],
        order: [["create_time", "desc"]],
        raw: true,
      });

      // 查询文章数据
      let articleList = await DB.Article.findAll({
        attributes: [
          "id",
          "title",
          "view_count",
          "cover_url",
          "update_time",
          "description",
          "content",
          "create_time",
          [
            Sequelize.literal(
              `(SELECT COUNT(id) FROM comment WHERE comment.belong_id = article.id AND type="article")`,
            ),
            "comment_count",
          ],
          [
            Sequelize.literal(
              `(SELECT COUNT(id) FROM likes WHERE likes.belong_id = article.id)`,
            ),
            "like_count",
          ],
        ],
        include: [
          {
            model: DB.User,
            as: "author_data",
            attributes: ["name"],
          },
          {
            model: DB.ArticleTag,
            as: "tag_article_list",
            attributes: ["tag_id"],
            include: [
              {
                model: DB.Tag,
                as: "tag_data",
                attributes: ["id", "name"],
              },
            ],
          },
        ],
        where: {
          id: articleId
            .filter((item) => item.type === "article")
            .map((item) => item.belong_id),
        },
      });

      // 格式化文章数据
      let formattedArticleList = articleList.map((article) => {
        let item: any = article.toJSON();
        let description = setDescription(item.content); // 生成描述
        let tag = item.tag_article_list.map((article_tag: any) => ({
          id: article_tag.tag_data.id,
          name: article_tag.tag_data.name,
        })); // 处理标签数据

        return {
          ...item,
          description,
          tag,
          tag_article_list: undefined, // 移除中间表数据
          content: undefined,
          cover_file_name: undefined,
        };
      });

      // 查询问题数据
      let problemList = await DB.Problem.findAll({
        attributes: [
          "id",
          "title",
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
        where: {
          id: articleId
            .filter((item) => item.type === "problem")
            .map((item) => item.belong_id),
        },
      });

      // 格式化问题数据
      let formattedProblemList = problemList.map((problem) => {
        let item: any = problem.toJSON();
        let tag = item.tag_problem_list.map((article_tag: any) => ({
          id: article_tag.tag_data.id,
          name: article_tag.tag_data.name,
        }));

        return {
          ...item,
          tag,
        };
      });

      // 查询收藏集作者信息
      let authorData = await DB.User.findByPk(favoritesData.user_id, {
        attributes: ["id", "name", "avatar_file_name", "avatar_url"],
      });

      // 返回结果
      ctx.body = {
        success: true,
        message: "查询收藏集对应的收藏文章、问题",
        data: {
          favorites_data: favoritesData,
          article_list: formattedArticleList,
          problem_list: formattedProblemList,
          author_data: authorData,
        },
      };
    } catch (err) {
      ctx.status = 500;
      ctx.body = { success: false, message: "查询失败" };
      console.error(err);
    }
  },
);

export default router;
