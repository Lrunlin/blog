const express = require('express');
const app = express();
const router = express.Router();
const encode = require('js-base64').encode;
const pool = require("@/modules/pool");

router.post('/article', global.auth, async (req, res) => {
    let {
        router,
        type,
        introduce,
        article,
        isTop,
        isShow,
        title
    } = req.body;
    const sql = `
    INSERT INTO article(router, type, introduce, article, isTop, isShow, title,time)
     VALUES('${router}', '${type.join(',')}', '${encode(introduce)}', '${encode(article)}',${isTop},${isShow},'${encode(title)}',NOW());
     `;
    try {
        const [data] = await pool.query(sql);
        res.json({
            success: true,
            message: '添加成功'
        })

    } catch (error) {
        res.json({
            success: false,
            message: '添加失败'
        })
    }
})
module.exports = router;