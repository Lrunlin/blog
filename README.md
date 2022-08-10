# 个人博客系统（源码长期更新）

<div align=center>
 <img src="https://blogweb.cn/favicon.svg" alt="Logo" title="logo" />
</div>

## 技术栈

用户端:Next.js+TypeScript+Ant Design+Tailwind CSS 
管理系统:React18+TypeScript+Vite+Ant Design+Tailwind CSS  
服务端:TypeScript+Koa2+Sequelize(ORM)
数据库:MySQL(InnoDB)+Redis  

前端状态管理采用Recoil
API接口文档使用Apifox
Token黑名单使用Redis缓存，其他数据使用LRU-cache缓存。  

## 其他版本

系统相对完善对博客网站所需的 SEO 有处理可以在生产环境中进行使用,也可以当做毕业设计。
系统提供一 份用户端为 Vue3 的 CSR 版本(前端 Vue3,服务端 Node.js 使用 JavaScript，不免费)  
以及一份[前台为Next.js的后台为Vue3的版本](https://github.com/Lrunlin/web_blog "个人博客")（作者主页可见，开源） 

可联系 QQ:1974109227  

## 相关链接

1. **[博客预览地址:https://blogweb.cn](https://blogweb.cn "作者个人博客")**
2. **[GitHub 仓库地址:https://github.com/Lrunlin/blog](https://github.com/Lrunlin/blog "GitHub仓库作为主仓库")**
3. **[Gitee 仓库地址:https://gitee.com/awebcoder/blog](https://gitee.com/awebcoder/blog "Gitee仓库只做同步镜像不进行回复")**

<p id="to">注:</p>

**_Node.js 版本推荐使用 16,同时推荐使用 yarn 作为包管理器(未来会对 Node 版本进行升级)_**

## 功能

### 用户端

1.  在首页查询全部文章（推荐算法）
2.  展示作者基本社交平台账号
3.  文章的增删改查，以及历史版本的回复
4.  评论（增删查）
5.  关于作者编写作者简单信息
6.  发布文章、设置用户基本信息
7.  关注作者、收藏文章
8.  站内信提醒设置
9.  文章发布数量、粉丝排行榜
10. 聊天室

### 管理系统

1.  分页查询文章
2.  可以查询指定文章信息并对其修改、删除
3.  发布文章可以上传图片并对图片进行水印添加
4.  可以查询用户留言进行并且删除
5.  可以添加、查询文章类型
6.  OSS图床管理  
7.  可以简单获取服务器当前信息
8.  登录并且可以修改管理员密码
9.  用户的文章收藏、关注情况察看
10. 爬虫系统，自动文章抓取
11. 大屏数据可视化
12. 接口缓存功能，缓存管理  
13. 日志系统(Redis)

## 开发环境启动

_关于项目启动环境见[文档顶部说明](#to)_

0. 导入 SQL 文件
1. npm install yarn -g _(如果有 yarn 请忽略)_
2. 点击 install.bat 自动安装依赖 _(完成后关闭 cmd 窗口)_
3. 点击 dev.bat 启动项目

## 生产环境部署

本站使用宝塔 Linux 进行网站部署,对于不同开发者来说生产环境服务器不同。如果你在项目部署时遇到了问题可以通过顶部的联系方式联系我。

## 更新计划

1.  积分功能
2.  小组功能

前期使用Antd组件库快速搭建用户端页面，后期进行美化以及去Antd  

## 服务器推荐

1. 服务器:[腾讯云](https://curl.qcloud.com/VEizLhRn "腾讯云,轻量应用服务器")（推荐）
2. 服务器:[阿里云](https://www.aliyun.com/daily-act/ecs/activity_selection?userCode=46qdmkc0 "阿里云,轻量应用服务器")
3. CDN/OSS:[七牛云](https://s.qiniu.com/NZ3Iz2 "七牛云,CDN,OSS")

## 预览图片


## Star History

[![Star History Chart](https://api.star-history.com/svg?repos=Lrunlin/blog&type=Date)](https://star-history.com/#Lrunlin/blog&Date)
