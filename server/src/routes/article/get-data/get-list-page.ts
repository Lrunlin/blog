import Router from "@koa/router";
import DB from "@/db";
import qs from "qs";
import { Op, Sequelize } from "sequelize";
import auth from "@/common/middleware/auth";
import interger from "@/common/verify/integer";

let router = new Router();

/** 管理系统文章分页搜索 */
router.get(
  "/article/page/:page",
  interger([], ["page"]),
  auth(),
  async (ctx) => {
    let page = +ctx.params.page;

    // 解析查询参数
    let query = qs.parse(ctx.querystring);

    let pageSize = query.page_size ? +query.page_size : 10;
    let where: { [key: string]: any } = {};

    // 根据查询条件构建 `where` 查询条件
    if (query.id) {
      where.id = +query.id;
    }

    if (query.deadline) {
      where.create_time = {
        [Op.gte]: new Date(query.deadline as any),
      };
    }

    if (query.article_id) {
      where.id = (query.article_id as string).replace(/ /g, "");
    }

    if (query.author_id) {
      where.author = query.author_id;
    }

    if (query.only_original == "true") {
      where.reprint = {
        [Op.is]: null,
      };
    }

    try {
      // 执行分页查询
      const { count, rows } = await DB.Article.findAndCountAll({
        where: where,
        offset: (page - 1) * pageSize, // 分页偏移量
        limit: pageSize, // 每页显示条数
        include: [
          {
            model: DB.User,
            as: "author_data",
            attributes: [
              "id",
              "name",
              "auth",
              "avatar_file_name",
              "avatar_url",
            ],
          },
          {
            model: DB.ArticleTag, // 通过中间表关联标签
            as: "tag_article_list",
            attributes: ["tag_id"],
            where: query.tag_id
              ? { id: query.tag_id } // 根据标签ID进行筛选
              : {},
            include: [
              {
                model: DB.Tag,
                as: "tag_data", // 获取 Tag 表中的数据
                attributes: ["id", "name"], // 获取标签的 id 和 name
              },
            ],
          },
        ],
        attributes: {
          exclude: ["author"], // 排除不需要的字段
        },
        order: [
          (query?.sort as [string, string] | undefined) || [
            "create_time",
            "desc",
          ], // 排序条件
        ],
      });

      // 处理返回数据
      const articleList = rows.map((item) => {
        let data: any = item.toJSON();
        // 获取标签信息
        const tag = data.tag_article_list.map((article_tag: any) => ({
          id: article_tag.tag_data.id,
          name: article_tag.tag_data.name,
        }));

        // 返回文章列表（不返回文章内容）
        return {
          ...data,
          content: undefined,
          tag_article_list: undefined,
          tag, // 添加标签信息
        };
      });

      // 返回结果
      ctx.body = {
        success: true,
        message: `分页查询成功，第${page}页，每页${pageSize}条数据`,
        data: {
          page,
          page_size: pageSize,
          total_count: count,
          list: articleList,
        },
      };
    } catch (err) {
      console.log(err);
      ctx.status = 500;
      ctx.body = { success: false, message: "查询失败" };
    }
  },
);

export default router;
