const express = require('express');
const app = express();
const router = express.Router();
let pool = require('@/modules/pool')

router.delete('/type/:type', global.auth, async (req, res) => {
    let type = req.params.type;
    const sql = `DELETE FROM articletype WHERE type='${type}';`
    const [data] = await pool.query(sql);
    let success = !!data.affectedRows;
    res.json({
        success: success,
        message: success ? `成功删除类型:${type}` : '删除失败'
    })
});
module.exports = router;