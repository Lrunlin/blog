# 个人博客系统（源码长期更新）

## 技术栈

用户端:Next.js(SSR)+TypeScript+Ant Design  
管理系统:Vue3+Element-Plus  
服务端:TypeScript+Express+Sequelize(ORM)  
数据库:MySQL

1. **[博客预览地址:https://blogweb.cn](https://blogweb.cn "作者个人博客")**
2. **[GitHub 仓库地址:https://github.com/Lrunlin/blog](https://github.com/Lrunlin/blog "GitHub仓库作为主仓库")**
3. **[Gitee 仓库地址:https://gitee.com/awebcoder/blog](https://gitee.com/awebcoder/blog "Gitee仓库只做同步镜像不进行回复")**

**_Node.js 版本推荐使用 14:对应 node-sass 版本（未来会迁移到 18）_**

## 功能

### 用户端

1.  在首页查询全部文章
2.  展示作者基本社交平台账号
3.  点击文章标题进入文章页面查询文章详情
4.  搜索页面可以根据搜索栏关键词进行指定文章查询
5.  关于作者编写作者简单信息
6.  发布文章、设置用户基本信息
7.  可以对管理员进行留言
8.  浏览并使用管理员发布的开发 API 接口

### 管理系统

1.  分页查询文章
2.  可以查询指定文章信息并对其修改、删除
3.  发布文章可以上传图片并对图片进行水印添加
4.  可以查询用户留言进行并且删除
5.  可以添加、查询文章类型
6.  可以查询、删除富文本编辑器所有上传的静态图片
7.  可以简单获取服务器当前信息
8.  登录并且可以修改管理员密码
9.  处理开源仓库信息
10. 增删改查友链
11. 大屏数据可视化

### 备注

1.  日志使用文件形式或者变量进行存储
2.  使用 JWT 算法 RSA256 进行签名解密进行接口请求权限判断
3.  统计访问量是在所有文件中注入一段 JS 代码,JS 代码每次被访问当日访问量+1,并且请求被缓存一天
4.  发送无权限请求返回错误代码 401
5.  接口文档工具使用 Apifox,需要的从博客中的联系方式联系我

## 更新计划

1.  用户端支持移动端，更换 CSS 管理方案为 tailwind CSS 或者 styled-components
2.  服务端 Node.js 框架更换为 Koa2 或者 Nest.js
3.  将 assets 与 api 合并方便资源处理(但是会牺牲部署的便利性)
4.  将富文本编辑器换为 Markdown 编辑器

## 服务器推荐

1. 服务器:[腾讯云](https://curl.qcloud.com/VEizLhRn "腾讯云,轻量应用服务器")（推荐）
2. 服务器:[阿里云](https://www.aliyun.com/daily-act/ecs/activity_selection?userCode=46qdmkc0 "阿里云,轻量应用服务器")
3. CDN/OSS:[七牛云](https://s.qiniu.com/NZ3Iz2 "七牛云,CDN,OSS")

## 预览图片

![文章页面](https://disk.blogweb.cn/open-source/blog/1.jpg "文章页面")
![用户端首页](https://disk.blogweb.cn/open-source/blog/2.jpg "用户端首页")
![数据可视化](https://disk.blogweb.cn/open-source/blog/3.jpg?v12 "数据可视化")
![文章编辑](https://disk.blogweb.cn/open-source/blog/4.jpg "文章编辑")
![管理系统首页](https://disk.blogweb.cn/open-source/blog/5.jpg "管理系统首页")

说明:  
系统相对完善对博客网站所需的 SEO 有处理可以在生产环境中进行使用,也可以当做毕业设计,系统提供一份用户端为 Vue3 的 CSR 版本,可联系 QQ:1974109227
