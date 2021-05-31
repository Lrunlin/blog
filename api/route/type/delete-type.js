const express = require('express')
const app = express()
const router = express.Router()
let pool = require('../../modules/pool')
router.delete('/type/:type', (req, res) => {
    let type = req.params.type;
    (async () => {
        const [rows] = await pool.query(`DELETE FROM articletype WHERE type='${type}';`);
        console.log(rows);
        if (rows.affectedRows) {
            res.json({
                success: true,
                message: `成功删除类型：${type}`,
            })
        } else {
            res.json({
                success: false,
                message: `SQL执行成功但删除失败，没有找到对应的type`,
            })
        }
    })();
})
module.exports = router;