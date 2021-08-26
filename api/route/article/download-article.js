const express = require('express')
const app = express()
const router = express.Router()
const {
    decode
} = require('js-base64');
let pool = require('../../modules/pool');
router.get('/download-article', async (req, res) => {
    const [row] = await pool.query(`select * from article where isShow=1;`);
    let data = row.map(item => {
        item.title = decode(item.title);
        item.introduce = decode(item.introduce);
        item.article = decode(item.article);
        return item;
    })

    res.json({
        success: !!row.length,
        data: `{
            "author":"刘润霖",
            "url":"https://blogweb.cn",
            "data":${JSON.stringify(data)},
        }`
    })
});
module.exports = router;