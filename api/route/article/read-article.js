const express = require('express')
const app = express()
const router = express.Router()
const {decode}=require('js-base64');
// router111
let pool = require('../../modules/pool')
router.get('/article(/:router)?', async (req, res) => {
    // /article和/article:router都接收
    let key = req.query.key ? req.query.key : "*";
    let router = req.params.router;
    const sql = `select ${key} from article ${router?`where router='${router}'`:''} ORDER BY time DESC;`
    const [rows] = await pool.query(sql);
    let needDecode = ['title', 'article', 'introduce']
    let data = rows.map(item => {
        Object.keys(item).forEach(el => {
            if (needDecode.includes(el)) item[el] = decode(item[el])
        })
        return item;
    });
    res.json({
        success: true,
        message: `查询${router?`${router}`:'所有文章'}的${key!='*'?`的${key}`:'所有信息'}（降序）`,
        data: data,
    })
});
module.exports = router;