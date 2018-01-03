/*
SQLyog 企业版 - MySQL GUI v8.14 
MySQL - 5.1.51-community : Database - db_repertory
*********************************************************************
*/


/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`db_repertory` /*!40100 DEFAULT CHARACTER SET utf8 */;

USE `db_repertory`;

/*Table structure for table `t_employee` */

DROP TABLE IF EXISTS `t_employ`;

CREATE TABLE `t_employee` (
  `id` int(20) NOT NULL AUTO_INCREMENT,
  `number` varchar(200) DEFAULT NULL unique,
  `rolenumber` varchar(200) DEFAULT NULL,
  `username` varchar(20) DEFAULT NULL unique,
  `userpwd` varchar(20) DEFAULT NULL,
  `joindate` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

/*Data for the table `t_employee` */

insert  into `t_employee`(`number`, `rolenumber`, `username`,`userpwd`, `joindate`) values ("E001",'R001','tom', '123', '2012-08-31 09:00:00');

DROP TABLE IF EXISTS `t_role`;

CREATE TABLE `t_role` (
  `id` int(20) NOT NULL AUTO_INCREMENT,
  `number` varchar(200) DEFAULT NULL unique,
  `name` varchar(200) DEFAULT NULL unique,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

/*Data for the table `t_role` */

insert  into `t_role`(`number`, `name`) values ("R001",'仓库主管');
insert  into `t_role`(`number`, `name`) values ("R002",'原材料仓库管理员');
insert  into `t_role`(`number`, `name`) values ("R003",'成品仓库管理员');

DROP TABLE IF EXISTS `t_permission`;

CREATE TABLE `t_permission` (
  `id` int(20) NOT NULL AUTO_INCREMENT,
  `number` varchar(200) DEFAULT NULL unique,
  `name` varchar(200) DEFAULT NULL unique,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

/*Data for the table `t_permission` */

insert  into `t_permission`(`number`, `name`) values ("P001",'仓库管理');
insert  into `t_permission`(`number`, `name`) values ("P002",'原材料仓库管理');
insert  into `t_permission`(`number`, `name`) values ("P003",'成品仓库管理');

DROP TABLE IF EXISTS `t_role_permission`;

CREATE TABLE `t_role_permission` (
  `id` int(20) NOT NULL AUTO_INCREMENT,
  `rolenumber` varchar(200) DEFAULT NULL,
  `permissionnumber` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

/*Data for the table `t_role_permission` */

insert  into `t_role_permission`(`rolenumber`, `permissionnumber`) values ("R001",'P001');
insert  into `t_role_permission`(`rolenumber`, `permissionnumber`) values ("R001",'P002');
insert  into `t_role_permission`(`rolenumber`, `permissionnumber`) values ("R001",'P003');
insert  into `t_role_permission`(`rolenumber`, `permissionnumber`) values ("R002",'P002');
insert  into `t_role_permission`(`rolenumber`, `permissionnumber`) values ("R003",'P003');


DROP TABLE IF EXISTS `t_store`;

CREATE TABLE `t_store` (
  `id` int(20) NOT NULL AUTO_INCREMENT,
  `number` varchar(200) DEFAULT NULL unique,
  `name` varchar(200) DEFAULT NULL,
  `remark` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

/*Data for the table `t_store` */

insert  into `t_store`(`number`, `name`, `remark`) values ("S001",'01仓库', '地处江苏');
insert  into `t_store`(`number`, `name`, `remark`) values ("S002",'02仓库', '占地较大');
insert  into `t_store`(`number`, `name`, `remark`) values ("S003",'03仓库', '价格中等');


DROP TABLE IF EXISTS `t_place`;

CREATE TABLE `t_place` (
  `id` int(20) NOT NULL AUTO_INCREMENT,
  `number` varchar(200) DEFAULT NULL,
  `storenumber` varchar(200) DEFAULT NULL,
  `name` varchar(200) DEFAULT NULL,
  `remark` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

/*Data for the table `t_place` */

insert  into `t_place`(`number`, `storenumber`, `name`, `remark`) values ("P001",'S001', '1号仓位', '面积大');
insert  into `t_place`(`number`, `storenumber`, `name`, `remark`) values ("P001",'S001', '1号仓位', '面积小');
insert  into `t_place`(`number`, `storenumber`, `name`, `remark`) values ("P003",'S002', '3号仓位', '面积一半');


