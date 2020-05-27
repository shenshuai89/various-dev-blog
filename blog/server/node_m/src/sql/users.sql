/*
Navicat MySQL Data Transfer

Source Server         : book
Source Server Version : 50562
Source Host           : localhost:3306
Source Database       : various_blog

Target Server Type    : MYSQL
Target Server Version : 50562
File Encoding         : 65001

Date: 2020-05-27 22:13:26
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for users
-- 新建users表
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(20) NOT NULL,
  `password` varchar(20) NOT NULL,
  `realname` varchar(20) NOT NULL,
  PRIMARY KEY (`id`)
);

-- ----------------------------
-- Records of users
-- ----------------------------
