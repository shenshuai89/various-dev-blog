/*
Navicat MySQL Data Transfer

Source Server         : book
Source Server Version : 50562
Source Host           : localhost:3306
Source Database       : various_blog

Target Server Type    : MYSQL
Target Server Version : 50562
File Encoding         : 65001

Date: 2020-05-27 22:22:18
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for blogs
-- ----------------------------
DROP TABLE IF EXISTS `blogs`;
CREATE TABLE `blogs` (
  `id` int(255) NOT NULL AUTO_INCREMENT,
  `title` varchar(50) NOT NULL,
  `content` longtext NOT NULL,
  `createtime` bigint(20) NOT NULL,
  `author` varchar(20) CHARACTER SET utf8 NOT NULL,
  PRIMARY KEY (`id`)
);


---
-- 插入文章
-- INSERT INTO blogs (title, content, createtime, author) VALUES ('第2篇博客标题222', '第一篇博客内容222', 1590590733927, '张三');
-- INSERT INTO blogs (title, content, createtime, author) VALUES ('第3篇博客标题333', '第3篇博客内容333', 1590590733927, '张三');
-- 查询博客
-- SELECT * from blogs;