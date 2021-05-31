const express = require('express')
const app = express()
const router = express.Router()
let pool = require('../../modules/pool')
router.post('/type', (req, res) => {
    let type = req.body.type;
    (async () => {
        const [rows] = await pool.execute(`INSERT INTO articletype ( type, time )
                           VALUES
                           ( '${type}', NOW() );
        `);
        if (rows) {
            res.json({
                success: true,
                message: '用户添加文章类型',
            })
        }
    })()
})
module.exports = router;