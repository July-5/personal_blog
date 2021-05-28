/*
 Navicat MySQL Data Transfer

 Source Server         : root
 Source Server Type    : MySQL
 Source Server Version : 50719
 Source Host           : localhost:3306
 Source Schema         : blog

 Target Server Type    : MySQL
 Target Server Version : 50719
 File Encoding         : 65001

 Date: 01/12/2020 16:15:17
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for articles
-- ----------------------------
DROP TABLE IF EXISTS `articles`;
CREATE TABLE `articles`  (
  `articleID` int(10) NOT NULL AUTO_INCREMENT COMMENT '博客ID',
  `userID` int(10) NULL DEFAULT NULL COMMENT '用户ID',
  `sortID` int(10) NOT NULL COMMENT '分类ID',
  `articleTitle` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '博客标题',
  `articleContent` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '博客内容',
  `articleDate` datetime(0) NULL DEFAULT NULL COMMENT '博客发布时间',
  `articleView` int(10) NULL DEFAULT NULL COMMENT '博客浏览量',
  `articleLike` int(10) NULL DEFAULT NULL COMMENT '博客点赞数',
  PRIMARY KEY (`articleID`) USING BTREE,
  INDEX `articleUser`(`userID`) USING BTREE,
  INDEX `articleSort`(`sortID`) USING BTREE,
  CONSTRAINT `articleSort` FOREIGN KEY (`sortID`) REFERENCES `sorts` (`sortID`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `articleUser` FOREIGN KEY (`userID`) REFERENCES `users` (`userID`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of articles
-- ----------------------------
INSERT INTO `articles` VALUES (1, 1, 3, 'Element UI for Vue3.0', 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx', '2020-11-30 16:28:47', 0, 0);
INSERT INTO `articles` VALUES (2, 1, 4, '硬核JS 令你迷惑的位运算', 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa', '2020-11-02 21:29:49', 0, 0);
INSERT INTO `articles` VALUES (3, 2, 5, '如何开发一款前端脚手架工具', 'bbbbbbbbbbbbb', '2020-09-17 16:30:52', 0, 0);

-- ----------------------------
-- Table structure for comments
-- ----------------------------
DROP TABLE IF EXISTS `comments`;
CREATE TABLE `comments`  (
  `commentID` int(10) NOT NULL AUTO_INCREMENT COMMENT '评论ID',
  `userID` int(10) NULL DEFAULT NULL COMMENT '用户ID',
  `articleID` int(10) NULL DEFAULT NULL COMMENT '博客ID',
  `commentContent` text CHARACTER SET utf8 COLLATE utf8_general_ci NULL COMMENT '评论内容',
  `commentDate` datetime(0) NULL DEFAULT NULL COMMENT '评论时间',
  PRIMARY KEY (`commentID`) USING BTREE,
  INDEX `commentUser`(`userID`) USING BTREE,
  INDEX `commentArticle`(`articleID`) USING BTREE,
  CONSTRAINT `commentArticle` FOREIGN KEY (`articleID`) REFERENCES `articles` (`articleID`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `commentUser` FOREIGN KEY (`userID`) REFERENCES `users` (`userID`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of comments
-- ----------------------------
INSERT INTO `comments` VALUES (1, 2, 2, 'hhhhhhhhhhhhhhhhhhhhhhhhhh', '2020-11-06 16:32:49');
INSERT INTO `comments` VALUES (2, 2, 1, 'fffffffffffffffffffffffffffffffffffffffffff', '2020-10-14 16:33:08');

-- ----------------------------
-- Table structure for labels
-- ----------------------------
DROP TABLE IF EXISTS `labels`;
CREATE TABLE `labels`  (
  `labelID` int(10) NOT NULL AUTO_INCREMENT COMMENT '标签ID',
  `labelName` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '标签名',
  `articleID` int(10) NULL DEFAULT NULL COMMENT '博客ID',
  PRIMARY KEY (`labelID`) USING BTREE,
  INDEX `articleLabel`(`articleID`) USING BTREE,
  CONSTRAINT `articleLabel` FOREIGN KEY (`articleID`) REFERENCES `articles` (`articleID`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 6 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of labels
-- ----------------------------
INSERT INTO `labels` VALUES (1, 'JavaScript', 1);
INSERT INTO `labels` VALUES (2, 'HTML', 1);
INSERT INTO `labels` VALUES (3, 'CSS', 1);
INSERT INTO `labels` VALUES (4, 'Vue.js', 2);
INSERT INTO `labels` VALUES (5, 'ES6', 3);

-- ----------------------------
-- Table structure for sorts
-- ----------------------------
DROP TABLE IF EXISTS `sorts`;
CREATE TABLE `sorts`  (
  `sortID` int(10) NOT NULL AUTO_INCREMENT COMMENT '分类ID',
  `sortName` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '分类类别',
  `sortDescription` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '分类描述',
  PRIMARY KEY (`sortID`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 6 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of sorts
-- ----------------------------
INSERT INTO `sorts` VALUES (1, '前端', 'web前端技术');
INSERT INTO `sorts` VALUES (2, '后端', 'Java等服务端技术');
INSERT INTO `sorts` VALUES (3, '人工智能', '机器语言及算法等的学习');
INSERT INTO `sorts` VALUES (4, '数据库', 'MySQL，redis的数据库语言学习');
INSERT INTO `sorts` VALUES (5, 'Linux', 'Linux基本操作命令');

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users`  (
  `userID` int(10) NOT NULL AUTO_INCREMENT COMMENT '用户ID',
  `userName` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '用户名',
  `userPassword` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '用户密码',
  `userEmail` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '用户邮箱',
  `userPhoto` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '用户头像',
  `userTel` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '用户电话',
  `userNickname` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '用户昵称',
  PRIMARY KEY (`userID`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES (1, '张三', '123456', 'zs@163.com', '/img/z.jpg', '14555206930', 'ss');
INSERT INTO `users` VALUES (2, '李四', '123123', 'ls@qq.com', '/img/l.jpg', '19814053610', 'ls');
INSERT INTO `users` VALUES (3, '王五', '789789', 'ww@126.com', '/img/w.jpg', '19836254730', 'ww');

SET FOREIGN_KEY_CHECKS = 1;
