文章类型存储
## 存储文章类型
CREATE TABLE IF NOT EXISTS `articletype`(
   `type` VARCHAR(20) NOT NULL,
   `time` DATETIME,
   PRIMARY KEY ( `type` )
)ENGINE=InnoDB DEFAULT CHARSET=utf8;
## 添加文件类型时间
INSERT INTO articletype ( type, time )
                       VALUES
                       ( '类型', NOW() );

## 博客存储

CREATE TABLE IF NOT EXISTS `article`(
   `router` VARCHAR(60) NOT NULL,
   `type` VARCHAR(60) NOT NULL,
   `title` VARCHAR(200) NOT NULL,
   `introduce` TEXT NOT NULL,
   `article` MEDIUMTEXT NOT NULL,
   `isTop`Boolean,
   `isShow`Boolean,
   `time` DATE,
   PRIMARY KEY ( `router` )
)ENGINE=InnoDB DEFAULT CHARSET=utf8;
插入：文章路由，文章类型，文章介绍，文章主要内容，是否置顶，是否展示，时间
INSERT INTO article(router, type, title,introduce, article, isTop, isShow, time)
VALUES
    ( '路由','类型', '文章介绍', '文章内容', true, false, NOW());

## 管理员账号密码
CREATE TABLE IF NOT EXISTS `admin`(
   `admin` VARCHAR(30) NOT NULL,
   `password` VARCHAR(40) NOT NULL,
   `time` DATETIME,
   PRIMARY KEY ( `admin` )
)ENGINE=InnoDB DEFAULT CHARSET=utf8;
添加管理员
INSERT INTO admin(admin,password, time)
VALUES
    ("admin","password",NOW());

## 创建留言表
CREATE TABLE IF NOT EXISTS `message`(
   `id` VARCHAR(20) NOT NULL,
   `father` VARCHAR(20) NOT NULL,
   `router` VARCHAR(30) NOT NULL,
   `name` VARCHAR(30) NOT NULL,
   `face` VARCHAR(100) NOT NULL,
   `text` VARCHAR(400) NOT NULL,
   `time` DATETIME,
   PRIMARY KEY ( `id` )
   )ENGINE=InnoDB DEFAULT CHARSET=utf8;



## 修改记录 log

CREATE TABLE IF NOT EXISTS `log`(
   `id` VARCHAR(40) NOT NULL,
   `ip` VARCHAR(30) NOT NULL,
   `router` VARCHAR(40) NOT NULL,
   `method` VARCHAR(20) NOT NULL,
   `time` DATETIME,
   PRIMARY KEY ( `id` )
)ENGINE=InnoDB DEFAULT CHARSET=utf8;


## 订阅 ##
CREATE TABLE IF NOT EXISTS `rss`(
   `email` VARCHAR(60) NOT NULL,
   `time` DATETIME,
   PRIMARY KEY ( `email` )
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

## 记事本 ## 
CREATE TABLE IF NOT EXISTS `message`(
   `id` VARCHAR(30) NOT NULL,
   `message` VARCHAR(300) NOT NULL,
   `time` DATETIME,
   PRIMARY KEY ( `id` )
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

## 评论 ##
<!-- CREATE TABLE IF NOT EXISTS `comment`(
   `id` VARCHAR(40) NOT NULL,
   `token` VARCHAR(100) NOT NULL,
   `content` TEXT NOT NULL,
   `time` DATE,
   PRIMARY KEY ( `id` )
)ENGINE=InnoDB DEFAULT CHARSET=utf8; -->

CREATE TABLE IF NOT EXISTS `comment`(
   `id` VARCHAR(40) NOT NULL,
   `token` VARCHAR(100) NOT NULL,
   `face` VARCHAR(100) NOT NULL,
   `name` VARCHAR(100) NOT NULL,
   `content` TEXT NOT NULL,
   `time` DATE,
   PRIMARY KEY ( `id` )
)ENGINE=InnoDB DEFAULT CHARSET=utf8;