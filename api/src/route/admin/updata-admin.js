const express = require('express');
const app = express();
const router = express.Router();
const md5 = require('md5');
const pool = require("@/modules/pool");


router.put('/admin/:admin', global.auth, async (req, res) => {
    let admin = req.params.admin;
    let password = req.body.password;
    const sql = `UPDATE admin SET password='${md5(password+'刘润霖')}' WHERE admin='${admin}';`
    const [data] = await pool.query(sql)
    let success = !!data.affectedRows;
    res.json({
        success: success,
        message: success ? '修改成功' : '修改失败'
    });
})
module.exports = router;