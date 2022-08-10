-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- 主机： 127.0.0.1:3306
-- 生成日期： 2022-08-03 06:58:17
-- 服务器版本： 5.7.26
-- PHP 版本： 7.3.5

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- 数据库： `blog_new`
--

-- --------------------------------------------------------

--
-- 表的结构 `article`
--

DROP TABLE IF EXISTS `article`;
CREATE TABLE IF NOT EXISTS `article` (
  `id` bigint(20) NOT NULL COMMENT '文章ID',
  `title` varchar(200) NOT NULL COMMENT '文章标题',
  `description` text COMMENT '文章介绍',
  `tag` varchar(150) NOT NULL COMMENT '文章标签',
  `author` bigint(20) NOT NULL COMMENT '发布者ID',
  `content` mediumtext NOT NULL COMMENT '文章内容',
  `cover_file_name` varchar(60) DEFAULT NULL COMMENT '封面图片名称',
  `reprint` varchar(300) DEFAULT '0' COMMENT '转载地址，原创为null',
  `view_count` int(11) NOT NULL DEFAULT '0' COMMENT '阅读次数',
  `update_time` datetime DEFAULT NULL COMMENT '最近一次更新的时间',
  `create_time` datetime NOT NULL COMMENT '创建时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='文章表';

--
-- 转存表中的数据 `article`
--

INSERT INTO `article` (`id`, `title`, `description`, `tag`, `author`, `content`, `cover_file_name`, `reprint`, `view_count`, `update_time`, `create_time`) VALUES
(195783521610, '萨的', '阿萨德', '', 1, '<p>asd adfadfdfasdfasdsadqweqwsadasd</p>\n<pre><code class=\"language-js\">阿萨德\n</code></pre>\n<pre><code class=\"language-js\">&lt;script&gt;&lt;script/&gt;\n</code></pre>\n', NULL, NULL, 0, '2022-07-22 00:04:52', '2022-07-21 23:50:35');

-- --------------------------------------------------------

--
-- 表的结构 `collection`
--

DROP TABLE IF EXISTS `collection`;
CREATE TABLE IF NOT EXISTS `collection` (
  `id` bigint(20) NOT NULL COMMENT 'ID',
  `article_id` bigint(20) NOT NULL COMMENT '文章ID',
  `user_id` bigint(20) NOT NULL COMMENT '用户ID',
  `time` datetime NOT NULL COMMENT '收藏时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='收藏表';

-- --------------------------------------------------------

--
-- 表的结构 `comment`
--

DROP TABLE IF EXISTS `comment`;
CREATE TABLE IF NOT EXISTS `comment` (
  `id` bigint(20) NOT NULL COMMENT 'ID',
  `article_id` bigint(20) NOT NULL COMMENT '文章ID',
  `user_id` bigint(20) NOT NULL COMMENT '用户ID',
  `content` text NOT NULL COMMENT '内容',
  `reply` bigint(20) DEFAULT NULL COMMENT '是否是对某个评论的回复，不是则为null是则为对应的评论id',
  `client_ip` varchar(50) DEFAULT NULL COMMENT '用户IP',
  `time` datetime NOT NULL COMMENT '评论时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='评论表';

-- --------------------------------------------------------

--
-- 表的结构 `drafts`
--

DROP TABLE IF EXISTS `drafts`;
CREATE TABLE IF NOT EXISTS `drafts` (
  `id` bigint(20) NOT NULL COMMENT 'ID',
  `user_id` bigint(20) NOT NULL COMMENT '用户ID',
  `tag` varchar(150) DEFAULT NULL COMMENT '文章标签',
  `title` varchar(200) DEFAULT NULL COMMENT '文章标题',
  `content` mediumtext NOT NULL COMMENT '草稿箱内容',
  `time` datetime NOT NULL COMMENT '添加时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='草稿箱';

-- --------------------------------------------------------

--
-- 表的结构 `follow`
--

DROP TABLE IF EXISTS `follow`;
CREATE TABLE IF NOT EXISTS `follow` (
  `id` bigint(20) NOT NULL COMMENT 'ID',
  `blogger_id` bigint(20) NOT NULL COMMENT '被关注者的ID',
  `user_id` bigint(20) NOT NULL COMMENT '用户ID',
  `time` datetime NOT NULL COMMENT '关注时间'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='关注表';

--
-- 转存表中的数据 `follow`
--

INSERT INTO `follow` (`id`, `blogger_id`, `user_id`, `time`) VALUES
(1, 1, 1, '2022-06-24 00:00:00');

-- --------------------------------------------------------

--
-- 表的结构 `notice`
--

DROP TABLE IF EXISTS `notice`;
CREATE TABLE IF NOT EXISTS `notice` (
  `id` bigint(20) NOT NULL COMMENT 'ID',
  `user_id` bigint(20) NOT NULL COMMENT '用户ID',
  `content` mediumtext NOT NULL COMMENT '内容',
  `title` varchar(400) NOT NULL COMMENT '标题',
  `isRead` tinyint(1) NOT NULL COMMENT '已读',
  `time` datetime NOT NULL COMMENT '发送时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='站内提示信息存储';

-- --------------------------------------------------------

--
-- 表的结构 `tag`
--

DROP TABLE IF EXISTS `tag`;
CREATE TABLE IF NOT EXISTS `tag` (
  `id` bigint(20) NOT NULL COMMENT 'ID',
  `name` varchar(100) NOT NULL COMMENT 'tag名称',
  `belong` bigint(255) NOT NULL COMMENT '所属Type的ID',
  `icon_file_name` varchar(255) DEFAULT NULL COMMENT 'ICON文件名称',
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `indexes` int(30) NOT NULL COMMENT '索引值',
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 转存表中的数据 `tag`
--

INSERT INTO `tag` (`id`, `name`, `belong`, `icon_file_name`, `create_time`, `indexes`) VALUES
(272809693910, '321', 264563342910, NULL, '2022-07-30 21:48:16', 2),
(281632130010, '阿斯顿发', 264563342910, 'e3fd40fb96ed434eac43e406a5ce2476.webp', '2022-07-31 22:18:41', 0),
(281633270110, '森岛帆高', 264563342910, 'cb8a72d4ac7640bf9b7c5ddb9b7333c5.webp', '2022-07-31 22:18:52', 3),
(281634969610, '阿斯顿发啊', 264563342910, NULL, '2022-07-31 22:19:09', 4),
(281635673010, '森岛帆高第三方个森岛帆高的', 281634314910, NULL, '2022-07-31 22:19:16', 1),
(281637246810, '的双方各第三方地方', 281634314910, 'b49dc32bc4444f7fa7a4747fb2216259.webp', '2022-07-31 22:19:32', 0);

-- --------------------------------------------------------

--
-- 表的结构 `tips_set`
--

DROP TABLE IF EXISTS `tips_set`;
CREATE TABLE IF NOT EXISTS `tips_set` (
  `user_id` bigint(20) NOT NULL COMMENT '用户ID',
  `follow` tinyint(1) DEFAULT NULL COMMENT '关注的用户有新文章',
  `comment` tinyint(1) DEFAULT NULL COMMENT '收到回复',
  `follow_me` tinyint(1) DEFAULT NULL COMMENT '有人关注我',
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='用户消息推送设置';

-- --------------------------------------------------------

--
-- 表的结构 `type`
--

DROP TABLE IF EXISTS `type`;
CREATE TABLE IF NOT EXISTS `type` (
  `id` bigint(20) NOT NULL COMMENT 'ID',
  `name` varchar(40) NOT NULL COMMENT '类型/标签 名字',
  `indexes` int(30) NOT NULL COMMENT '排序、索引',
  `icon_file_name` varchar(60) DEFAULT NULL COMMENT 'ICON文件名称',
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `description` text NOT NULL COMMENT '介绍用于meta中description',
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='网站文章的类型与标签';

--
-- 转存表中的数据 `type`
--

INSERT INTO `type` (`id`, `name`, `indexes`, `icon_file_name`, `create_time`, `description`) VALUES
(264563342910, '213', 2, NULL, '2022-07-29 22:53:53', 'asdsadasdasdasd'),
(281634314910, '阿斯顿发', 2, '248d7eb026de42c683bb743e34fa148a.webp', '2022-07-31 22:19:03', '阿数据库的话卡卷红烧豆腐框架爱是可点击好'),
(281638090010, '空的', 3, NULL, '2022-07-31 22:19:40', '空的空的空的空的空的空的空的空的空的空的空的');

-- --------------------------------------------------------

--
-- 表的结构 `user`
--

DROP TABLE IF EXISTS `user`;
CREATE TABLE IF NOT EXISTS `user` (
  `id` bigint(20) NOT NULL COMMENT '用户ID',
  `name` varchar(40) NOT NULL COMMENT '昵称',
  `auth` int(2) NOT NULL COMMENT '身份',
  `email` varchar(60) DEFAULT NULL COMMENT '用户邮箱',
  `github` varchar(40) DEFAULT NULL COMMENT 'GitHub ID',
  `qq` varchar(40) DEFAULT NULL COMMENT 'QQ号',
  `password` varchar(30) NOT NULL COMMENT '密码',
  `state` int(2) DEFAULT NULL COMMENT '状态，（权限）',
  `description` text COMMENT '自我介绍',
  `site` varchar(200) DEFAULT NULL COMMENT '个人网站',
  `unit` varchar(100) DEFAULT NULL COMMENT '所属单位',
  `location` varchar(30) DEFAULT NULL COMMENT '所在地区',
  `avatar_file_name` varchar(60) DEFAULT NULL COMMENT '头像图片名称',
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `github` (`github`),
  UNIQUE KEY `qq` (`qq`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='用户数据表';

--
-- 转存表中的数据 `user`
--

INSERT INTO `user` (`id`, `name`, `auth`, `email`, `github`, `qq`, `password`, `state`, `description`, `site`, `unit`, `location`, `avatar_file_name`, `create_time`) VALUES
(1, 'admin1', 1, '1974109227@qq.com', 'Lrunlin', '1974109227', '1974109227', 1, NULL, NULL, NULL, NULL, NULL, '2022-07-10 00:00:00'),
(247111576410, '1', 0, '353575900@qq.com', NULL, NULL, '11111111', NULL, NULL, NULL, NULL, NULL, NULL, '2022-07-27 22:25:15');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
