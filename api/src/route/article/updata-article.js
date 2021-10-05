const express = require('express');
const app = express();
const router = express.Router();
const pool = require("@/modules/pool");
const encode = require('js-base64').encode;
router.put('/article/:router', global.auth, async (req, res) => {
    let originalRouter = req.params.router;
    let {
        router,
        type,
        introduce,
        article,
        isTop,
        isShow,
        time,
        title
    } = req.body;
    const sql = `UPDATE article SET 
    router='${router}',type='${type}',
    introduce='${encode(introduce)}',article='${encode(article)}',
    isTop=${isTop},isShow=${isShow},
    time='${time}',title='${encode(title)}'
    WHERE router='${originalRouter}';`
    const [data] = await pool.query(sql);
    let success = !!data.affectedRows;
    res.json({
        success: success,
        message: success ? '修改成功' : '修改失败，请检查！'
    })
})
module.exports = router;