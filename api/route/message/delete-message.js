const express = require('express')
const app = express()
const router = express.Router()
let pool = require('../../modules/pool')
router.delete('/message/:id', async (req, res) => {
    const id = req.params.id;
    const sql = ` DELETE FROM message WHERE id='${id}';`
    const [rows] = await pool.query(sql);
    res.json({
        success: !!rows.affectedRows,
        message: `删除指定的词条`,
        data: rows
    })
})
module.exports = router;