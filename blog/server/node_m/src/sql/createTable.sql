-- 创建blogs表
CREATE TABLE `blogs` (
`id`  int(255) NOT NULL AUTO_INCREMENT ,
`title`  varchar(50) NOT NULL ,
`content`  longtext NOT NULL ,
`createtime`  bigint NOT NULL ,
`author`  varchar(20) NOT NULL ,
PRIMARY KEY (`id`)
);
-- 创建users表
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(20) NOT NULL,
  `password` varchar(20) NOT NULL,
  `realname` varchar(20) NOT NULL,
  PRIMARY KEY (`id`)
);