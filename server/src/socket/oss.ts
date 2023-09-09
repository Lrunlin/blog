import { Server } from "socket.io";
import { server } from "@/index";
import { folderList } from "@/common/utils/static/upload";
import bucketManager from "@/common/utils/static/utils/bucketManager";
import Redis from "@/common/utils/redis";
import DB from "@/db";
import { load } from "cheerio";
import { Op } from "sequelize";
import { v4 } from "uuid";
import deleteFile from "@/common/utils/static/deleteFile";
import verify from "@/common/utils/jwt/verify";

let redis = Redis();

let listTime: Date | null;
let list = folderList.map(item => ({
  id: v4(),
  name: item.folder,
  oss_count: 0,
  database_count: 0,
  delete_count: 0,
}));

function init() {
  listTime = null;
  list = folderList.map(item => ({
    id: v4(),
    name: item.folder,
    oss_count: 0,
    database_count: 0,
    delete_count: 0,
  }));
}

const io = new Server(server, {
  path: "/oss",
  cors: {
    origin: "*",
  },
});

async function getOSSList(prefix: string) {
  let ossMarkerCount = 0;
  // 记录页数
  let marker: string | undefined = undefined;

  while (true) {
    ossMarkerCount++;
    io.emit("message", { message: `OSS:抓取${prefix} 第${ossMarkerCount}` });

    let getList = new Promise((resolve, reject) => {
      bucketManager.listPrefix(
        process.env.OSS_NAME,
        {
          limit: 1000,
          prefix: `${prefix}/`,
          marker: marker,
        },
        function (err, respBody, respInfo) {
          if (err) {
            console.log(err);
            reject(err);
            return;
          }
          resolve({ items: respBody.items, marker: respBody.marker });
        }
      );
    });

    let result = (await getList) as { items: any[]; marker?: string };

    const pipeline = await redis.pipeline();
    for (const item of result.items) {
      let time = Math.floor(item.putTime / 10000);
      if (+new Date() - time > 2_592_000_000 /*30天*/) {
        let key = item.key.replace(`${prefix}/`, "");
        await pipeline.sadd(`imagelist-oss-${prefix}`, key);
      }
    }
    await pipeline.exec();

    if (!result.marker) {
      break;
    }

    marker = result.marker;
  }
  ossMarkerCount = 0;
}

// 里面函数递归会溢出，要使用while循环条件判断break
async function getDataBaseList() {
  // Article、Cover;
  async function getArticleCoverList() {
    let offset = 1;

    while (true) {
      io.emit("message", { message: `数据库:抓取Article、Cover 第${offset}` });

      const pipeline = await redis.pipeline();

      let rows = await DB.Article.findAll({
        attributes: ["content", "cover_file_name"],
        order: [["id", "desc"]],
        limit: 2000,
        offset: (offset - 1) * 2000,
        raw: true,
      });
      let valuesCover = rows
        .filter(item => item.cover_file_name)
        .map(item => item.cover_file_name!);
      pipeline.sadd(`imagelist-database-cover`, valuesCover);

      let valuesArticle = rows
        .map(item => {
          let $ = load(item.content);
          return $("body img")
            .map((i, el) => $(el).attr("src"))
            .get();
        })
        .flat();
      pipeline.sadd(`imagelist-database-article`, valuesArticle);
      await pipeline.exec();

      if (rows.length < 2000) break;
      offset++;
    }
  }

  //Comment
  async function getCommentList() {
    let offset = 1;

    while (true) {
      io.emit("message", { message: `数据库:抓取Comment 第${offset}` });

      const pipeline = await redis.pipeline();

      const rows = await DB.Comment.findAll({
        attributes: ["comment_pics"],
        where: { comment_pics: { [Op.not]: null } as any },
        raw: true,
        limit: 2000,
        offset: (offset - 1) * 2000,
      });

      let values = rows.map(item => item.comment_pics!);

      pipeline.sadd(`imagelist-database-comment`, values);

      await pipeline.exec();

      if (rows.length < 2000) break;

      offset++;
    }
  }

  //User
  async function getUserAvatarList() {
    let offset = 1;

    while (true) {
      io.emit("message", { message: `数据库:Avatar 第${offset}` });

      const pipeline = await redis.pipeline();

      const rows = await DB.User.findAll({
        raw: true,
        limit: 2000,
        offset: (offset - 1) * 2000,
        attributes: ["avatar_file_name"],
      });

      let values = rows.map(item => item.avatar_file_name);

      pipeline.sadd(`imagelist-database-avatar`, values);

      await pipeline.exec();

      if (rows.length < 2000) break;

      offset++;
    }
  }

  //Answer
  async function getAnswerList() {
    let offset = 1;

    while (true) {
      io.emit("message", { message: `数据库:Answer 第${offset}` });

      const pipeline = await redis.pipeline();

      const rows = await DB.Answer.findAll({
        attributes: ["content"],
        order: [["id", "desc"]],
        limit: 2000,
        offset: (offset - 1) * 2000,
        raw: true,
      });

      let values = rows
        .map(item => {
          let $ = load(item.content);
          return $("body img")
            .map((i, el) => $(el).attr("src"))
            .get();
        })
        .flat();
      pipeline.sadd(`imagelist-database-answer`, values);

      await pipeline.exec();

      if (rows.length < 2000) break;

      offset++;
    }
  }

  //Problem
  async function getProblemList() {
    let offset = 1;

    while (true) {
      io.emit("message", { message: `数据库:Problem 第${offset}` });

      const pipeline = await redis.pipeline();

      const rows = await DB.Problem.findAll({
        attributes: ["content"],
        order: [["id", "desc"]],
        limit: 2000,
        offset: (offset - 1) * 2000,
        raw: true,
      });

      let values = rows
        .map(item => {
          let $ = load(item.content);
          return $("body img")
            .map((i, el) => $(el).attr("src"))
            .get();
        })
        .flat();
      pipeline.sadd(`imagelist-database-problem`, values);

      await pipeline.exec();

      if (rows.length < 2000) break;

      offset++;
    }
  }

  //Advertisement
  async function getAdvertisementList() {
    let offset = 1;

    while (true) {
      io.emit("message", { message: `数据库:Advertisement 第${offset}` });

      const pipeline = await redis.pipeline();

      const rows = await DB.Advertisement.findAll({
        attributes: ["poster_file_name"],
        raw: true,
        limit: 2000,
        offset: (offset - 1) * 2000,
      });

      let values = rows.map(item => item.poster_file_name);

      pipeline.sadd(`imagelist-database-advertisement`, values);

      await pipeline.exec();

      if (rows.length < 2000) break;

      offset++;
    }
  }

  //Link
  async function getLinkList() {
    let offset = 1;

    while (true) {
      io.emit("message", { message: `数据库:Link 第${offset}` });

      const pipeline = await redis.pipeline();

      const rows = await DB.FriendlyLink.findAll({
        attributes: ["logo_file_name"],
        raw: true,
        limit: 2000,
        offset: (offset - 1) * 2000,
      });

      let values = rows.map(item => item.logo_file_name);
      pipeline.sadd(`imagelist-database-friendly-link`, values);

      await pipeline.exec();

      if (rows.length < 2000) break;

      offset++;
    }
  }

  //Type Tag
  async function getTypeTagList() {
    let offset = 1;

    while (true) {
      io.emit("message", { message: `数据库:Type、Tag 第${offset}` });

      const pipeline = await redis.pipeline();

      const typeRows = await DB.Type.findAll({
        attributes: ["icon_file_name"],
        raw: true,
        limit: 2000,
        offset: (offset - 1) * 2000,
      });

      const tagRows = await DB.Tag.findAll({
        attributes: ["icon_file_name"],
        raw: true,
        limit: 2000,
        offset: (offset - 1) * 2000,
      });

      for (const item of [...typeRows, ...tagRows]) {
        pipeline.sadd(`imagelist-database-type`, item.icon_file_name as string);
      }

      await pipeline.exec();

      if (typeRows.length < 2000 && tagRows.length < 2000) {
        break;
      }

      offset++;
    }
  }

  await getArticleCoverList();
  await getCommentList();
  await getUserAvatarList();
  await getAnswerList();
  await getProblemList();
  await getAdvertisementList();
  await getLinkList();
  await getTypeTagList();
}

io.disconnectSockets();
let code: null | 0 | 1 | 2 = null; //null没有任务  0 失败 1成功 2执行中
let deleteCode: null | 0 | 1 | 2 = null; //null没有任务 0 失败 1成功 2执行中

io.use(async (socket, next) => {
  let token = socket.handshake.headers.authorization;
  if (token) {
    verify(token)
      .then(decode => {
        if (decode.auth == 1) {
          next();
        }
      })
      .catch(() => {
        socket.emit("sign-out");
      });
  } else {
    socket.emit("sign-out");
  }
});
io.on("connection", socket => {
  if (list && listTime) {
    socket.emit("list", { time: listTime, data: list });
  }
  io.emit("info", {
    code,
    message:
      code == null
        ? "未开始"
        : code == 0
        ? "数据对比任务失败"
        : code == 1
        ? "数据对比任务执行成功"
        : "数据对比任务执行中",
    deleteCode,
  });

  // 开始执行统计任务
  socket.on("start", async () => {
    init();
    code = 2;
    io.emit("info", {
      code,
      message: "数据对比任务执行中",
    });
    try {
      let redisKeys = await redis.keys("imagelist-*");
      if (redisKeys.length) {
        await redis.del(redisKeys);
      }
      // 获取数据阶段
      for (let index = 0; index < folderList.length; index++) {
        const folder = folderList[index].folder;
        await getOSSList(folder);
      }
      await getDataBaseList();

      // 获取完成 开始比对oss_count、database_count、delete_count;
      io.emit("message", { message: `开始比对并统计数量` });
      for (const item of folderList) {
        let folder = item.folder;
        if (await redis.exists(`imagelist-oss-${folder}`)) {
          const length = await redis.scard(`imagelist-oss-${folder}`);
          list.find(item => item.name == folder)!.oss_count = length;
        }
        if (await redis.exists(`imagelist-database-${folder}`)) {
          const length = await redis.scard(`imagelist-database-${folder}`);
          list.find(item => item.name == folder)!.database_count = length;
        }
      }
      for (const item of list) {
        if (item.oss_count) {
          list.find(_item => _item.name == item.name)!.delete_count = (
            await redis.sdiff(`imagelist-oss-${item.name}`, `imagelist-database-${item.name}`)
          ).length;
        }
      }

      // 集体设置过期时间
      let keys = await redis.keys("imagelist-*");
      for (let key of keys) {
        await redis.expire(key, 97_200);
      }

      io.emit("message", { message: `比对完成` });

      listTime = new Date();
      socket.emit("list", { time: listTime, data: list });
      code = 1;
      io.emit("info", {
        code,
        message: "数据对比任务执行成功",
      });
      setTimeout(() => {
        init();
      }, 86_400_000);
    } catch (error) {
      console.log(error);
      let redisKeys = await redis.keys("imagelist-*");
      await redis.del(redisKeys);
      code = 0;
      io.emit("info", {
        code,
        message: "数据对比任务失败",
      });
      io.emit("message", { message: `数据对比任务失败` });
      init();
    }
  });

  // 删除
  socket.on("delete", async () => {
    if (code != 1 || !listTime) {
      return;
    }
    deleteCode = 2;
    io.emit("message", { message: `开始删除` });
    io.emit("delete-schedule", { code: deleteCode });
    try {
      for (const item of list) {
        let keys = await redis.sdiff(
          `imagelist-oss-${item.name}`,
          `imagelist-database-${item.name}`
        );

        for (let index = 0; index < Math.ceil(keys.length / 1000); index++) {
          let list = keys.slice(index * 1000, (index + 1) * 1000).map(el => `${item.name}/${el}`);
          await deleteFile(list);
          io.emit("message", { message: `删除:开始 删除 ${item.name} ${index + 1}` });
        }
      }
      deleteCode = 1;
      io.emit("delete-schedule", { code: deleteCode });
      init();
      let redisKeys = await redis.keys("imagelist-*");
      await redis.del(redisKeys);
      io.emit("message", { message: `删除任务完成` });
    } catch (error) {
      console.log(error);
      deleteCode = 0;
      io.emit("delete-schedule", { code: deleteCode });
      io.emit("message", { message: `删除失败` });
    }
  });
});
