const express = require('express');
const app = express();
const router = express.Router();
const pool = require("@/modules/pool");
router.delete('/article/:router', global.auth, async (req, res) => {
    let {
        router
    } = req.params;
    let [data] = await pool.query(`DELETE FROM article WHERE router='${router}';`)
    let success = !!data.affectedRows
    res.json({
        success: success,
        message: success ? `成功删除文章:${router}` : '删除失败'
    })
})
module.exports = router;