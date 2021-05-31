const express = require('express')
const app = express()
const router = express.Router()
let pool = require('../../modules/pool')
router.delete('/article/:router', (req, res) => {
    let router = req.params.router;
    (async () => {
        const [rows] = await pool.query(`DELETE FROM article WHERE router='${router}';`);
        if (rows.affectedRows) {
            res.json({
                success: true,
                message: `成功删除类型：${router}`,
            })
        } else {
            res.json({
                success: false,
                message: `SQL执行成功但删除失败，没有找到对应的router`,
            })
        }
    })();
})
module.exports = router;