const express = require('express');
const app = express();
const router = express.Router();
const pool = require('@/modules/pool');

router.put('/type/:type', global.auth, async (req, res) => {
    let type = req.params.type;//需要被修改类型
    let updataType = req.body.type;//新类型
    let sql = `UPDATE articletype SET type='${updataType}' WHERE type='${type}';`;
    let [rows] = await pool.query(sql);

    let isSuccess = !!rows.affectedRows;
    res.json({
        success: isSuccess,
        message: isSuccess ? '修改成功' : '修改失败'
    })

    //如果类型修改成功，就把使用到该类型的文章进行修改
    if (isSuccess) {
        let typeSql = `update article set type=REPLACE (type,'${type}','${updataType}') WHERE type like '%${type}%'`
        pool.query(typeSql);
    }
})
module.exports = router;

