import Router from '@koa/router';
import DB from '@/db';
let router = new Router();

router.get("/author-ranking", async ctx => {
    
  ctx.body = { data: await DB.User.findAll() };
});
export default router;