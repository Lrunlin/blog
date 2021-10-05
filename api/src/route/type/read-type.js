const express = require('express');
const app = express();
const router = express.Router();
const pool = require('@/modules/pool')

router.get('/type', async (req, res) => {
    const key = req.query.key;
    const [data] = await pool.query(`select ${key?key.join(','):'*'} from articletype;`)
    res.json({
        success: true,
        data: data
    })
})
module.exports = router;