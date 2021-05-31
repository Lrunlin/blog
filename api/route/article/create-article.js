const express = require('express')
const app = express()
const router = express.Router()
let pool = require('../../modules/pool')
router.post('/article', (req, res) => {
    let params = req.body;
    (async () => {
        const sql = `
                INSERT INTO article(router, type,title, introduce, article, isTop, isShow, time)
        VALUES
            ('${params.router}', '${params.type}','${params.title}', '${params.introduce}', '${params.article}', ${params.isTop}, ${params.isShow}, NOW());
                `
        const [rows] = await pool.execute(sql);
        if (rows) {
            res.json({
                success: true,
                message: '添加文章成功',
            })
        }
    })()
})
module.exports = router;