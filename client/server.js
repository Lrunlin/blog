const express = require('express');
const next = require('next');
const LRUCache = require('lru-cache');

const port = 5678; //端口
const isDev = process.env.NEXT_PUBLIC_ENV === 'development';
const app = next({
    dev: isDev
});

// nextjs原生请求处理函数
const handle = app.getRequestHandler();

// 缓存工具初始化
const ssrCache = new LRUCache({
    max: 100,
    ttl: 1 * 60 * 60 * 1000, // 1小时缓存
});

//渲染和处理缓存
function renderAndCache(req, res) {
    let pagePath = req.path;
    let queryParams = req.query;
    const key = req.url;
    // 如果缓存中有直出的html数据，就直接将缓存内容响应给客户端
    if (ssrCache.has(key)) {
        res.send(ssrCache.get(key));
        return
    }
    // 如果没有当前缓存，调用renderToHTML生成直出html
    app.renderToHTML(req, res, pagePath, queryParams)
        .then((html) => {
            if (res.statusCode === 200) {
                // 使用缓存工具将html存放
                ssrCache.set(key, html);
            } else {
                ssrCache.delete(key);
            }
            // 响应直出内容
            res.send(html);
        })
        .catch((err) => {
            app.renderError(err, req, res, pagePath, queryParams)
        })
}
async function main() {
    await app.prepare(); //准备(初始化)

    const server = express();
    server.listen(port, (err) => {
        if (err) throw err;
        console.log(`>开始运行于： http://localhost:${port}`);
    });

    //对哪些页面进行缓存
    server.get('/article/*', (req, res) => renderAndCache(req, res));
    server.get('*', (req, res) => handle(req, res));
}
main()