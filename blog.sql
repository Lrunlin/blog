-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- 主机： 127.0.0.1:3306
-- 生成日期： 2021-03-18 14:52:06
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
  `admin` varchar(30) NOT NULL,
  `password` varchar(40) NOT NULL,
  `time` datetime DEFAULT NULL,
  PRIMARY KEY (`admin`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `admin`
--

INSERT INTO `admin` (`admin`, `password`, `time`) VALUES
('admin', 'password', '2021-03-16 10:56:28');

-- --------------------------------------------------------

--
-- 表的结构 `article`
--

DROP TABLE IF EXISTS `article`;
CREATE TABLE IF NOT EXISTS `article` (
  `router` varchar(60) NOT NULL,
  `type` varchar(60) NOT NULL,
  `introduce` varchar(120) NOT NULL,
  `article` mediumtext NOT NULL,
  `isTop` tinyint(1) DEFAULT NULL,
  `isShow` tinyint(1) DEFAULT NULL,
  `time` datetime DEFAULT NULL,
  `title` varchar(100) NOT NULL,
  PRIMARY KEY (`router`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

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
('AJAX', '2021-03-04 23:27:08'),
('jQuery', '2021-03-05 17:21:29'),
('React', '2021-03-09 16:17:30'),
('VUE', '2021-03-04 23:26:10');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
