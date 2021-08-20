const express = require('express')
const app = express()
const router = express.Router();
const {
    decode
} = require('js-base64');
let pool = require('../../modules/pool')
router.get('/article-page/:page', async (req, res) => {
    let key = req.query.key ? req.query.key : "*";
    let page = req.params.page;
    let sql = `select ${key} from article WHERE isShow=1 ORDER BY time DESC LIMIT ${(page-1)*10},10;`
    // 分页查询从XX索引值开始，向后偏移10条
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
        message: `分页查询${key!='*'?`的${key}`:'所有信息'}（降序）`,
        data: data
    })
})
module.exports = router;