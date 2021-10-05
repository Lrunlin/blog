const express = require('express');
const app = express();
const router = express.Router();
let pool = require('@/modules/pool')

router.post('/type', global.auth, async (req, res) => {
    let type = req.body.type;
    const sql = `INSERT INTO articletype ( type, time )
                       VALUES
                       ('${type}',NOW());`
    try {
        const [data] = await pool.query(sql);
        res.json({
            success: !!data.affectedRows,
            message: !!data.affectedRows ?"创建成功":'创建失败'
        })
    } catch (error) {
        res.json({
            success: false,
            message: "创建失败"
        })
    }
})
module.exports = router;