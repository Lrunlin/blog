/*author:谭玉美*/

const express = require('express');
const app = express();
const router = express.Router();
const fs = require('fs');
router.delete('/log/date/:date', global.auth, async (req, res) => {
    let {
        date
    } = req.params;
    let filePath = `public/log/${date}.json`;
    let result = await fs.unlink(filePath, function (err) {
        if (err) {
            res.json({
                success: false,
                message: '删除失败'
            })
        } else {
            res.json({
                success: true,
                message: '删除成功'
            })
        }
    })

})
module.exports = router;