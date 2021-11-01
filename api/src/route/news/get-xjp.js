/*
todo 获取学习强国数据
from:github.com/fuck-xuexiqiangguo
api:www.xuexi.cn/lgdata/1crqb964p71.json 
*/
const express = require('express');
const app = express();
const router = express.Router();
const axios = require('axios');
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer')



router.get('/xjp', async (req, res) => {
    let i = 0;
    axios.get('https://www.xuexi.cn/lgdata/1crqb964p71.json').then(async (response) => {
        let filePath = path.resolve(`public/rubbish-dump.json`);
        if (response.data.length > 300) {
            const browser = await puppeteer.launch({
                headless: false,
                defaultViewport: {
                    width: 1200,
                    height: 800,
                },
            });

            const page = await browser.newPage();

            for (let index = 0; index < response.data.length; index++) {
                await page.goto(response.data[index].url, {
                    timeout: 10000 * 60,
                });
                await page.waitForSelector('.render-detail-content');
                let text =
                    await page.$$eval(".render-detail-content", el => {
                        return el.map(item => item.innerText)
                    });
                response.data[index].introduce = text.join('');
                i++
                console.log(i + response.data[index].url);
                if (index == 300) {
                    fs.writeFileSync(filePath, JSON.stringify({
                        data: response.data
                    }))
                    res.json({
                        success: true
                    });
                    return false;
                }
            }


        } else {
            res.json({
                success: false
            })
        }

    });
})
module.exports = router;