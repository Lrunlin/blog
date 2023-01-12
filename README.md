# 技术博客社区系统

<div align=center>
 <img src="https://blogweb.cn/favicon.svg" alt="Logo" title="Logo" />
</div>

## 相关技术

用户端:Next.js  
管理系统:React18+Vite  
服务端:Koa2+Sequelize(ORM)  
数据库:MySQL(InnoDB)+Redis

编程语言 TypeScript  
组件库使用 Ant Design  
CSS 解决方案 Tailwind CSS  
React 状态管理 Recoil  
API 接口文档 Apifox  
缓存 Token 黑名单、Next.js 页面渲染结果使用 Redis 缓存，其他数据使用 LRU-cache 缓存。

## 其他版本

系统相对完善对博客网站所需的 SEO 有处理可以在生产环境中进行使用,也可以当做毕业设计。
系统提供一 份用户端为 Vue3 的 CSR 版本(前端 Vue3,服务端 Node.js 使用 JavaScript)  
以及一份[Next.js+Vue3+Express 版本](https://github.com/Lrunlin/web_blog "个人博客")（作者主页可见，开源）

可联系 QQ:1974109227

## 相关链接

1. **[博客预览地址:https://blogweb.cn](https://blogweb.cn "作者个人博客")**
2. **[GitHub 仓库地址:https://github.com/Lrunlin/blog](https://github.com/Lrunlin/blog "GitHub仓库作为主仓库")**
3. **[Gitee 仓库地址:https://gitee.com/awebcoder/blog](https://gitee.com/awebcoder/blog "Gitee仓库只做同步镜像不进行其他操作")**

## 功能

### 用户端

1. 登录/注册  
   1.邮箱  
   ~~2. QQ~~  
    3. GitHub(仅支持登录)
2. 首页文章推荐
3. 文章的增删改查，以及草稿箱功能
4. 文章评论、点赞
5. 设置/修改用户基本信息、展示作者基本社交平台账号
6. 关注作者、收藏文章 以及对应的列表查询
7. 站内信提醒设置(文章、评论)
8. ~~文章发布数量、粉丝排行榜~~
9. ~~聊天室~~

### 管理系统

1. 分页查询文章
2. 可以查询指定文章信息并对其修改、删除
3. 发布文章可以上传图片并对图片进行水印添加和压缩
4. 可以添加、查询文章类型
5. ~~OSS 图床管理~~
6. 可以简单获取服务器当前信息(大屏数据可视化)
7. 可以查询用户留言进行并且删除
8. 爬虫系统，自动文章(思否、掘金)抓取
9. 推广内容的数据处理
10. 评论管理
11. 首页消息通知

## 更新计划

1. 用户端 UI 进行美化以及去 Ant Design
2. ~~积分功能~~
3. 问答功能
4. 文章页面主题模式
5. ~~Next.js 13~~ 升级为 app 文件夹并且使用 server component
6. Redis 接口环境以及对应的事务处理
7. 小组功能

## 开发环境启动

**_Node.js 版本推荐使用 18,同时推荐使用 yarn 作为包管理器_**

### 环境变量

1. admin 文件夹在根目录创建.env.production 文件并按照.env.development 填写完整
2. client 文件夹在 env 文件夹中.env.production 文件并按照.env.development 填写完整
3. server 文件夹在 env 文件夹中将 template 重命名为环境变量名后补全内容

### 启动

0. 导入 SQL 文件
1. npm install yarn -g _(如果有 yarn 请忽略)_
2. 点击 install.bat 自动安装依赖 _(完成后关闭 cmd 窗口)_
3. 点击 dev.bat 启动项目

## 生产环境部署

本站使用宝塔 Linux 进行网站部署,对于不同开发者来说生产环境服务器不同。如果你在项目部署时遇到了问题可以通过顶部的联系方式联系我。

## 服务器推荐

1. 服务器:[腾讯云](https://curl.qcloud.com/VEizLhRn "腾讯云,轻量应用服务器")（推荐）
2. 服务器:[阿里云](https://www.aliyun.com/daily-act/ecs/activity_selection?userCode=46qdmkc0 "阿里云,轻量应用服务器")
3. CDN/OSS:[七牛云](https://s.qiniu.com/NZ3Iz2 "七牛云,CDN,OSS")

## 网络爬虫

[使用 puppeteer 爬取掘金文章并直接存入数据库](https://github.com/Lrunlin/puppeteer-juejin-blog)

[使用 puppeteer 爬取掘金文章将数据和图片直接保存为本地文件](https://github.com/Lrunlin/puppeteer-juejin)

[使用 puppeteer 爬取思否文章并直接存入数据库](https://github.com/Lrunlin/puppeteer-sf-blog)

参考文章:[Puppeteer 爬取掘金文章](https://blogweb.cn/article/1197996635410),[Puppeteer 连接已有 Chrome 浏览器](https://blogweb.cn/article/6064301311)

## Star History

[![Star History Chart](https://api.star-history.com/svg?repos=Lrunlin/blog&type=Date)](https://star-history.com/#Lrunlin/blog&Date)
