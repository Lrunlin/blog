import Router from "@koa/router";
import DB from "@/db";
import { Op, and } from "sequelize";
import Sequelize from "@/db/config";
import getUserId from "@/common/middleware/auth/getUserId";
import setExternalLink from "@/common/modules/article/get/external-link";
import imgPrefix from "@/common/modules/article/get/img-add-prefix";
import getCodeBlockLanguage from "@/common/modules/article/get/set-code-block-language";
import setDescription from "@/common/modules/article/get/set-description";
import getTitleId from "@/common/modules/article/get/set-title-id";
import interger from "@/common/verify/integer";

let router = new Router();

router.get("/article/:id", interger([], ["id"]), getUserId, async (ctx) => {
  let id = +ctx.params.id;

  try {
    // 联表查询文章数据
    const article = await DB.Article.findOne({
      where: { id },
      include: [
        {
          model: DB.User,
          as: "author_data",
          attributes: ["id", "name", "auth", "avatar_file_name", "avatar_url"],
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
      attributes: {
        include: [
          [
            Sequelize.literal(
              `(SELECT COUNT(id) FROM comment WHERE comment.belong_id = article.id and type="article")`,
            ),
            "comment_count",
          ],
          [
            Sequelize.literal(
              `(SELECT COUNT(DISTINCT user_id) FROM collection WHERE collection.belong_id = article.id)`,
            ),
            "collection_count",
          ],
          [
            Sequelize.literal(
              `(SELECT GROUP_CONCAT(favorites_id) FROM collection WHERE collection.user_id = ${ctx.id || -1} and belong_id = ${id})`,
            ),
            "collection_state",
          ],
          [
            Sequelize.literal(
              `(SELECT COUNT(id) FROM likes WHERE likes.belong_id = article.id)`,
            ),
            "like_count",
          ],
          [
            Sequelize.literal(
              `(SELECT COUNT(id) FROM likes WHERE likes.user_id = ${
                ctx.id || -1
              } and belong_id=${id})`,
            ),
            "like_state",
          ],
        ],
      },
    });

    if (article) {
      let data: any = article.toJSON();

      // 如果没有传递 update 参数，则生成标题ID、代码块语言等信息
      if (!ctx.query.update) {
        data = { ...data, ...getTitleId(data.content) };
        data = { ...data, ...getCodeBlockLanguage(data.content) };

        // 设置文章描述、标签和图片链接
        let description = setDescription(data.content);

        if (data.collection_state) {
          data.collection_state = data.collection_state.split(",").map(Number); // 转换为数组，且确保每个元素为数字
        }

        let tag = data.tag_article_list.map((article_tag: any) => ({
          id: article_tag.tag_data.id,
          name: article_tag.tag_data.name,
        }));

        // 处理内容中的图片和外部链接
        data = {
          ...data,
          description,
          tag,
          content: imgPrefix(data.content, "article", data.title),
          tag_article_list: undefined,
        };

        data.content = setExternalLink(data.content); // 设置外部链接
      } else {
        let tag = data.tag_article_list.map(
          (article_tag: any) => article_tag.tag_data.id,
        );
        data = {
          ...data,
          tag,
          content: imgPrefix(data.content, "article"),
          tag_article_list: undefined,
        };
      }

      ctx.body = { success: true, message: "查询成功", data };
    } else {
      ctx.status = 404;
      ctx.body = { success: false, message: "没有找到对应的文章", data: [] };
    }
  } catch (err) {
    ctx.status = 500;
    ctx.body = { success: false, message: "查询失败" };
    console.log(err);
  }
});

export default router;
