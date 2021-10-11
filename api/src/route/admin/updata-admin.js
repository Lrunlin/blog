const express = require('express');
const app = express();
const router = express.Router();
const md5 = require('md5');
const pool = require("@/modules/pool");
const blackList = require('@/modules/auth').blackList;

router.put('/admin', global.auth, async (req, res) => {
    let password = req.body.password;
    const sql = `UPDATE admin SET password='${md5(password+'刘润霖')}' WHERE admin='${req.admin}';`
    const [data] = await pool.query(sql);
    let success = !!data.affectedRows;
    //将header加入黑名单
    if (success) {
        blackList.push(req.headers.authorization);
        setTimeout(() => {
            blackList = blackList.filter(item => item != req.headers.authorization);
            blackList.shift()
        }, 86400000);
    }

    res.json({
        success: success,
        message: success ? '修改成功' : '修改失败'
    });
})
module.exports = router;