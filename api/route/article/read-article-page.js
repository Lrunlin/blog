const express = require('express')
const app = express()
const router = express.Router()
// router111
let pool = require('../../modules/pool')
router.get('/article-page/:page', async (req, res) => {
    let key = req.query.key ? req.query.key : "*";
    let page = req.params.page;
    let sql = `select ${key} from article WHERE isShow=1 ORDER BY time DESC LIMIT ${(page-1)*10},${page*10};`
    const [rows] = await pool.query(sql);
    // console.log(`查询${(page-1)*10},${page*10}/一共${rows.length}个`);
    res.json({
        success: true,
        message: `分页查询${key!='*'?`的${key}`:'所有信息'}（降序）`,
        data: rows
    })
})
module.exports = router;