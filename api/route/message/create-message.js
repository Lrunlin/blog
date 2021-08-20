const express = require('express')
const app = express()
const router = express.Router()
let pool = require('../../modules/pool')
router.post('/message', async (req, res) => {
    const message = req.body.message;
    const sql = `INSERT INTO message ( id,message, time )
                       VALUES
                       ('${+new Date()}','${message}', NOW());
                       `
    const [rows] = await pool.query(sql);
    res.json({
        success: !!rows.affectedRows,
        message: `添加一个词条`,
    })
})
module.exports = router;