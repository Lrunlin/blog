/*author:田蕤实*/
const express = require('express');
const app = express();
const router = express.Router();
const pool = require("@/modules/pool");

router.delete('/message/:id', global.auth, async (req, res) => {
    let id = req.params.id;
    let sql = `DELETE FROM message WHERE id='${id}';`
    const [data] = await pool.query(sql);
    let success = !!data.affectedRows;
    
    res.json({
        success: success,
        message: success ? '删除成功' : '删除失败'
    })
})
module.exports = router;