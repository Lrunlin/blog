const express = require('express')
const app = express()
const router = express.Router()
let pool = require('../../modules/pool')
let email = require('../../modules/massDistribution');
let {
    decode
} = require('js-base64');
router.post('/article', async (req, res) => {
    let params = req.body;
    const sql = `
                INSERT INTO article(router, type,title, introduce, article, isTop, isShow, time)
        VALUES
            ('${params.router}', '${params.type}','${params.title}', '${params.introduce}', '${params.article}', ${params.isTop}, ${params.isShow}, NOW());
                `
    try {
        const [rows] = await pool.execute(sql);
        res.json({
            success: true,
            message: '添加文章成功',
        })
    } catch {
        res.json({
            success: false,
            message: '添加失败，请检查路由是否重复'
        })
    }
    email({
        title: decode(params.title),
        introduce: decode(params.introduce),
        router: params.router
    })

})
module.exports = router;