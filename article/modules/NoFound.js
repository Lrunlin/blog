function NoFound(data) {
    let html=`
    <!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="renderer" content="webkit">
    <meta name="copyright" content="LiuRunLin网站的404页面">
    <meta name="keywords" content="404，并没有找到文件">
    <meta name="description" content="404没有此网站">
    <link rel="stylesheet" href="./css/404.css">
    <title>404 No Found</title>
</head>
<body>
    <main>
        <h1>404</h1>
        <p>没有找到对应的文章哦</p>
    </main>
    <header>
        <img src="./image/astronaut.png" class="astronaut" alt="404页面宇航员展示图">
    </header>
    <a href="https://blogweb.xyz" class="back">点击返回首页</a>
    <footer>

    </footer>
</body>
</html>
    `
    return html;
}
module.exports = NoFound;