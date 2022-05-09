# 个人博客系统（源码长期更新）

<div align=center>
 <img src="https://disk.blogweb.cn/open-source/blog/logo.svg#pic_cente" alt="Logo" title="logo" />
</div>

## 技术栈

用户端:Next.js(SSR)+TypeScript+Ant Design  
管理系统:Vue3+Element-Plus  
服务端:TypeScript+Express+Sequelize(ORM)  
数据库:MySQL

## ALL in Vue

系统相对完善对博客网站所需的 SEO 有处理可以在生产环境中进行使用,也可以当做毕业设计,系统提供一份用户端为 Vue3 的 CSR 历史版本,可联系 QQ:1974109227

## 相关链接

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

## 更新计划

1.  用户端支持移动端，更换 CSS 管理方案为 tailwind CSS 或者 styled-components
2.  服务端 Node.js 框架更换为 Koa2 或者 Nest.js
3.  将 assets 与 api 文件夹合并方便资源处理(但是会牺牲部署的便利性)
4.  将富文本编辑器换为 Markdown 编辑器
5.  管理系统使用 React18 重构
6.  在线友链申请功能
7.  管理员管理系统配置功能
8.  根据环境变量切换 RSA 秘钥

## 服务器推荐

1. 服务器:[腾讯云](https://curl.qcloud.com/VEizLhRn "腾讯云,轻量应用服务器")（推荐）
2. 服务器:[阿里云](https://www.aliyun.com/daily-act/ecs/activity_selection?userCode=46qdmkc0 "阿里云,轻量应用服务器")
3. CDN/OSS:[七牛云](https://s.qiniu.com/NZ3Iz2 "七牛云,CDN,OSS")

## 预览图片

<div align=center>
<img src="https://disk.blogweb.cn/open-source/blog/1.jpg"  width=90% alt="文章页面" title="文章页面" />
<img src="https://disk.blogweb.cn/open-source/blog/2.jpg"  width=90% alt="用户端首页" title="用户端首页" />
<img src="https://disk.blogweb.cn/open-source/blog/3.jpg"  width=90% alt="数据可视化" title="数据可视化" />
<img src="https://disk.blogweb.cn/open-source/blog/4.jpg"  width=90% alt="文章编辑" title="文章编辑" />
<img src="https://disk.blogweb.cn/open-source/blog/5.jpg"  width=90% alt="管理系统首页" title="管理系统首页" />
</div>

## Star History

[![Star History Chart](https://api.star-history.com/svg?repos=Lrunlin/blog&type=Date)](https://star-history.com/#Lrunlin/blog&Date)
