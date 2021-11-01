const express = require('express');
const app = express();
const router = express.Router();
const cheerio = require('cheerio');
const axios = require('axios');
const path = require('path');

const fs = require('fs');
const hostname = 'https://segmentfault.com';

global.task = {}
let task = global.task;



router.post('/spider', global.auth, async (req, res) => {
    let data = [];
    let taskName = +new Date(); //本次抓取任务的名称
    let {
        type,
        number,
        noImage,
        isTime,
        keyword,
        disable
    } = req.body;
    let page = 1;
    const getPage = async () => {
        let href = []; //存储当前页面里面的文章链接
        await axios.get(`${hostname}/t/${type}/blogs?page=${page}`).then(response => {
            console.log(`${hostname}/t/${type}/blogs?page=${page}`);
            let $ = cheerio.load(response.data)
            // 获取链接

            $('.title.text-body').each((index, item) => {
                href.push(hostname + $(item).attr('href'))
            });

            if (page == 1) {
                const switechBoolean = (value) => value ? '是' : '否';
                let title = `是否不需要图片:${switechBoolean(noImage)},是否三年以内文章:${switechBoolean(isTime)},关键词:${keyword},禁用词:${disable}`
                // 设置task
                task[taskName] = {
                    timer: null,
                    message: title,
                    total: number
                }
                res.json({
                    success: true,
                    message: title
                });
            }
            page++;
        })
        return href;
    }

    function getArticleData() {
        getPage().then(res => {
            let hrefActive = 0;
            task[taskName].timer = setInterval(() => {
                if (hrefActive == res.length) {
                    clearInterval(task[taskName].timer)
                    getArticleData()
                    return false;
                }
                axios.get(res[hrefActive]).then(response => {
                    let $ = cheerio.load(response.data);

                    let _data = {
                        title: $('.text-body').text(),
                        article: $('article.article-content').html(),
                        time: $('time').attr('datetime'),
                        type: []
                    }
                    $('.badge-tag').each((index, item) => {
                        _data.type.push($(item).text())
                    })
                    let save = true;
                    if (noImage) {
                        if ($('article.article-content img').length) save = false;
                    }
                    if (isTime && save) {
                        if (Math.abs(+new Date(_data.time) - +new Date()) > (9.46707779 * (10 ** 10))) {
                            save = false
                        }
                    }
                    if (/^[\s\S]*.*[^\s][\s\S]*$/.test(keyword) && save) {
                        if (!$('article.article-content').text().includes(keyword)) save = false;
                    }

                    if (/^[\s\S]*.*[^\s][\s\S]*$/.test(disable) && save) {
                        if ($('article.article-content').text().includes(keyword)) save = false;
                    }
                    if (save) {
                        data.push(_data)
                        task[taskName].current = data.length;
                        if (data.length == number) {
                            //清除定时器并在任务中删除，编写文件
                            clearInterval(task[taskName].timer)
                            delete task[taskName].timer;
                            let filePath = path.resolve(`public/task/${taskName}.json`);
                            fs.writeFileSync(filePath, JSON.stringify({
                                option: task[taskName].message,
                                data: data
                            }))
                        }
                    }
                });
                hrefActive++
            }, 4000);
        })
    }
    getArticleData();
})
module.exports = router;