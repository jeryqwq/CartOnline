/*
Navicat MySQL Data Transfer

Source Server         : localhost_3333
Source Server Version : 50525
Source Host           : localhost:3333
Source Database       : zidan

Target Server Type    : MYSQL
Target Server Version : 50525
File Encoding         : 65001

Date: 2019-02-09 22:13:10
*/

SET FOREIGN_KEY_CHECKS=0;
-- ----------------------------
-- Table structure for `cartinfo`
-- ----------------------------
DROP TABLE IF EXISTS `cartinfo`;
CREATE TABLE `cartinfo` (
  `id` int(6) NOT NULL AUTO_INCREMENT,
  `cateId` int(6) NOT NULL,
  `pingpai` varchar(200) DEFAULT NULL,
  `title` varchar(220) DEFAULT NULL,
  `desc` varchar(500) DEFAULT NULL,
  `status` int(1) NOT NULL DEFAULT '0' COMMENT '0可预约，1已被预约，2商品下架',
  `price` int(8) NOT NULL,
  `imgs` varchar(200) DEFAULT NULL,
  `richText` longtext,
  `review` int(8) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `cateId` (`cateId`),
  CONSTRAINT `cateId` FOREIGN KEY (`cateId`) REFERENCES `category` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of cartinfo
-- ----------------------------

-- ----------------------------
-- Table structure for `category`
-- ----------------------------
DROP TABLE IF EXISTS `category`;
CREATE TABLE `category` (
  `id` int(6) NOT NULL AUTO_INCREMENT,
  `cateNo` varchar(100) DEFAULT NULL,
  `cateName` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of category
-- ----------------------------

-- ----------------------------
-- Table structure for `order`
-- ----------------------------
DROP TABLE IF EXISTS `order`;
CREATE TABLE `order` (
  `id` int(6) NOT NULL AUTO_INCREMENT,
  `cartId` int(6) NOT NULL,
  `userId` int(6) NOT NULL,
  `price` int(8) NOT NULL,
  `startTime` datetime DEFAULT NULL,
  `endTime` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of order
-- ----------------------------

-- ----------------------------
-- Table structure for `status`
-- ----------------------------
DROP TABLE IF EXISTS `status`;
CREATE TABLE `status` (
  `id` int(6) NOT NULL AUTO_INCREMENT,
  `cartId` int(6) NOT NULL,
  `startTime` datetime DEFAULT NULL,
  `endTime` datetime DEFAULT NULL,
  `count` int(5) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of status
-- ----------------------------

-- ----------------------------
-- Table structure for `user`
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int(6) NOT NULL AUTO_INCREMENT,
  `name` varchar(20) DEFAULT NULL,
  `pwd` varchar(20) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `isAdmin` int(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('1', 'cj', '123', '13799418338', 'jery1997@foxmial.com', '1');
INSERT INTO `user` VALUES ('2', 'zd', '123', '137954654', 'zidan@qq,,com', '0');
INSERT INTO `user` VALUES ('3', 'cj1', '123', '13799418338', 'chenjie@qq.com', '0');
