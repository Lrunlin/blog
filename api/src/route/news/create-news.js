const express = require('express');
const app = express();
const router = express.Router();
const cheerio = require('cheerio');
const axios = require('axios');
const md5 = require('md5');
const fs = require('fs');
const path = require('path');

router.post('/news/web', async (req, res) => {
    let filePath = path.resolve(`public/new.json`);

    let page = 1;
    let data = [];
    async function getNewData() {
        let pageData = await axios.post('https://api.apiopen.top/getWangYiNews', {
            page: page
        });
        pageData.data.result.forEach(async (item) => {
            let newHtml = await axios.get(item.path);
            const $ = cheerio.load(newHtml.data);
            item.html = $('.post_body').html();
            item.introduce = $('.post_body').text().substring(0, 200);
            item.path = md5(+new Date() + '' + Math.random());
            data.push(item)
        });
        if (data.length > 100) {
            fs.writeFileSync(filePath, JSON.stringify({
                data: data
            }))
            return false;
        }
        page++;
        getNewData();
    };
    getNewData();
})
module.exports = router;