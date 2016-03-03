/*
Navicat MySQL Data Transfer

Source Server         : localhost_3306
Source Server Version : 50624
Source Host           : localhost:3306
Source Database       : test

Target Server Type    : MYSQL
Target Server Version : 50624
File Encoding         : 65001

Date: 2016-03-03 15:39:22
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for blog_article
-- ----------------------------
DROP TABLE IF EXISTS `blog_article`;
CREATE TABLE `blog_article` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(100) CHARACTER SET utf8 NOT NULL COMMENT '标题',
  `hit` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '点击次数',
  `time` date NOT NULL COMMENT '时间',
  `content` text CHARACTER SET utf8 COMMENT '文本主体',
  `author` varchar(20) CHARACTER SET utf8 DEFAULT NULL COMMENT '作者',
  `keyContent` text CHARACTER SET utf8 COMMENT '题目介绍',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of blog_article
-- ----------------------------
INSERT INTO `blog_article` VALUES ('1', '测试项目', '100', '2015-12-31', '<ul> <li>测试</li> <li>测试</li> <li>测试</li> </ul> <h1>测试一级标题</h1> <hr/> <p>测试正文哈哈哈哈哈 <kbd>npm install gulp-sass --save-dev</kbd> 哈哈哈哈哈哈哈哈哈哈哈哈哈哈</p> <h2>测试二级标题</h2> <p>测试正文哈哈哈哈哈哈 <strong>测试重要文本</strong>  哈哈哈哈哈哈哈哈哈哈哈哈哈</p> <h3>测试三级标题</h3> <p>测试正文哈哈哈哈 <a href=\"###\">测试链接</a> 哈哈哈哈哈jkfdsajfklashfdskajfsafjsladfslafhjksafhkjasdfhjkslad哈哈哈哈哈哈哈哈哈哈</p> <code>  //测试代码区域</br>var h = \\\'ff\\\';</br>console.log(h); </code>', '小周', '测试');
INSERT INTO `blog_article` VALUES ('2', '测试项目2', '0', '0000-00-00', null, null, null);

-- ----------------------------
-- Table structure for chat
-- ----------------------------
DROP TABLE IF EXISTS `chat`;
CREATE TABLE `chat` (
  `friendFrom` int(11) NOT NULL,
  `friendTo` int(11) NOT NULL,
  `type` int(11) NOT NULL DEFAULT '0',
  `text` varchar(500) CHARACTER SET utf8 DEFAULT NULL,
  `time` varchar(45) CHARACTER SET utf8 DEFAULT NULL,
  `code` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of chat
-- ----------------------------

-- ----------------------------
-- Table structure for friend
-- ----------------------------
DROP TABLE IF EXISTS `friend`;
CREATE TABLE `friend` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `friendTo` int(11) NOT NULL,
  `friendFrom` int(11) NOT NULL,
  `level` int(11) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of friend
-- ----------------------------

-- ----------------------------
-- Table structure for userinfo
-- ----------------------------
DROP TABLE IF EXISTS `userinfo`;
CREATE TABLE `userinfo` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(45) CHARACTER SET utf8 NOT NULL,
  `password` varchar(45) CHARACTER SET utf8 NOT NULL,
  `level` int(11) DEFAULT '0',
  `moto` varchar(200) CHARACTER SET utf8 DEFAULT '',
  `imgSrc` varchar(200) CHARACTER SET utf8 DEFAULT NULL,
  `lastLoginTime` varchar(45) CHARACTER SET utf8 DEFAULT NULL,
  `loginIp` varchar(45) CHARACTER SET utf8 DEFAULT NULL,
  `birthday` varchar(45) CHARACTER SET utf8 DEFAULT '',
  `birthplace` varchar(45) CHARACTER SET utf8 DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of userinfo
-- ----------------------------
INSERT INTO `userinfo` VALUES ('2', 'zhoujian', 'zhoujian', '0', '吃饭要吃饱', null, null, null, '', null);
INSERT INTO `userinfo` VALUES ('3', '周建', 'zhoujian', '0', '吃饭要吃饱', null, null, null, '', null);
INSERT INTO `userinfo` VALUES ('4', '发的', '范德萨发', '0', '吃饭要吃饱', null, null, null, '', null);
INSERT INTO `userinfo` VALUES ('5', 'fanf', 'fanf', '0', '吃饭要吃饱', null, null, null, '', null);
INSERT INTO `userinfo` VALUES ('6', 'zjf', 'zjf', '0', '吃饭要吃饱', null, null, null, '', null);
