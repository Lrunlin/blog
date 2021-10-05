-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- 主机： 127.0.0.1:3306
-- 生成日期： 2021-10-05 04:17:50
-- 服务器版本： 5.7.26
-- PHP 版本： 7.2.18

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- 数据库： `blog`
--

-- --------------------------------------------------------

--
-- 表的结构 `admin`
--

DROP TABLE IF EXISTS `admin`;
CREATE TABLE IF NOT EXISTS `admin` (
  `admin` varchar(60) NOT NULL,
  `password` varchar(60) NOT NULL,
  `time` datetime DEFAULT NULL,
  PRIMARY KEY (`admin`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `admin`
--

INSERT INTO `admin` (`admin`, `password`, `time`) VALUES
('liurunlin', '40153ffef8de9e5b2dfd6992850e8067', '2021-03-16 10:56:28');

-- --------------------------------------------------------

--
-- 表的结构 `article`
--

DROP TABLE IF EXISTS `article`;
CREATE TABLE IF NOT EXISTS `article` (
  `router` varchar(60) NOT NULL,
  `type` varchar(60) NOT NULL,
  `introduce` text NOT NULL,
  `article` mediumtext NOT NULL,
  `isTop` tinyint(1) DEFAULT NULL,
  `isShow` tinyint(1) DEFAULT NULL,
  `time` date DEFAULT NULL,
  `title` varchar(200) NOT NULL,
  PRIMARY KEY (`router`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `article`
--

INSERT INTO `article` (`router`, `type`, `introduce`, `article`, `isTop`, `isShow`, `time`, `title`) VALUES
('阿斯顿撒旦', 'VUE', '5pKS5aSn5aOw5Zyw', 'PHA+PGltZyBkYXRhLXNyYz0iaHR0cDovL2xvY2FsaG9zdDozNDU2L2ltYWdlLzE2MzMzNTI0ODY2NTMuanBnIiBhbHQ9IuWNmuWuouaWh+eroOexu+WeizrliJjmtqbpnJYsVlVFIiB0aXRsZT0i5p+l55yL5Zu+54mHOlZVRSI+PGltZyBkYXRhLXNyYz0iaHR0cDovL2xvY2FsaG9zdDozNDU2L2ltYWdlLzE2MzMzNTI0OTA0MjUuanBnIiBhbHQ9IuWNmuWuouaWh+eroOexu+WeizrliJjmtqbpnJYsVlVFIiB0aXRsZT0i5p+l55yL5Zu+54mHOlZVRSI+PC9wPg==', 0, 1, '2021-10-04', '6Zi/5aSn5aOw6YGT');

-- --------------------------------------------------------

--
-- 表的结构 `articletype`
--

DROP TABLE IF EXISTS `articletype`;
CREATE TABLE IF NOT EXISTS `articletype` (
  `type` varchar(20) NOT NULL,
  `time` datetime DEFAULT NULL,
  PRIMARY KEY (`type`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `articletype`
--

INSERT INTO `articletype` (`type`, `time`) VALUES
('90890', '2021-10-01 10:13:56'),
('React', '2021-03-09 16:17:30'),
('VUE', '2021-03-04 23:26:10');

-- --------------------------------------------------------

--
-- 表的结构 `message`
--

DROP TABLE IF EXISTS `message`;
CREATE TABLE IF NOT EXISTS `message` (
  `id` varchar(50) NOT NULL,
  `content` text NOT NULL,
  `contact` varchar(200) NOT NULL,
  `address` varchar(200) NOT NULL,
  `time` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `message`
--

INSERT INTO `message` (`id`, `content`, `contact`, `address`, `time`) VALUES
('16328159947560.29907252809753904', '5rWL6K+V5bm255WZ6KiA', 'bGl1cmwwNjIxQGdtYWlsLmNvbQ==', '辽宁省', '2021-09-28 15:59:54'),
('16328250158550.3820978661930561', 'IGxpdXJsMDYyMUBnbWFpbC5jb23mtYvor5XnlZnoqIDlip/og70=', 'IGxpdXJsMDYyMUBnbWFpbC5jb20=', '辽宁省', '2021-09-28 18:30:15');

-- --------------------------------------------------------

--
-- 表的结构 `rss`
--

DROP TABLE IF EXISTS `rss`;
CREATE TABLE IF NOT EXISTS `rss` (
  `email` varchar(60) NOT NULL,
  `time` datetime DEFAULT NULL,
  PRIMARY KEY (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `rss`
--

INSERT INTO `rss` (`email`, `time`) VALUES
('MTk3NDEwOTIyN0BxcS5jb20=', '2021-10-04 22:31:41');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
