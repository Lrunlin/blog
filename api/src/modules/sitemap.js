const cheerio = require('cheerio');
const pool = require("@/modules/pool");
const fs = require('fs');
const moment = require('moment');
const path = require('path');
let filePath = `public/sitemap.xml`;

const header = `<?xml version="1.0" encoding="UTF-8"?>
<urlset
    xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
       http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd"
>`
const footer = `\n</urlset>`

async function siteMap() {
    let body = '';

    let list = [{
        href: '',
        priority: '1'
    }, {
        href: 'rss',
        priority: '0.8'
    }, {
        href: 'search',
        priority: '0.8'
    }, {
        href: 'about',
        priority: '0.8'
    }];
    let [data] = await pool.query(`select router from article;`);
    data.forEach(item => {
        list.push({
            href: `article/${item.router}`,
            priority: '0.7'
        })
    })
    list.forEach(item => {
        body += `
<url>
 <loc>https://blogweb.cn/${item.href}</loc>
 <priority>${item.priority}</priority>
 <lastmod>${moment().format('YYYY-MM-DD')}</lastmod>
 <changefreq>weekly</changefreq>
</url>`;
    })
    fs.writeFileSync(filePath, header + body + footer);
}
siteMap()
setInterval(() => {
    siteMap()
}, 10800000);
// 3小时