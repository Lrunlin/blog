import Router from "@koa/router";
import DB from "@/db";
import Sequelize from "@/db/config";
import setDescription from "@/common/modules/article/get/set-description";
import integer from "@/common/verify/integer";

let router = new Router();

// 查询指定用户收藏的文章
router.get("/collection/:user_id", integer([], ["user_id"]), async (ctx) => {
  let page = +(ctx.query.page as string) || 1;

  try {
    // 查询用户收藏的文章 ID
    let { count: collectionCount, rows: collectionList } =
      await DB.Collection.findAndCountAll({
        where: { user_id: ctx.params.user_id },
        offset: (page - 1) * 10,
        limit: 10,
        attributes: ["belong_id"],
        order: [["create_time", "desc"]],
      });

    // 查询对应文章信息
    let articles = await DB.Article.findAll({
      where: { id: collectionList.map((item) => item.toJSON().belong_id) },
      include: [
        {
          model: DB.User,
          as: "author_data",
          attributes: ["name"],
        },
        {
          model: DB.ArticleTag, // 中间表
          as: "tag_article_list",
          attributes: ["tag_id"], // 关联获取标签ID
          include: [
            {
              model: DB.Tag,
              as: "tag_data", // 实际标签数据
              attributes: ["id", "name"], // 只获取ID和名称
            },
          ],
        },
      ],
      attributes: [
        "id",
        "title",
        "cover_file_name",
        "cover_url",
        "state",
        "description",
        "content",
        "create_time",
        "view_count",
        "update_time",
        [
          Sequelize.literal(
            `(SELECT COUNT(*) FROM comment WHERE comment.belong_id = article.id AND type="article")`,
          ),
          "comment_count",
        ],
        [
          Sequelize.literal(
            `(SELECT COUNT(*) FROM likes WHERE likes.belong_id = article.id)`,
          ),
          "like_count",
        ],
      ],
    });

    // 处理返回数据
    ctx.body = {
      success: true,
      message: "查询指定用户的文章收藏列表",
      data: {
        total: collectionCount,
        list: articles.map((article) => {
          let item: any = article.toJSON();
          let description = setDescription(item.content); // 设置描述
          let tag = item.tag_article_list.map((article_tag: any) => ({
            id: article_tag.tag_data.id,
            name: article_tag.tag_data.name,
          })); // 格式化标签数据

          return {
            ...item,
            description,
            tag, // 替换为处理后的标签
            tag_article_list: undefined, // 移除中间表数据
            content: undefined, // 不返回内容
          };
        }),
      },
    };
  } catch (err) {
    ctx.body = { success: false, message: "查询失败" };
    console.error(err);
  }
});

export default router;
