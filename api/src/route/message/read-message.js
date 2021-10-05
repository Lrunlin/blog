const express = require('express');
const app = express();
const router = express.Router();
const pool = require("@/modules/pool");
const decode = require('js-base64').decode
router.get('/message', global.auth, async (req, res) => {
    const [data] = await pool.query(`select * from message;`);
    data.map(item => {
        item.content = decode(item.content)
        item.contact = decode(item.contact)
        return item;
    })
    res.json({
        success: true,
        message: '查询全部留言',
        data: data
    })
})
module.exports = router;
// CREATE TABLE IF NOT EXISTS `message`(
//    `id` VARCHAR(50) NOT NULL,
//    `content` TEXT NOT NULL,
//    `contact` VARCHAR(200) NOT NULL,
//    `address` VARCHAR(200) NOT NULL,
//    `time` DATETIME,
//    PRIMARY KEY ( `id` )
// )ENGINE=InnoDB DEFAULT CHARSET=utf8;