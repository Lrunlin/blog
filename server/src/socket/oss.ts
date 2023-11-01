import { Server } from "socket.io";
import { server } from "@/index";
import { folderList } from "@/common/utils/static/upload";
import bucketManager from "@/common/utils/static/utils/bucketManager";
import redis from "@/common/utils/redis";
import DB from "@/db";
import { load } from "cheerio";
import { Op } from "sequelize";
import { v4 } from "uuid";
import deleteFile from "@/common/utils/static/deleteFile";
import verify from "@/common/utils/jwt/verify";
import Cookie from "cookie";
import { createAdapter } from "@socket.io/cluster-adapter";
import { setupWorker } from "@socket.io/sticky";


function init() {
  redis.del("oss-key-code");
  redis.del("oss-key-last_time");
  redis.set(
    "oss-key-list",
    JSON.stringify(
      folderList.map(item => ({
        id: v4(),
        name: item.folder,
        oss_count: 0,
        database_count: 0,
        delete_count: 0,
      }))
    )
  );
}

const io = new Server(server, {
  path: "/oss",
  transports: ["websocket"],
  cors: {
    origin: [process.env.CLIENT_HOST],
    methods: ["GET", "POST"],
    credentials: true,
  },
});

if (process.env._pm2_version) {
  io.adapter(createAdapter());
  setupWorker(io);
}

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

io.use(async (socket, next) => {
  let cookie = Cookie.parse(socket.handshake.headers.cookie || "");
  let token = cookie.token;

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
io.on("connection", async socket => {
  if ((await redis.get("oss-key-list")) && (await redis.get("oss-key-last_time"))) {
    socket.emit("list", {
      time: await redis.get("oss-key-last_time"),
      data: JSON.parse((await redis.get("oss-key-list")) as string) as any[],
    });
  }

  let code = (await redis.get("oss-key-code")) as string;
  io.emit("info", {
    code,
    message:
      code == null
        ? "未开始"
        : +code == 0
        ? "数据对比任务失败"
        : +code == 1
        ? "数据对比任务执行成功"
        : "数据对比任务执行中",
    deleteCode: await redis.get("oss-key-delete_code"),
  });

  // 开始执行统计任务
  socket.on("start", async () => {
    init();
    await redis.set("oss-key-code", 2, "EX", 86400),
      io.emit("info", {
        code: 2,
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
      let list = JSON.parse((await redis.get("oss-key-list")) as string) as any[];
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

      await redis.set("oss-key-list", JSON.stringify(list));

      // 集体设置过期时间
      let keys = await redis.keys("imagelist-*");
      for (let key of keys) {
        await redis.expire(key, 97_200);
      }

      io.emit("message", { message: `比对完成` });

      await redis.set("oss-key-last_time", new Date() + "", "EX", 86400);
      socket.emit("list", {
        time: await redis.get("oss-key-last_time"),
        data: JSON.parse((await redis.get("oss-key-list")) as string) as any[],
      });
      await redis.set("oss-key-code", 1, "EX", 86400);
      io.emit("info", {
        code:1,
        message: "数据对比任务执行成功",
      });
    } catch (error) {
      console.log(error);
      let redisKeys = await redis.keys("imagelist-*");
      await redis.del(redisKeys);
      await redis.set("oss-key-code", 0, "EX", 86400);
      io.emit("info", {
        code: 0,
        message: "数据对比任务失败",
      });
      io.emit("message", { message: `数据对比任务失败` });
      init();
    }
  });

  // 删除
  socket.on("delete", async () => {
    if (
      +((await redis.get("oss-key-code")) as string) != 1 ||
      !(await redis.get("oss-key-last_time"))
    ) {
      return;
    }
    await redis.set("oss-key-delete_code", 2, "EX", 86400);
    io.emit("message", { message: `开始删除` });
    io.emit("delete-schedule", { code: await redis.get("oss-key-delete_code") });
    try {
      for (const item of JSON.parse((await redis.get("oss-key-list")) as string) as any[]) {
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
      await redis.set("oss-key-delete_code", 1, "EX", 86400);
      io.emit("delete-schedule", { code: await redis.get("oss-key-delete_code") });
      init();
      let redisKeys = await redis.keys("imagelist-*");
      await redis.del(redisKeys);
      io.emit("message", { message: `删除任务完成` });
    } catch (error) {
      console.log(error);
      await redis.set("oss-key-delete_code", 0, "EX", 86400);
      io.emit("delete-schedule", { code: await redis.get("oss-key-delete_code") });
      io.emit("message", { message: `删除失败` });
    }
  });
});
