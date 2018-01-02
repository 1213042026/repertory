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
  `rolenumber` varchar(200) DEFAULT NULL unique,
  `username` varchar(20) DEFAULT NULL,
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

/*Data for the table `t_role` */

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

/*Data for the table `t_role` */

insert  into `t_role_permission`(`rolenumber`, `permissionnumber`) values ("R001",'P001');
insert  into `t_role_permission`(`rolenumber`, `permissionnumber`) values ("R001",'P002');
insert  into `t_role_permission`(`rolenumber`, `permissionnumber`) values ("R001",'P003');
insert  into `t_role_permission`(`rolenumber`, `permissionnumber`) values ("R002",'P002');
insert  into `t_role_permission`(`rolenumber`, `permissionnumber`) values ("R003",'P003');





/*Table structure for table `t_customer` */

DROP TABLE IF EXISTS `t_customer`;

CREATE TABLE `t_customer` (
  `customerId` int(20) NOT NULL AUTO_INCREMENT,
  `customerNumber` varchar(100) DEFAULT NULL,
  `customerName` varchar(20) DEFAULT NULL,
  `linkman` varchar(20) DEFAULT NULL,
  `phone` varchar(50) DEFAULT NULL,
  `customerDesc` varchar(1000) DEFAULT NULL,
  PRIMARY KEY (`customerId`),
  KEY `FK_t_customer` (`customerNumber`)
) ENGINE=InnoDB AUTO_INCREMENT=52 DEFAULT CHARSET=utf8;

/*Data for the table `t_customer` */

insert  into `t_customer`(`customerId`,`customerNumber`,`customerName`,`linkman`,`phone`,`customerDesc`) values (37,'1110','供应商1','供应商1','1234567','主要负责化妆品类供应商好人'),(38,'1111','供应商2','供应商2','124567','主要负责服装类的供应商'),(49,'1112','供应商3','供应商3','12121313','主要负责食品方面的供应商'),(50,'1111','供应商4','供应商4','120','好');

/*Table structure for table `t_indb` */

DROP TABLE IF EXISTS `t_indb`;

CREATE TABLE `t_indb` (
  `indbId` int(20) NOT NULL AUTO_INCREMENT,
  `mailId` int(20) DEFAULT NULL,
  `inPrice` float DEFAULT NULL,
  `indbDate` datetime DEFAULT NULL,
  `inNumbers` int(11) DEFAULT NULL,
  `indbDesc` varchar(1000) DEFAULT NULL,
  PRIMARY KEY (`indbId`),
  KEY `FK_t_indb` (`mailId`),
  CONSTRAINT `FK_t_indb` FOREIGN KEY (`mailId`) REFERENCES `t_mail` (`mailId`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

/*Data for the table `t_indb` */

insert  into `t_indb`(`indbId`,`mailId`,`inPrice`,`indbDate`,`inNumbers`,`indbDesc`) values (1,3,100,'1992-08-31 00:00:00',20,'有货'),(3,2,300,'2014-02-08 00:00:00',50,'有货，不缺货'),(4,4,500,'2014-02-08 00:00:00',50,'有货啊啊！！！'),(6,8,20,'2014-03-01 00:00:00',30,'阿达我的'),(7,2,20,'2014-03-01 00:00:00',30,'0');

/*Table structure for table `t_mail` */

DROP TABLE IF EXISTS `t_mail`;

CREATE TABLE `t_mail` (
  `mailId` int(20) NOT NULL AUTO_INCREMENT,
  `mailnumber` varchar(100) DEFAULT NULL,
  `mailName` varchar(20) DEFAULT NULL,
  `customerId` int(20) DEFAULT NULL,
  `mailtypeId` int(20) DEFAULT NULL,
  `mailDesc` varchar(1000) DEFAULT NULL,
  PRIMARY KEY (`mailId`),
  KEY `FK_t_mail` (`customerId`),
  KEY `FK_t_mail1` (`mailtypeId`),
  CONSTRAINT `FK_t_mail` FOREIGN KEY (`customerId`) REFERENCES `t_customer` (`customerId`),
  CONSTRAINT `FK_t_mail1` FOREIGN KEY (`mailtypeId`) REFERENCES `t_mailtype` (`mailtypeId`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;

/*Data for the table `t_mail` */

insert  into `t_mail`(`mailId`,`mailnumber`,`mailName`,`customerId`,`mailtypeId`,`mailDesc`) values (1,'717122','雅思兰黛',37,1,'好东西！！'),(2,'88662','玉兰油',37,1,'好东西！！'),(3,'2525','卫衣',38,2,'男人的选择！！'),(4,'11','李宁',38,2,'好鞋子'),(6,'110','盼盼法式小面包',49,3,'好吃啊啊'),(7,'1212','摩托罗拉',50,4,'手机啊！！'),(8,'717122','雅思兰黛',37,1,'好东西！！');

/*Table structure for table `t_mailtype` */

DROP TABLE IF EXISTS `t_mailtype`;

CREATE TABLE `t_mailtype` (
  `mailtypeId` int(20) NOT NULL AUTO_INCREMENT,
  `mailtypeName` varchar(20) DEFAULT NULL,
  `mailtypeDesc` varchar(1000) DEFAULT NULL,
  PRIMARY KEY (`mailtypeId`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

/*Data for the table `t_mailtype` */

insert  into `t_mailtype`(`mailtypeId`,`mailtypeName`,`mailtypeDesc`) values (1,'化妆品','女士专用啊'),(2,'服饰品','男女通用'),(3,'食品类','吃的东西'),(4,'手机啊','好手机');

/*Table structure for table `t_outdb` */

DROP TABLE IF EXISTS `t_outdb`;

CREATE TABLE `t_outdb` (
  `outdbId` int(20) NOT NULL AUTO_INCREMENT,
  `mailId` int(20) DEFAULT NULL,
  `salesPrice` float DEFAULT NULL,
  `outdbDate` datetime DEFAULT NULL,
  `outNumbers` int(11) DEFAULT NULL,
  `outdbDesc` varchar(1000) DEFAULT NULL,
  `quarter` varchar(1000) DEFAULT NULL,
  PRIMARY KEY (`outdbId`),
  KEY `FK_t_outdb` (`mailId`),
  CONSTRAINT `FK_t_outdb` FOREIGN KEY (`mailId`) REFERENCES `t_mail` (`mailId`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

/*Data for the table `t_outdb` */

insert  into `t_outdb`(`outdbId`,`mailId`,`salesPrice`,`outdbDate`,`outNumbers`,`outdbDesc`,`quarter`) values (1,1,123,'2014-03-01 00:00:00',11,'首都师大','第一季度'),(2,4,1000,'2014-02-09 00:00:00',1,'李四的备注','第一季度'),(3,4,20,'2014-03-02 00:00:00',50,'阿达我的啊的哇撒大网啊啊','第一季度');

/*Table structure for table `t_stock` */

DROP TABLE IF EXISTS `t_stock`;

CREATE TABLE `t_stock` (
  `stockId` int(20) NOT NULL AUTO_INCREMENT,
  `mailId` int(20) DEFAULT NULL,
  `stockNumbers` int(11) DEFAULT NULL,
  `salesPrice` float DEFAULT NULL,
  `inPrice` float DEFAULT NULL,
  `stockDesc` varchar(1000) DEFAULT NULL,
  PRIMARY KEY (`stockId`),
  KEY `FK_t_stock` (`mailId`),
  CONSTRAINT `FK_t_stock` FOREIGN KEY (`mailId`) REFERENCES `t_mail` (`mailId`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

/*Data for the table `t_stock` */

insert  into `t_stock`(`stockId`,`mailId`,`stockNumbers`,`salesPrice`,`inPrice`,`stockDesc`) values (1,3,5,500,100,'好好'),(2,1,60,500,100,'222'),(3,1,20,202,100,'打我试试'),(4,7,30,600,400,'有货啊'),(5,2,10,30,20,'000');
