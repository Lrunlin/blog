const express = require('express');
const app = express();
const router = express.Router();
const pool = require('@/modules/pool');

router.delete('/comment/:id', global.auth, async (req, res) => {
    let id = req.params.id;
    let sql = ` DELETE FROM comment WHERE id = '${id}';`;
    let [rows] = await pool.query(sql);
    // console.log(rows);
    let isSuccess = !!rows.affectedRows;
    res.json({
        success: isSuccess,
        message: isSuccess?'删除成功':'删除失败'
    })
})
module.exports = router;