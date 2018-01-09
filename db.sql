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


DROP TABLE IF EXISTS `t_raw_material`;

CREATE TABLE `t_raw_material` (
  `id` int(20) NOT NULL AUTO_INCREMENT,
  `number` varchar(200) DEFAULT NULL unique,
  `name` varchar(200) DEFAULT NULL,
  `price` varchar(50) DEFAULT NULL,
  `buyer` varchar(100) DEFAULT NULL,
  `buydate` datetime DEFAULT NULL,
  `catagory` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

/*Data for the table `t_raw_material` */

insert  into `t_raw_material`(`number`, `name`, `price`, `buyer`, `buydate`, `catagory`) values ("RM001",'原材料１', '500.0', '张三', '2012-09-30 09:00:00', '封口材料');


 CREATE TABLE `t_receive_order` (
  `id` int(20) NOT NULL AUTO_INCREMENT,
  `number` varchar(200) DEFAULT NULL unique,
  `rawmaterialnumber` varchar(200) DEFAULT NULL,
  `rawmaterialname` varchar(200) DEFAULT NULL,
  `singleprice` varchar(50) DEFAULT NULL,
  `count` varchar(50) DEFAULT NULL,
  `buydate` datetime DEFAULT NULL,
  `suppliernumber` varchar(50) DEFAULT NULL,
  `totalprice` varchar(50) DEFAULT NULL,
  `storenumber` varchar(50) DEFAULT NULL,
  `placenumber` varchar(50) DEFAULT NULL,
  `reviewstatus` varchar(50) DEFAULT '未审核',
  `isreceive` varchar(50) DEFAULT '未收料',
  `ispick` varchar(50) DEFAULT '未领料',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

/*Data for the table `t_receive_order` */

insert  into `t_receive_order`(`number`, `rawmaterialnumber`, `rawmaterialname`, `singleprice`, `count`, `buydate`, `suppliernumber`, `totalprice`, `storenumber`, `placenumber`) values ("O136552",'RM001', '原材料１', '50.0', '4', '2012-09-30 09:00:00','SP001','200','S001','P001');


DROP TABLE IF EXISTS `t_raw_inventory`;

CREATE TABLE `t_raw_inventory` (
  `id` int(20) NOT NULL AUTO_INCREMENT,
  `rawmaterialnumber` varchar(200) DEFAULT NULL unique,
  `restcount` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

/*Data for the table `t_raw_inventory` */

insert  into `t_raw_inventory`(`rawmaterialnumber`, `restcount`) values ("RM001",'30');


DROP TABLE IF EXISTS `t_supplier`;

CREATE TABLE `t_supplier` (
  `id` int(20) NOT NULL AUTO_INCREMENT,
  `number` varchar(200) DEFAULT NULL unique,
  `name` varchar(50) DEFAULT NULL,
  `tel` varchar(50) DEFAULT NULL,
  `address` varchar(80) DEFAULT NULL,
  `fax` varchar(50) DEFAULT NULL,
  `remark` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

/*Data for the table `t_supplier` */

insert  into `t_supplier`(`number`, `name`, `tel`, `address`, `fax`, `remark`) values ("SP001",'江苏XX公司','15952536125','江苏省苏州市','010-888999','分销');


DROP TABLE IF EXISTS `t_finished_material`;

CREATE TABLE `t_finished_material` (
  `id` int(20) NOT NULL AUTO_INCREMENT,
  `number` varchar(200) DEFAULT NULL unique,
  `name` varchar(200) DEFAULT NULL,
  `price` varchar(50) DEFAULT NULL,
  `danwei` varchar(100) DEFAULT NULL,
  `catagory` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

/*Data for the table `t_finished_material` */

insert  into `t_finished_material`(`number`, `name`, `price`, `danwei`, `catagory`) values ("FM001",'成品１', '500.0', 'danwei1', '类别1');

  
DROP TABLE IF EXISTS `t_into_storage`;

CREATE TABLE `t_into_storage` (
  `id` int(20) NOT NULL AUTO_INCREMENT,
  `finishedmaterialnumber` varchar(200) DEFAULT NULL unique,
  `finishedmaterialname` varchar(200) DEFAULT NULL,
  `count` int(50) DEFAULT NULL,
  `producecenter` varchar(50) DEFAULT NULL,
  `storenumber` varchar(50) DEFAULT NULL,
  `placenumber` varchar(50) DEFAULT NULL,
  `remark` varchar(100) DEFAULT NULL,
  `isinto` varchar(100) DEFAULT "未入库",
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

/*Data for the table `t_into_storage` */

insert  into `t_into_storage`(`finishedmaterialnumber`, `finishedmaterialname`, `count`, `producecenter`, `storenumber`, `placenumber`, `remark`) values ("FM001",'成品１', 50, 'china', 'S001', 'P001', 'none');


DROP TABLE IF EXISTS `t_sale_order`;

  CREATE TABLE `t_sale_order` (
  `id` int(20) NOT NULL AUTO_INCREMENT,
  `number` varchar(200) DEFAULT NULL,
  `finishedmaterialnumber` varchar(200) DEFAULT NULL unique,
  `finishedmaterialname` varchar(200) DEFAULT NULL,
  `singleprice` varchar(50) DEFAULT NULL,
  `count` int(50) DEFAULT NULL,
  `date` datetime DEFAULT NULL,
  `customernumber` varchar(100) DEFAULT NULL,
  `totalprice` varchar(20) DEFAULT NULL,
  `storenumber` varchar(50) DEFAULT NULL,
  `placenumber` varchar(50) DEFAULT NULL,
  `reviewstatus` varchar(20) DEFAULT "未审核",
  `isout` varchar(20) DEFAULT "未出库",
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

/*Data for the table `t_sale_order` */

insert  into `t_sale_order`(`number`, `finishedmaterialnumber`, `finishedmaterialname`,`singleprice`, `count`,  `date`, `customernumber`, `totalprice`, `storenumber`, `placenumber`) values ("SO001","FM001",'成品１', '50', 20, '2017-01-09 15:10:20', 'C001', '1000','S001',"P001");