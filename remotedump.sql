CREATE DATABASE  IF NOT EXISTS `apiaries_16` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `apiaries_16`;
-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: apiaries_16
-- ------------------------------------------------------
-- Server version	8.0.35

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `apiary stations`
--

DROP TABLE IF EXISTS `apiary stations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `apiary stations` (
  `station_id` int NOT NULL AUTO_INCREMENT,
  `supervisor(int)` int DEFAULT NULL,
  `supervisor(ext)` int DEFAULT NULL,
  `location` varchar(100) NOT NULL,
  `longitude` decimal(50,8) DEFAULT NULL,
  `latitude` decimal(10,8) DEFAULT NULL,
  `station_size` varchar(30) NOT NULL,
  `number_of_hive_boxes` decimal(10,0) DEFAULT NULL,
  `status` enum('active','inactive') DEFAULT 'inactive',
  `station_maintainace_history` varchar(200) DEFAULT NULL,
  `last_inspection_date` datetime DEFAULT NULL,
  `next_inspection_date` datetime DEFAULT NULL,
  `notes` text,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`station_id`),
  KEY `supervisor(int)` (`supervisor(int)`),
  KEY `supervisor(ext)` (`supervisor(ext)`),
  CONSTRAINT `apiary stations_ibfk_1` FOREIGN KEY (`supervisor(int)`) REFERENCES `employees` (`emp_id`),
  CONSTRAINT `apiary stations_ibfk_2` FOREIGN KEY (`supervisor(ext)`) REFERENCES `employees` (`emp_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `apiary stations`
--

LOCK TABLES `apiary stations` WRITE;
/*!40000 ALTER TABLE `apiary stations` DISABLE KEYS */;
/*!40000 ALTER TABLE `apiary stations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `apiary_setup_components`
--

DROP TABLE IF EXISTS `apiary_setup_components`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `apiary_setup_components` (
  `component_id` int NOT NULL AUTO_INCREMENT,
  `service_id` int DEFAULT NULL,
  `component_name` varchar(100) NOT NULL,
  `description` text NOT NULL,
  `stock` decimal(10,0) DEFAULT NULL,
  `price(NGN)` decimal(10,2) DEFAULT NULL,
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`component_id`),
  KEY `service_id` (`service_id`),
  CONSTRAINT `apiary_setup_components_ibfk_1` FOREIGN KEY (`service_id`) REFERENCES `services` (`service_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `apiary_setup_components`
--

LOCK TABLES `apiary_setup_components` WRITE;
/*!40000 ALTER TABLE `apiary_setup_components` DISABLE KEYS */;
INSERT INTO `apiary_setup_components` VALUES (1,2,'Langstroth Hive Boxes','Standard Langstroth hive boxes for bee colony housing.',10,30000.00,'2024-08-10 23:33:40','2024-08-10 23:33:40'),(2,2,'Beekeeping Tools Set','Essential tools for beekeeping operations (smoker, hive tool, bee brush, etc.).',1,15000.00,'2024-08-10 23:33:40','2024-08-10 23:33:40'),(3,2,'Protective Gear Kit','Full protective gear set for beekeepers (veil, suit, gloves, boots).',1,10000.00,'2024-08-10 23:33:40','2024-08-10 23:33:40');
/*!40000 ALTER TABLE `apiary_setup_components` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `apiary_stations`
--

DROP TABLE IF EXISTS `apiary_stations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `apiary_stations` (
  `station_id` int NOT NULL AUTO_INCREMENT,
  `station_name` varchar(50) DEFAULT NULL,
  `supervisor(int)` int DEFAULT NULL,
  `supervisor(ext)` int DEFAULT NULL,
  `location` varchar(100) NOT NULL,
  `longitude` decimal(50,8) DEFAULT NULL,
  `latitude` decimal(10,8) DEFAULT NULL,
  `station_size` varchar(30) NOT NULL,
  `number_of_hive_boxes` decimal(10,0) DEFAULT NULL,
  `status` enum('active','inactive','terminated') DEFAULT 'active',
  `station_maintainace_history` varchar(200) DEFAULT NULL,
  `last_inspection_date` datetime DEFAULT NULL,
  `next_inspection_date` datetime DEFAULT NULL,
  `notes` text,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`station_id`),
  KEY `supervisor(int)` (`supervisor(int)`),
  KEY `supervisor(ext)` (`supervisor(ext)`),
  CONSTRAINT `apiary_stations_ibfk_1` FOREIGN KEY (`supervisor(int)`) REFERENCES `employees` (`emp_id`),
  CONSTRAINT `apiary_stations_ibfk_2` FOREIGN KEY (`supervisor(ext)`) REFERENCES `employees` (`emp_id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `apiary_stations`
--

LOCK TABLES `apiary_stations` WRITE;
/*!40000 ALTER TABLE `apiary_stations` DISABLE KEYS */;
INSERT INTO `apiary_stations` VALUES (11,'tanke',1,5,'tanke',-122.41000000,37.77490000,'Medium',10,'active','Regular maintenance performed','2023-10-15 09:00:00','2024-04-15 09:00:00','Located near the river','2024-05-09 17:59:47','2024-05-10 09:32:44'),(12,'bubu',1,4,'agba',-121.95000000,37.35410000,'Large',10,'active','Inspected for hive health and cleanliness','2023-09-20 10:30:00','2024-03-20 10:30:00','Situated in a rural area','2024-05-09 17:59:47','2024-05-10 09:33:32'),(13,'rabi',1,4,'taiwo',-123.11000000,38.57800000,'Small',10,'inactive','Undergoing repairs and upgrades','2023-12-05 11:45:00','2024-06-05 11:45:00','Nearby forest area','2024-05-09 17:59:47','2024-05-10 09:33:35'),(14,'lamise',1,4,'alapa',-122.33000000,37.48490000,'Medium',10,'active','No recent maintenance history','2023-11-30 13:15:00','2024-05-30 13:15:00','Adjacent to farmland','2024-05-09 17:59:47','2024-05-10 09:33:12'),(15,'celestia',1,5,'pipeline',-122.03000000,36.97410000,'Large',10,'inactive','Scheduled for inspection next week','2023-10-25 14:45:00','2024-04-25 14:45:00','Coastal location with good sunlight','2024-05-09 17:59:47','2024-05-10 09:33:09'),(17,'kogi',NULL,NULL,'kogi',-123.45670000,38.12340000,'Large',20,'active','Minor repairs on hive boxes','2023-09-20 10:30:00','2024-03-20 10:30:00','Station located in a remote area with good forage','2024-08-08 13:22:29','2024-08-08 13:22:29');
/*!40000 ALTER TABLE `apiary_stations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `catch reports`
--

DROP TABLE IF EXISTS `catch reports`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `catch reports` (
  `report_id` int NOT NULL AUTO_INCREMENT,
  `hunter_id` int DEFAULT NULL,
  `assigned_supervisor` int DEFAULT NULL,
  `total_boxes_assigned` decimal(10,0) DEFAULT NULL,
  `colonized_boxes` decimal(10,0) DEFAULT NULL,
  `uncolonized_boxes` decimal(10,0) DEFAULT NULL,
  `delivered_to_apiary` enum('all','some','none') DEFAULT 'none',
  `date_assigned` date DEFAULT NULL,
  `catch_date` date DEFAULT NULL,
  `catch_location` varchar(100) DEFAULT NULL,
  `catch_status` enum('all pending','all successfull','some pending') DEFAULT NULL,
  `season` enum('dry','rain') DEFAULT 'rain',
  `notes` text,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`report_id`),
  KEY `hunter_id` (`hunter_id`),
  KEY `assigned_supervisor` (`assigned_supervisor`),
  CONSTRAINT `catch reports_ibfk_1` FOREIGN KEY (`hunter_id`) REFERENCES `swarm hunters` (`hunter_id`),
  CONSTRAINT `catch reports_ibfk_2` FOREIGN KEY (`assigned_supervisor`) REFERENCES `employees` (`emp_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `catch reports`
--

LOCK TABLES `catch reports` WRITE;
/*!40000 ALTER TABLE `catch reports` DISABLE KEYS */;
/*!40000 ALTER TABLE `catch reports` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `catch_reports`
--

DROP TABLE IF EXISTS `catch_reports`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `catch_reports` (
  `report_id` int NOT NULL AUTO_INCREMENT,
  `hunter_id` int DEFAULT NULL,
  `assigned_supervisor` int DEFAULT NULL,
  `total_boxes_assigned` decimal(10,0) DEFAULT NULL,
  `colonized_boxes` decimal(10,0) DEFAULT NULL,
  `uncolonized_boxes` decimal(10,0) DEFAULT NULL,
  `delivered_to_apiary` enum('all','some','none') DEFAULT 'none',
  `date_assigned` date DEFAULT NULL,
  `catch_date` date DEFAULT NULL,
  `catch_location` varchar(100) DEFAULT NULL,
  `catch_status` enum('all pending','all successfull','some pending') DEFAULT NULL,
  `season` enum('dry','rain') DEFAULT 'rain',
  `notes` text,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`report_id`),
  KEY `hunter_id` (`hunter_id`),
  KEY `assigned_supervisor` (`assigned_supervisor`),
  CONSTRAINT `catch_reports_ibfk_1` FOREIGN KEY (`hunter_id`) REFERENCES `swarm_hunters` (`hunter_id`),
  CONSTRAINT `catch_reports_ibfk_2` FOREIGN KEY (`assigned_supervisor`) REFERENCES `employees` (`emp_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `catch_reports`
--

LOCK TABLES `catch_reports` WRITE;
/*!40000 ALTER TABLE `catch_reports` DISABLE KEYS */;
INSERT INTO `catch_reports` VALUES (1,1,4,10,8,2,'all','2023-04-01','2023-04-15','Forest area near Lakeview Park','all successfull','rain','Colonies transferred to Apiary Station 3.','2024-05-10 10:40:44','2024-05-10 10:40:44'),(2,2,4,10,10,0,'some','2023-03-20','2023-04-05','Rural farmland near Oakville','some pending','rain','Additional swarm boxes needed for complete colonization.','2024-05-10 10:40:44','2024-05-10 10:40:44'),(3,3,4,10,5,5,'all','2023-04-05','2023-04-20','Urban area near downtown','all successfull','dry','No issues reported during catch operation.','2024-05-10 10:40:44','2024-05-10 10:40:44'),(4,4,5,10,5,5,'none','2023-04-10','2023-04-25','Parkland near Riverside Gardens','some pending','rain','Weather conditions affected swarm behavior.','2024-05-10 10:40:44','2024-05-10 10:40:44'),(5,5,5,10,8,2,'all','2023-03-25','2023-04-10','Coastal region near Sunset Beach','all successfull','rain','Caught swarms are healthy and active.','2024-05-10 10:40:44','2024-05-10 10:40:44');
/*!40000 ALTER TABLE `catch_reports` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `consultancy_items`
--

DROP TABLE IF EXISTS `consultancy_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `consultancy_items` (
  `item_id` int NOT NULL AUTO_INCREMENT,
  `service_id` int DEFAULT NULL,
  `item_name` varchar(100) NOT NULL,
  `description` text NOT NULL,
  `numOfTimesRendered` decimal(10,0) DEFAULT NULL,
  `price(NGN)` decimal(10,2) DEFAULT NULL,
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`item_id`),
  KEY `service_id` (`service_id`),
  CONSTRAINT `consultancy_items_ibfk_1` FOREIGN KEY (`service_id`) REFERENCES `services` (`service_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `consultancy_items`
--

LOCK TABLES `consultancy_items` WRITE;
/*!40000 ALTER TABLE `consultancy_items` DISABLE KEYS */;
INSERT INTO `consultancy_items` VALUES (1,1,'On-Site Consultation','One-time on-site visit for consultation and assessment.',1,15000.00,'2024-08-11 11:26:56','2024-08-11 11:26:56'),(2,1,'Customized Beekeeping Plan','Development of personalized beekeeping plan based on site assessment.',4,25000.00,'2024-08-11 11:26:56','2024-08-11 11:26:56'),(3,5,'Advanced Beekeeping Training','In-depth training session covering advanced beekeeping techniques.',3,30000.00,'2024-08-11 11:26:56','2024-08-11 11:26:56');
/*!40000 ALTER TABLE `consultancy_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `delivery_address`
--

DROP TABLE IF EXISTS `delivery_address`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `delivery_address` (
  `del_id` int NOT NULL AUTO_INCREMENT,
  `order_id` int DEFAULT NULL,
  `phone` varchar(20) NOT NULL,
  `city` varchar(255) NOT NULL,
  `state` varchar(60) NOT NULL,
  `country` varchar(30) DEFAULT NULL,
  `street` varchar(15) DEFAULT NULL,
  PRIMARY KEY (`del_id`),
  KEY `order_id` (`order_id`),
  CONSTRAINT `delivery_address_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`order_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `delivery_address`
--

LOCK TABLES `delivery_address` WRITE;
/*!40000 ALTER TABLE `delivery_address` DISABLE KEYS */;
INSERT INTO `delivery_address` VALUES (1,1,'+1234567890','New York','NY','United state','123 Main St'),(2,2,'+1987654321','Los Angeles','CA','United state','456 Elm St'),(3,3,'+1123456789','Chicago','IL','United state','789 Oak St'),(4,4,'123-456-7890','New York','KW','USA','123 Bee St'),(5,5,'123-456-7890','Mushin','ABJ','NG','123 Bee St');
/*!40000 ALTER TABLE `delivery_address` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `deliveryaddress`
--

DROP TABLE IF EXISTS `deliveryaddress`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `deliveryaddress` (
  `del_id` int NOT NULL AUTO_INCREMENT,
  `order_id` int DEFAULT NULL,
  `phone` varchar(20) NOT NULL,
  `city` varchar(255) NOT NULL,
  `state` varchar(60) NOT NULL,
  `country` varchar(30) DEFAULT NULL,
  `street` varchar(15) DEFAULT NULL,
  PRIMARY KEY (`del_id`),
  KEY `order_id` (`order_id`),
  CONSTRAINT `deliveryaddress_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`order_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `deliveryaddress`
--

LOCK TABLES `deliveryaddress` WRITE;
/*!40000 ALTER TABLE `deliveryaddress` DISABLE KEYS */;
/*!40000 ALTER TABLE `deliveryaddress` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `employee nok`
--

DROP TABLE IF EXISTS `employee nok`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `employee nok` (
  `nok_id` int NOT NULL AUTO_INCREMENT,
  `emp_id` int DEFAULT NULL,
  `fullname` varchar(100) NOT NULL,
  `email` varchar(255) NOT NULL,
  `address` varchar(1000) NOT NULL DEFAULT 'please update NOK address',
  `phone` varchar(30) NOT NULL,
  `gender` enum('male','female') DEFAULT 'male',
  `relationship` enum('spouse','parent','guardian','sibling') DEFAULT 'spouse',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`nok_id`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `phone` (`phone`),
  KEY `emp_id` (`emp_id`),
  CONSTRAINT `employee nok_ibfk_1` FOREIGN KEY (`emp_id`) REFERENCES `employees` (`emp_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employee nok`
--

LOCK TABLES `employee nok` WRITE;
/*!40000 ALTER TABLE `employee nok` DISABLE KEYS */;
/*!40000 ALTER TABLE `employee nok` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `employee_nok`
--

DROP TABLE IF EXISTS `employee_nok`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `employee_nok` (
  `nok_id` int NOT NULL AUTO_INCREMENT,
  `emp_id` int DEFAULT NULL,
  `fullname` varchar(100) NOT NULL,
  `email` varchar(255) NOT NULL,
  `address` varchar(1000) NOT NULL DEFAULT 'please update NOK address',
  `phone` varchar(30) NOT NULL,
  `gender` enum('male','female') DEFAULT 'male',
  `relationship` enum('spouse','parent','guardian','sibling') DEFAULT 'spouse',
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`nok_id`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `phone` (`phone`),
  KEY `emp_id` (`emp_id`),
  CONSTRAINT `employee_nok_ibfk_1` FOREIGN KEY (`emp_id`) REFERENCES `employees` (`emp_id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employee_nok`
--

LOCK TABLES `employee_nok` WRITE;
/*!40000 ALTER TABLE `employee_nok` DISABLE KEYS */;
INSERT INTO `employee_nok` VALUES (1,1,'Mary Doe','mary.doe@example.com','123 Main St, City, Country','1234567890','female','spouse','2024-05-10 09:40:11','2024-05-10 09:40:11'),(2,2,'John Smith','john.smith@example.com','456 Elm St, Town, Country','9876543210','male','parent','2024-05-10 09:40:11','2024-05-10 09:40:11'),(3,3,'Alice Johnson','alice.johnson@example.com','789 Oak Ave, Village, Country','5551234567','female','sibling','2024-05-10 09:40:11','2024-05-10 09:40:11'),(4,4,'Michael Brown','michael.brown@example.com','321 Pine Rd, City, Country','4447890123','male','guardian','2024-05-10 09:40:11','2024-05-10 09:40:11'),(5,5,'Emily Wilson','emily.wilson@example.com','555 Cedar Ln, Town, Country','3335556789','female','spouse','2024-05-10 09:40:11','2024-05-10 09:40:11');
/*!40000 ALTER TABLE `employee_nok` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `employees`
--

DROP TABLE IF EXISTS `employees`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `employees` (
  `emp_id` int NOT NULL AUTO_INCREMENT,
  `first_name` varchar(30) NOT NULL,
  `last_name` varchar(30) NOT NULL,
  `dob` date DEFAULT NULL,
  `phone` varchar(30) NOT NULL,
  `email` varchar(30) NOT NULL,
  `address` varchar(1000) NOT NULL DEFAULT 'your address please',
  `role` varchar(100) NOT NULL,
  `department` enum('beekeeping','operation','administration') DEFAULT 'operation',
  `joining_date` date DEFAULT NULL,
  `salary` decimal(10,3) DEFAULT NULL,
  `employment_status` enum('active','inactive','terminated') DEFAULT 'active',
  `employment_type` enum('full staff','contract staff','station supervisor(ext)') DEFAULT 'contract staff',
  `skill` text,
  `notes` text,
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`emp_id`),
  UNIQUE KEY `phone` (`phone`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employees`
--

LOCK TABLES `employees` WRITE;
/*!40000 ALTER TABLE `employees` DISABLE KEYS */;
INSERT INTO `employees` VALUES (1,'John','Doe','1990-05-15','123456789','johndoe@example.com','123 Main St, City, State','beekeeper','beekeeping','2020-03-10',3600.000,'active','contract staff','Beekeeping, Hive Management','Experienced beekeeper with 5+ years of experience','2024-07-23 18:21:19','2024-07-23 18:21:19'),(2,'Jane','Smith','1985-08-22','987654321','janesmith@example.com','456 Oak Ave, City, State','supervisor','operation','2018-06-15',5000.000,'active','contract staff','Team Management, Operational Planning','Oversees apiary operations and workflow','2024-07-23 18:21:19','2024-07-23 18:21:19'),(3,'Michael','Johnson','1993-01-10','5551234567','michaeljohnson@example.com','789 Elm Rd, City, State','manager','administration','2017-09-20',7000.000,'active','contract staff','Leadership, Budget Management','Manages overall company operations and strategy','2024-07-23 18:21:19','2024-07-23 18:21:19'),(4,'Sarah','Lee','1998-04-30','4447890123','sarahlee@example.com','321 Pine Blvd, City, State','beekeeper','beekeeping','2021-01-05',3200.000,'active','contract staff','Beekeeping, Pollination','Skilled in hive maintenance and pollination techniques','2024-07-23 18:21:19','2024-07-23 18:21:19'),(5,'David','Clark','1980-11-18','3335556789','davidclark@example.com','555 Cedar Ln, City, State','beekeeper','beekeeping','2019-08-12',3800.000,'inactive','contract staff','Queen Rearing, Honey Extraction','Specializes in queen rearing and honey extraction','2024-07-23 18:21:19','2024-07-23 18:21:19'),(7,'Alan','smith','1985-05-15','123-456-7890','john.doe@example.com','123 Honey Street, Beeville','supervisor','operation','2020-01-10',50000.000,'active','contract staff','Beekeeping, Supervising','Experienced beekeeper and supervisor. Oversees the day-to-day operations.','2024-08-06 13:15:53','2024-08-06 13:15:53');
/*!40000 ALTER TABLE `employees` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `equipments_tools`
--

DROP TABLE IF EXISTS `equipments_tools`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `equipments_tools` (
  `tool_id` int NOT NULL AUTO_INCREMENT,
  `tool_name` varchar(100) NOT NULL,
  `category` enum('beekeping','carpentary','processing') DEFAULT 'beekeping',
  `quantity` decimal(10,0) DEFAULT NULL,
  `status` enum('used','new','need repair') DEFAULT 'new',
  `storage_location` enum('warehouse','apiary site','factory') DEFAULT 'factory',
  `supplier` varchar(100) DEFAULT NULL,
  `purchase_date` date DEFAULT NULL,
  `purchase_cost` decimal(10,3) DEFAULT NULL,
  `currency` varchar(15) DEFAULT NULL,
  `last_maintanace_date` date DEFAULT NULL,
  `next_maintanace_date` date DEFAULT NULL,
  `retired` tinyint(1) DEFAULT '0',
  `note` text,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`tool_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `equipments_tools`
--

LOCK TABLES `equipments_tools` WRITE;
/*!40000 ALTER TABLE `equipments_tools` DISABLE KEYS */;
INSERT INTO `equipments_tools` VALUES (1,'Beehive Box','beekeping',100,'new','warehouse','Bee Supplies Co.','2023-01-15',50.000,'naira','2023-04-10','2024-04-10',1,'Standard Langstroth hive box','2024-05-10 09:50:51','2024-05-10 09:50:51'),(2,'Bee Smoker','beekeping',50,'used','apiary site','Bee Equipment Ltd.','2022-11-20',30.000,'naira','2023-03-15','2024-03-15',0,'Stainless steel smoker with leather bellows','2024-05-10 09:50:51','2024-05-10 09:50:51'),(3,'Hive Tool','beekeping',75,'new','warehouse','Beekeeping Supplies Inc.','2023-03-05',15.000,'naira','2023-06-20','2024-06-20',0,'Standard hive tool for prying frames','2024-05-10 09:50:51','2024-05-10 09:50:51'),(4,'Table Saw','carpentary',1,'need repair','factory','Woodworking Tools Ltd.','2022-09-10',500.000,'naira','2023-02-05','2024-02-05',0,'Industrial-grade table saw for woodworking','2024-05-10 09:50:51','2024-05-10 09:50:51'),(5,'Extractor Machine','processing',1,'used','factory','Honey Harvesters Corp.','2023-02-25',1500.000,'naira','2023-07-30','2024-07-30',0,'Electric honey extractor with stainless steel drum','2024-05-10 09:50:51','2024-05-10 09:50:51');
/*!40000 ALTER TABLE `equipments_tools` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hives`
--

DROP TABLE IF EXISTS `hives`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `hives` (
  `hive_id` int NOT NULL AUTO_INCREMENT,
  `assigned_hunter` int DEFAULT NULL,
  `hive_type` enum('langstroth','top bar','local') DEFAULT 'langstroth',
  `num_of_frames` decimal(10,0) DEFAULT NULL,
  `colonized` enum('pending','confirmed','installed') DEFAULT 'pending',
  `status` enum('unuse','inuse','empty') DEFAULT NULL,
  `use_condition` enum('need repair','used','new') DEFAULT NULL,
  `first_installation` date DEFAULT NULL,
  `current_location` enum('swarm field','station','warehouse') DEFAULT NULL,
  `last_inspection_date` date DEFAULT NULL,
  `note` text,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`hive_id`),
  KEY `assigned_hunter` (`assigned_hunter`),
  CONSTRAINT `hives_ibfk_1` FOREIGN KEY (`assigned_hunter`) REFERENCES `swarm_hunters` (`hunter_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hives`
--

LOCK TABLES `hives` WRITE;
/*!40000 ALTER TABLE `hives` DISABLE KEYS */;
INSERT INTO `hives` VALUES (1,1,'langstroth',20,'confirmed','inuse','new','2023-04-01','station','2023-04-15','Hive located in Apiary Station 3','2024-05-10 10:46:23','2024-05-10 10:46:23'),(2,2,'top bar',20,'confirmed','inuse','used','2023-03-20','swarm field','2023-04-05','Top bar hive used for experimental purposes','2024-05-10 10:46:23','2024-05-10 10:46:23'),(3,3,'langstroth',20,'pending','unuse','new','2023-04-05','warehouse','2023-04-20','New Langstroth hive awaiting assignment','2024-05-10 10:46:23','2024-05-10 10:46:23'),(4,4,'local',20,'pending','inuse','used','2023-04-10','station','2023-04-25','Traditional local hive used for preservation purposes','2024-05-10 10:46:23','2024-05-22 14:50:49'),(5,5,'langstroth',20,'pending','unuse','need repair','2023-03-25','warehouse','2023-04-10','Langstroth hive requiring repairs before installation','2024-05-10 10:46:23','2024-05-10 10:46:23');
/*!40000 ALTER TABLE `hives` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `honey harvest`
--

DROP TABLE IF EXISTS `honey harvest`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `honey harvest` (
  `harvest_id` int NOT NULL AUTO_INCREMENT,
  `harvest_year` int DEFAULT NULL,
  `station_id` int DEFAULT NULL,
  `station_name` varchar(50) DEFAULT NULL,
  `harvest_date` date DEFAULT NULL,
  `quantity_collected` decimal(10,2) DEFAULT NULL,
  `unit` enum('litres','kg') DEFAULT 'litres',
  `quality_rating` int DEFAULT '5',
  `note` text,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`harvest_id`),
  KEY `station_id` (`station_id`),
  CONSTRAINT `honey harvest_ibfk_1` FOREIGN KEY (`station_id`) REFERENCES `apiary stations` (`station_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `honey harvest`
--

LOCK TABLES `honey harvest` WRITE;
/*!40000 ALTER TABLE `honey harvest` DISABLE KEYS */;
/*!40000 ALTER TABLE `honey harvest` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `honey_harvest`
--

DROP TABLE IF EXISTS `honey_harvest`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `honey_harvest` (
  `harvest_id` int NOT NULL AUTO_INCREMENT,
  `harvest_year` int DEFAULT NULL,
  `station_id` int DEFAULT NULL,
  `station_name` varchar(50) DEFAULT NULL,
  `harvest_date` date DEFAULT NULL,
  `quantity_collected` decimal(10,2) DEFAULT NULL,
  `colouration` varchar(100) DEFAULT NULL,
  `unit` enum('litres','kg') DEFAULT 'litres',
  `quality_rating` int DEFAULT '5',
  `note` text,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`harvest_id`),
  KEY `station_id` (`station_id`),
  CONSTRAINT `honey_harvest_ibfk_1` FOREIGN KEY (`station_id`) REFERENCES `apiary_stations` (`station_id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `honey_harvest`
--

LOCK TABLES `honey_harvest` WRITE;
/*!40000 ALTER TABLE `honey_harvest` DISABLE KEYS */;
INSERT INTO `honey_harvest` VALUES (1,2023,11,'tanke','2023-07-15',50.25,'','litres',4,'Good harvest season with high-quality honey produced.','2024-05-10 10:53:08','2024-05-10 10:53:08'),(2,2023,12,'bubu','2023-08-02',80.75,'','litres',5,'Exceptional yield of honey with excellent flavor profile.','2024-05-10 10:53:08','2024-08-08 13:34:07'),(3,2023,13,'rabi','2023-07-30',65.50,'','litres',4,'Steady production of honey from diverse floral sources.','2024-05-10 10:53:08','2024-08-08 13:34:16'),(4,2023,14,'lamise','2023-08-20',95.00,'','litres',5,'Record-breaking harvest with premium quality honey extracted.','2024-05-10 10:53:08','2024-08-08 13:34:27'),(5,2023,15,'celestia','2023-08-10',70.30,'','litres',4,'Consistent honey output meeting market demands.','2024-05-10 10:53:08','2024-08-08 13:34:39'),(6,2022,15,'celestia','2023-08-10',70.30,'necter gold','litres',4,'Consistent honey output meeting market demands.','2024-08-09 09:13:04','2024-08-09 09:27:46');
/*!40000 ALTER TABLE `honey_harvest` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_items`
--

DROP TABLE IF EXISTS `order_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_items` (
  `item_id` int NOT NULL AUTO_INCREMENT,
  `order_id` int DEFAULT NULL,
  `product_id` int DEFAULT NULL,
  `product_name` varchar(20) DEFAULT NULL,
  `image` varchar(255) NOT NULL,
  `price` decimal(60,4) NOT NULL,
  `amount` int NOT NULL,
  `color` varchar(7) DEFAULT NULL,
  PRIMARY KEY (`item_id`),
  KEY `order_id` (`order_id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `order_items_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`order_id`) ON DELETE CASCADE,
  CONSTRAINT `order_items_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_items`
--

LOCK TABLES `order_items` WRITE;
/*!40000 ALTER TABLE `order_items` DISABLE KEYS */;
INSERT INTO `order_items` VALUES (1,1,10,'bee venom extract','/uploads/productA.jpg',25.0000,2,NULL),(2,1,6,'wildflower honey','/uploads/productB.jpg',12.5000,3,'#00ff00'),(3,1,7,'beeswax block','/uploads/productC.jpg',30.0000,1,NULL),(4,2,8,'Propolis tincture','/uploads/productD.jpg',15.7500,4,'#ffa500'),(5,3,9,'royal jelly capsule','/uploads/productE.jpg',20.0000,1,'#fff'),(6,4,6,'Wildflower Honey','/uploads/product1-image1.jpg',20.9900,2,'#FFA500'),(7,4,8,'Propolis Tincture','https://res.cloudinary.com/dod7yij4e/image/upload/v1723656578/Apiaries%2016%20user%27s%20Images/tmp-13-1723656575405_mkmylv.png',12.7500,1,'#FFD700'),(8,4,10,'Bee Venom Extract','https://res.cloudinary.com/dod7yij4e/image/upload/v1723709996/Apiaries%2016%20user%27s%20Images/tmp-1-1723709991531_wlhxug.png',35.0000,3,'#FFFFE0'),(9,5,7,'Beeswax Block','/uploads/product2-image1.jpg',15.5000,2,'#FFA500'),(10,5,9,'Royal Jelly Capsules','https://res.cloudinary.com/dod7yij4e/image/upload/v1723655581/Apiaries%2016%20user%27s%20Images/tmp-7-1723655577616_pr3x4i.png',24.9900,1,'#FFD700');
/*!40000 ALTER TABLE `order_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `order_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `tax` decimal(60,4) NOT NULL,
  `shippingFee` decimal(60,4) NOT NULL,
  `subTotal` decimal(60,4) NOT NULL,
  `total` decimal(60,4) NOT NULL,
  `paymentStatus` enum('pending','failed','successful','canceled') DEFAULT 'pending',
  `deliveryStatus` enum('pending','failed','delivered','canceled') DEFAULT 'pending',
  `tx_ref` varchar(100) DEFAULT NULL,
  `transaction_id` varchar(100) DEFAULT NULL,
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`order_id`),
  KEY `user_id` (`user_id`) USING BTREE,
  CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (1,3,5.2500,10.5000,75.0000,90.7500,'successful','delivered','tx123456789','trans789012','2024-08-17 03:45:25','2024-08-17 03:45:25'),(2,4,3.5000,8.2500,50.0000,61.7500,'successful','delivered','tx987654321','trans543210','2024-08-17 03:45:25','2024-08-17 03:45:25'),(3,5,7.7500,12.0000,85.5000,105.2500,'pending','pending','tx456789012',NULL,'2024-08-17 03:45:25','2024-08-17 03:45:25'),(4,7,2.5000,5.9900,159.7300,168.2200,'successful','delivered','TX123456789','TRX987654321','2024-08-19 10:47:30','2024-08-19 12:57:09'),(5,7,2.5000,5.9900,55.9900,64.4800,'successful','canceled','TX123456789K','TRX987654321K','2024-08-19 13:42:14','2024-08-19 13:56:21');
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pollination_services`
--

DROP TABLE IF EXISTS `pollination_services`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pollination_services` (
  `pol_service_id` int NOT NULL AUTO_INCREMENT,
  `service_id` int DEFAULT NULL,
  `crop_type` varchar(100) NOT NULL,
  `service_description` text NOT NULL,
  `rendered` decimal(10,0) DEFAULT NULL,
  `price/hct_NGN` decimal(10,2) DEFAULT NULL,
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`pol_service_id`),
  KEY `service_id` (`service_id`),
  CONSTRAINT `pollination_services_ibfk_1` FOREIGN KEY (`service_id`) REFERENCES `services` (`service_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pollination_services`
--

LOCK TABLES `pollination_services` WRITE;
/*!40000 ALTER TABLE `pollination_services` DISABLE KEYS */;
INSERT INTO `pollination_services` VALUES (1,4,'Almond Trees','Pollination service for almond orchards during bloom season.',1,200.00,'2024-08-11 15:29:36','2024-08-11 15:29:36'),(2,4,'Apple Orchards','Pollination service for apple orchards to enhance fruit set.',3,150.00,'2024-08-11 15:29:36','2024-08-11 15:29:36'),(3,4,'Blueberry Farms','Customized pollination service for blueberry farms.',9,120.00,'2024-08-11 15:29:36','2024-08-11 15:29:36');
/*!40000 ALTER TABLE `pollination_services` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product colors`
--

DROP TABLE IF EXISTS `product colors`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product colors` (
  `color_id` int NOT NULL AUTO_INCREMENT,
  `product_id` int DEFAULT NULL,
  `color0` varchar(7) DEFAULT '#222',
  `color1` varchar(7) DEFAULT '#222',
  `color2` varchar(7) DEFAULT '#222',
  PRIMARY KEY (`color_id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `product colors_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product colors`
--

LOCK TABLES `product colors` WRITE;
/*!40000 ALTER TABLE `product colors` DISABLE KEYS */;
/*!40000 ALTER TABLE `product colors` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product images`
--

DROP TABLE IF EXISTS `product images`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product images` (
  `image_id` int NOT NULL AUTO_INCREMENT,
  `product_id` int DEFAULT NULL,
  `image0` varchar(1000) DEFAULT '/uploads/example.jpeg',
  `image1` varchar(1000) DEFAULT '/uploads/example.jpeg',
  `image2` varchar(1000) DEFAULT '/uploads/example.jpeg',
  PRIMARY KEY (`image_id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `product images_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product images`
--

LOCK TABLES `product images` WRITE;
/*!40000 ALTER TABLE `product images` DISABLE KEYS */;
/*!40000 ALTER TABLE `product images` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_colors`
--

DROP TABLE IF EXISTS `product_colors`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_colors` (
  `color_id` int NOT NULL AUTO_INCREMENT,
  `product_id` int DEFAULT NULL,
  `color0` varchar(7) DEFAULT '#222',
  `color1` varchar(7) DEFAULT '#222',
  `color2` varchar(7) DEFAULT '#222',
  PRIMARY KEY (`color_id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `product_colors_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_colors`
--

LOCK TABLES `product_colors` WRITE;
/*!40000 ALTER TABLE `product_colors` DISABLE KEYS */;
INSERT INTO `product_colors` VALUES (1,6,'#ff0000','#00ff00','#0000ff'),(2,7,'#ffa500','#008000','#800080'),(3,8,'#ffff00','#000080','#ff00ff'),(4,9,'#00ffff','#800000','#008080'),(5,10,'#ff0080','#808080','#8000ff'),(9,43,'#FFFFFF','#FFFFFF','#FFFFFF'),(10,44,'#FFFFFF','#FFFFFF','#FFFF2A');
/*!40000 ALTER TABLE `product_colors` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_images`
--

DROP TABLE IF EXISTS `product_images`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_images` (
  `image_id` int NOT NULL AUTO_INCREMENT,
  `product_id` int DEFAULT NULL,
  `image0` varchar(1000) DEFAULT '/uploads/example.jpeg',
  `img0_public_id` text,
  `image1` varchar(1000) DEFAULT '/uploads/example.jpeg',
  `img1_public_id` text,
  `image2` varchar(1000) DEFAULT '/uploads/example.jpeg',
  `img2_public_id` text,
  PRIMARY KEY (`image_id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `product_images_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_images`
--

LOCK TABLES `product_images` WRITE;
/*!40000 ALTER TABLE `product_images` DISABLE KEYS */;
INSERT INTO `product_images` VALUES (1,6,'/uploads/product1-image1.jpg',NULL,'/uploads/product1-image2.jpg',NULL,'/uploads/product1-image3.jpg',NULL),(2,7,'/uploads/product2-image1.jpg',NULL,'/uploads/product2-image2.jpg',NULL,'/uploads/product2-image3.jpg',NULL),(3,8,'https://res.cloudinary.com/dod7yij4e/image/upload/v1723656578/Apiaries%2016%20user%27s%20Images/tmp-13-1723656575405_mkmylv.png','Apiaries 16 user\'s Images/tmp-13-1723656575405_mkmylv','https://res.cloudinary.com/dod7yij4e/image/upload/v1723656585/Apiaries%2016%20user%27s%20Images/tmp-14-1723656575408_iyexdj.png','Apiaries 16 user\'s Images/tmp-14-1723656575408_iyexdj','https://res.cloudinary.com/dod7yij4e/image/upload/v1723656580/Apiaries%2016%20user%27s%20Images/tmp-15-1723656575417_qvoyej.png','Apiaries 16 user\'s Images/tmp-15-1723656575417_qvoyej'),(4,9,'https://res.cloudinary.com/dod7yij4e/image/upload/v1723655581/Apiaries%2016%20user%27s%20Images/tmp-7-1723655577616_pr3x4i.png','Apiaries 16 user\'s Images/tmp-7-1723655577616_pr3x4i','https://res.cloudinary.com/dod7yij4e/image/upload/v1723655581/Apiaries%2016%20user%27s%20Images/tmp-8-1723655577621_iy5bid.png','Apiaries 16 user\'s Images/tmp-8-1723655577621_iy5bid','https://res.cloudinary.com/dod7yij4e/image/upload/v1723655581/Apiaries%2016%20user%27s%20Images/tmp-9-1723655577639_zztffh.png','Apiaries 16 user\'s Images/tmp-9-1723655577639_zztffh'),(13,10,'https://res.cloudinary.com/dod7yij4e/image/upload/v1723709996/Apiaries%2016%20user%27s%20Images/tmp-1-1723709991531_wlhxug.png','Apiaries 16 user\'s Images/tmp-1-1723709991531_wlhxug','https://res.cloudinary.com/dod7yij4e/image/upload/v1723709996/Apiaries%2016%20user%27s%20Images/tmp-2-1723709991539_owo5cf.png','Apiaries 16 user\'s Images/tmp-2-1723709991539_owo5cf','https://res.cloudinary.com/dod7yij4e/image/upload/v1723709995/Apiaries%2016%20user%27s%20Images/tmp-3-1723709991556_to2euv.png','Apiaries 16 user\'s Images/tmp-3-1723709991556_to2euv'),(19,43,'https://res.cloudinary.com/dod7yij4e/image/upload/v1723731969/Apiaries%2016%20user%27s%20Images/tmp-4-1723731962192_nk3kix.png','Apiaries 16 user\'s Images/tmp-4-1723731962192_nk3kix','https://res.cloudinary.com/dod7yij4e/image/upload/v1723731972/Apiaries%2016%20user%27s%20Images/tmp-5-1723731962198_wkrww6.png','Apiaries 16 user\'s Images/tmp-5-1723731962198_wkrww6','https://res.cloudinary.com/dod7yij4e/image/upload/v1723731968/Apiaries%2016%20user%27s%20Images/tmp-6-1723731962213_p4xt7q.png','Apiaries 16 user\'s Images/tmp-6-1723731962213_p4xt7q'),(20,44,'https://res.cloudinary.com/dod7yij4e/image/upload/v1723732077/Apiaries%2016%20user%27s%20Images/tmp-1-1723732072042_eb4kmr.png','Apiaries 16 user\'s Images/tmp-1-1723732072042_eb4kmr','https://res.cloudinary.com/dod7yij4e/image/upload/v1723732079/Apiaries%2016%20user%27s%20Images/tmp-2-1723732072071_ykafxp.png','Apiaries 16 user\'s Images/tmp-2-1723732072071_ykafxp','https://res.cloudinary.com/dod7yij4e/image/upload/v1723732077/Apiaries%2016%20user%27s%20Images/tmp-3-1723732072089_zrsrmi.png','Apiaries 16 user\'s Images/tmp-3-1723732072089_zrsrmi');
/*!40000 ALTER TABLE `product_images` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `product_id` int NOT NULL AUTO_INCREMENT,
  `product_name` varchar(120) NOT NULL,
  `product_type` enum('honey','wax','propolis','royal jelly','venom') DEFAULT 'honey',
  `description` varchar(1000) NOT NULL,
  `quantity` varchar(100) DEFAULT NULL,
  `unit` varchar(10) DEFAULT NULL,
  `price` decimal(60,2) NOT NULL DEFAULT '0.00',
  `total_in_stock` int NOT NULL DEFAULT '15',
  `harvest_year` date DEFAULT NULL,
  `packaging_type` varchar(50) DEFAULT NULL,
  `available` tinyint(1) NOT NULL,
  `averageRating` int NOT NULL DEFAULT '0',
  `numOfReviews` int NOT NULL DEFAULT '0',
  `numOfTimesSold` int NOT NULL DEFAULT '0',
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`product_id`)
) ENGINE=InnoDB AUTO_INCREMENT=45 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (6,'Wildflower Honey','honey','Pure wildflower honey harvested from local apiaries.','500','kg',20.99,46,'2023-01-01','Glass jar',0,4,15,27,'2023-07-10 09:00:00','2024-08-19 13:47:03'),(7,'Beeswax Block','wax','Natural beeswax block for crafting and cosmetics.','2','kg',15.50,28,'2023-01-01','Plastic wrap',1,5,10,19,'2023-06-15 12:30:00','2024-08-19 13:48:25'),(8,'Propolis Tincture','propolis','High-quality propolis tincture for immune support.','250','ml',12.75,18,'2023-01-01','Glass bottle',1,4,8,14,'2023-07-25 14:45:00','2024-08-19 13:47:03'),(9,'Royal Jelly Capsules','royal jelly','Royal jelly capsules with natural nutrients and vitamins.','60','capsules',24.99,39,'2023-01-01','Plastic container',1,5,20,31,'2023-08-05 10:00:00','2024-08-19 13:48:25'),(10,'Bee Venom Extract','venom','Pure bee venom extract for therapeutic use.','10','ml',35.00,4,'2023-01-01','Glass vial',1,4,12,10,'2023-08-20 11:30:00','2024-08-19 13:47:03'),(43,'Bee Venom Extract created created newly created','venom','Pure bee venom extract for therapeutic use.','10','ml',35.00,10,'2023-01-01','Glass vial',1,4,12,8,'2024-08-15 13:31:47','2024-08-15 13:31:47'),(44,'Bee Venom Extract created created newly created','venom','Pure bee venom extract for therapeutic use.','10','ml',35.00,10,'2023-01-01','Glass vial',1,4,12,8,'2024-08-15 14:27:21','2024-08-15 14:27:21');
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `review images`
--

DROP TABLE IF EXISTS `review images`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `review images` (
  `image_id` int NOT NULL AUTO_INCREMENT,
  `review_id` int DEFAULT NULL,
  `image0` varchar(1000) DEFAULT '/uploads/example.jpeg',
  `image1` varchar(1000) DEFAULT '/uploads/example.jpeg',
  `image2` varchar(1000) DEFAULT '/uploads/example.jpeg',
  PRIMARY KEY (`image_id`),
  KEY `review_id` (`review_id`),
  CONSTRAINT `review images_ibfk_1` FOREIGN KEY (`review_id`) REFERENCES `reviews` (`review_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `review images`
--

LOCK TABLES `review images` WRITE;
/*!40000 ALTER TABLE `review images` DISABLE KEYS */;
/*!40000 ALTER TABLE `review images` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `review_images`
--

DROP TABLE IF EXISTS `review_images`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `review_images` (
  `image_id` int NOT NULL AUTO_INCREMENT,
  `review_id` int DEFAULT NULL,
  `image0` varchar(1000) DEFAULT '/uploads/example.jpeg',
  `img0_public_id` text,
  `image1` varchar(1000) DEFAULT '/uploads/example.jpeg',
  `img1_public_id` text,
  `image2` varchar(1000) DEFAULT '/uploads/example.jpeg',
  `img2_public_id` text,
  PRIMARY KEY (`image_id`),
  KEY `review_id` (`review_id`),
  CONSTRAINT `review_images_ibfk_1` FOREIGN KEY (`review_id`) REFERENCES `reviews` (`review_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `review_images`
--

LOCK TABLES `review_images` WRITE;
/*!40000 ALTER TABLE `review_images` DISABLE KEYS */;
INSERT INTO `review_images` VALUES (1,1,'/uploads/review1-image1.jpg',NULL,'/uploads/review1-image2.jpg',NULL,'/uploads/review1-image3.jpg',NULL),(2,2,'/uploads/review2-image1.jpg',NULL,'/uploads/review2-image2.jpg',NULL,'/uploads/review2-image3.jpg',NULL),(3,3,'/uploads/review3-image1.jpg',NULL,'/uploads/review3-image2.jpg',NULL,'/uploads/review3-image3.jpg',NULL),(7,6,'https://res.cloudinary.com/dod7yij4e/image/upload/v1723829583/Apiaries%2016%20user%27s%20review%20Images/tmp-8-1723829575323_fjnl1c.png','Apiaries 16 user\'s review Images/tmp-8-1723829575323_fjnl1c','https://res.cloudinary.com/dod7yij4e/image/upload/v1723829582/Apiaries%2016%20user%27s%20review%20Images/tmp-9-1723829575327_jyts9w.png','Apiaries 16 user\'s review Images/tmp-9-1723829575327_jyts9w','https://res.cloudinary.com/dod7yij4e/image/upload/v1723829592/Apiaries%2016%20user%27s%20review%20Images/tmp-10-1723829575341_xhpoa7.png','Apiaries 16 user\'s review Images/tmp-10-1723829575341_xhpoa7');
/*!40000 ALTER TABLE `review_images` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reviews`
--

DROP TABLE IF EXISTS `reviews`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reviews` (
  `review_id` int NOT NULL AUTO_INCREMENT,
  `product_id` int DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  `rating` int NOT NULL,
  `title` varchar(100) NOT NULL,
  `comment` varchar(100) NOT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`review_id`),
  KEY `user_id` (`user_id`) USING BTREE,
  KEY `product_id` (`product_id`) USING BTREE,
  CONSTRAINT `reviews_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE,
  CONSTRAINT `reviews_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`) ON DELETE CASCADE,
  CONSTRAINT `reviews_chk_1` CHECK ((`rating` between 1 and 5))
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reviews`
--

LOCK TABLES `reviews` WRITE;
/*!40000 ALTER TABLE `reviews` DISABLE KEYS */;
INSERT INTO `reviews` VALUES (1,6,1,5,'Great Product!','I loved this product. It exceeded my expectations.','2024-05-10 12:00:00','2024-05-10 12:00:00'),(2,7,2,4,'Nice Color!','The color of this item is beautiful.','2024-05-09 14:30:00','2024-05-09 14:30:00'),(3,8,3,3,'Decent Quality','The quality of this product is average.','2024-05-08 10:00:00','2024-05-08 10:00:00'),(6,6,7,1,'testing review','This is just me playing around','2024-08-16 17:24:44','2024-08-16 17:24:44');
/*!40000 ALTER TABLE `reviews` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `services`
--

DROP TABLE IF EXISTS `services`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `services` (
  `service_id` int NOT NULL AUTO_INCREMENT,
  `service_name` varchar(100) NOT NULL,
  `description` text NOT NULL,
  `numOfTimesRendered` decimal(10,0) DEFAULT NULL,
  `category` enum('Consultancy','Apiary Setup','Supply Provision','Pollination','Other') DEFAULT 'Consultancy',
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`service_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `services`
--

LOCK TABLES `services` WRITE;
/*!40000 ALTER TABLE `services` DISABLE KEYS */;
INSERT INTO `services` VALUES (1,'Consultancy for Beekeeping Practices','Professional consultancy on beekeeping best practices and management.',3,'Pollination','2024-05-12 15:40:37','2024-05-28 12:54:13'),(2,'Complete Apiary Setup','Full setup of beekeeping apiary, including hive installation and equipment setup.',4,'Apiary Setup','2024-05-12 15:40:37','2024-05-28 12:54:24'),(3,'Starter Bee Farm Supplies Package','Supply package containing essential items to start a bee farm (hive boxes, tools, protective gear, etc.)',5,'Supply Provision','2024-05-12 15:40:37','2024-05-28 12:54:36'),(4,'Pollination Services for Farms','On-demand pollination services for agricultural farms.',50,'Pollination','2024-05-12 15:40:37','2024-05-28 12:54:46'),(5,'Customized Beekeeping Training','Tailored training sessions on beekeeping techniques and bee farm management.',55,'Consultancy','2024-05-12 15:40:37','2024-05-28 12:54:56');
/*!40000 ALTER TABLE `services` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `supplies`
--

DROP TABLE IF EXISTS `supplies`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `supplies` (
  `supply_id` int NOT NULL AUTO_INCREMENT,
  `supply_name` varchar(100) NOT NULL,
  `category` enum('processing','packaging') DEFAULT 'packaging',
  `quantity` decimal(10,0) DEFAULT NULL,
  `status` enum('used','new','need repair') DEFAULT 'new',
  `storage_location` enum('warehouse','factory') DEFAULT 'factory',
  `supplier` varchar(100) DEFAULT NULL,
  `minimum_stock_level` decimal(10,0) DEFAULT NULL,
  `purchase_date` date DEFAULT NULL,
  `purchase_cost` decimal(10,3) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`supply_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `supplies`
--

LOCK TABLES `supplies` WRITE;
/*!40000 ALTER TABLE `supplies` DISABLE KEYS */;
INSERT INTO `supplies` VALUES (1,'Honey Jars','packaging',5000,'new','warehouse','Jar Supplies Inc.',1000,'2023-02-10',1000.000,'2024-05-10 10:15:38','2024-05-10 10:15:38'),(2,'Bee Pollen Jars','packaging',2000,'new','warehouse','Pollen Containers Ltd.',500,'2023-03-20',800.000,'2024-05-10 10:15:38','2024-05-10 10:15:38'),(3,'Beekeeping Gloves','processing',50,'used','factory','Beekeeping Gear Co.',20,'2022-12-15',30.000,'2024-05-10 10:15:38','2024-05-10 10:15:38'),(4,'Filtering Screens','processing',10,'new','warehouse','Honey Processing Supplies LLC',5,'2023-01-05',50.000,'2024-05-10 10:15:38','2024-05-10 10:15:38'),(5,'Labeling Machine','packaging',1,'need repair','factory','Packaging Equipment Ltd.',1,'2022-09-30',1500.000,'2024-05-10 10:15:38','2024-05-10 10:15:38');
/*!40000 ALTER TABLE `supplies` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `supply_provision_items`
--

DROP TABLE IF EXISTS `supply_provision_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `supply_provision_items` (
  `item_id` int NOT NULL AUTO_INCREMENT,
  `service_id` int DEFAULT NULL,
  `item_name` varchar(100) NOT NULL,
  `description` text NOT NULL,
  `quantity` int NOT NULL,
  `price_NGN` decimal(10,2) DEFAULT NULL,
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`item_id`),
  KEY `service_id` (`service_id`),
  CONSTRAINT `supply_provision_items_ibfk_1` FOREIGN KEY (`service_id`) REFERENCES `services` (`service_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `supply_provision_items`
--

LOCK TABLES `supply_provision_items` WRITE;
/*!40000 ALTER TABLE `supply_provision_items` DISABLE KEYS */;
INSERT INTO `supply_provision_items` VALUES (1,3,'Starter Hive Kit','Complete starter hive kit including frames, foundations, and covers.',1,300.00,'2024-08-11 19:23:11','2024-08-11 19:23:11'),(2,3,'Bee Colony Starter Pack','Healthy starter bee colony with queen and worker bees.',1,400.00,'2024-08-11 19:23:11','2024-08-11 19:23:11'),(3,3,'Beekeeping Guidebook','Comprehensive guidebook covering beekeeping basics.',1,50.00,'2024-08-11 19:23:11','2024-08-11 19:23:11');
/*!40000 ALTER TABLE `supply_provision_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `swarm hunters`
--

DROP TABLE IF EXISTS `swarm hunters`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `swarm hunters` (
  `hunter_id` int NOT NULL AUTO_INCREMENT,
  `assigned_supervisor` int DEFAULT NULL,
  `fullname` varchar(100) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `joining_date` date DEFAULT NULL,
  `tip(naira)` decimal(10,3) DEFAULT NULL,
  `employment_status` enum('active','inactive') DEFAULT 'active',
  `emergency_contact_name` varchar(20) DEFAULT NULL,
  `emergency_contact` varchar(20) DEFAULT NULL,
  `notes` text,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`hunter_id`),
  UNIQUE KEY `phone` (`phone`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `emergency_contact` (`emergency_contact`),
  KEY `assigned_supervisor` (`assigned_supervisor`),
  CONSTRAINT `swarm hunters_ibfk_1` FOREIGN KEY (`assigned_supervisor`) REFERENCES `employees` (`emp_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `swarm hunters`
--

LOCK TABLES `swarm hunters` WRITE;
/*!40000 ALTER TABLE `swarm hunters` DISABLE KEYS */;
/*!40000 ALTER TABLE `swarm hunters` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `swarm_hunters`
--

DROP TABLE IF EXISTS `swarm_hunters`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `swarm_hunters` (
  `hunter_id` int NOT NULL AUTO_INCREMENT,
  `assigned_supervisor` int DEFAULT NULL,
  `fullname` varchar(100) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `joining_date` date DEFAULT NULL,
  `tip(naira)` decimal(10,3) DEFAULT NULL,
  `employment_status` enum('active','inactive','terminated') DEFAULT 'active',
  `emergency_contact_name` varchar(20) DEFAULT NULL,
  `emergency_contact` varchar(20) DEFAULT NULL,
  `notes` text,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`hunter_id`),
  UNIQUE KEY `phone` (`phone`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `emergency_contact` (`emergency_contact`),
  KEY `assigned_supervisor` (`assigned_supervisor`),
  CONSTRAINT `swarm_hunters_ibfk_1` FOREIGN KEY (`assigned_supervisor`) REFERENCES `employees` (`emp_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `swarm_hunters`
--

LOCK TABLES `swarm_hunters` WRITE;
/*!40000 ALTER TABLE `swarm_hunters` DISABLE KEYS */;
INSERT INTO `swarm_hunters` VALUES (1,1,'Alice Johnson','1234567890','alice.johnson@example.com','2023-03-15',50.000,'active','John Johnson','9876543210','Experienced swarm catcher, available during spring season.','2024-05-10 10:26:52','2024-05-10 10:26:52'),(2,1,'Bob Smith','9876543210','bob.smith@example.com','2023-02-28',45.000,'active','Sarah Smith','5551234567','New to swarm catching but eager to learn.','2024-05-10 10:26:52','2024-05-10 10:26:52'),(3,3,'Charlie Brown','5551112222','charlie.brown@example.com','2023-04-05',55.000,'active','David Brown','3334445555','Certified beekeeper with previous swarm catching experience.','2024-05-10 10:26:52','2024-05-10 10:26:52'),(4,3,'Diana Wilson','3337779999','diana.wilson@example.com','2023-03-01',60.000,'active','Emily Wilson','2228881111','Dependable and resourceful swarm catcher.','2024-05-10 10:26:52','2024-05-10 10:26:52'),(5,1,'Eva Martinez','4445556666','eva.martinez@example.com','2023-04-10',50.000,'active','Juan Martinez','1112223333','Bilingual swarm catcher with strong communication skills.','2024-05-10 10:26:52','2024-05-10 10:26:52');
/*!40000 ALTER TABLE `swarm_hunters` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `token`
--

DROP TABLE IF EXISTS `token`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `token` (
  `token_id` int NOT NULL AUTO_INCREMENT,
  `refreshToken` varchar(100) NOT NULL,
  `ip` varchar(100) NOT NULL,
  `userAgent` varchar(1000) NOT NULL,
  `isValid` tinyint(1) DEFAULT '1',
  `user` int DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`token_id`),
  KEY `user` (`user`),
  CONSTRAINT `token_ibfk_1` FOREIGN KEY (`user`) REFERENCES `users` (`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `token`
--

LOCK TABLES `token` WRITE;
/*!40000 ALTER TABLE `token` DISABLE KEYS */;
INSERT INTO `token` VALUES (2,'1f338b5cd30e090bb7bf6d93cf715a72709a90600d5fa0315ddd19e914637fa50305541baa1c31ab','::1','PostmanRuntime/7.37.0',1,3,'2024-07-26 20:13:11','2024-07-26 20:13:11'),(8,'1f3ec2d9fae290615c1bd7499e1cedf6885d419382a5def9b139d23df011534f31ed046ba274f3fe','::1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36',1,8,'2024-08-03 13:52:23','2024-08-03 13:52:23'),(10,'773b8be04fc9cf2f007d949d38de27281767c8bcf6a8916aa486a35699bb04a059027e47bdfd4277','::1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36',1,10,'2024-08-03 14:34:52','2024-08-03 14:34:52'),(11,'bc685cace4dc43b6c0f8cef323cc2e01f596b71725c3fc88728a183c349053f436a15de915a32f79','::1','PostmanRuntime/7.37.0',1,7,'2024-08-05 11:16:12','2024-08-05 11:16:12'),(12,'a2c94baeb751758eaef6c33faec58eff24b26bbf5f3b233ef6f6e1f3d86ce432bfd71a79a55958f6','::1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36',1,11,'2024-08-13 12:58:35','2024-08-13 12:58:35');
/*!40000 ALTER TABLE `token` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user orders`
--

DROP TABLE IF EXISTS `user orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user orders` (
  `_id` int NOT NULL AUTO_INCREMENT,
  `order_id` int DEFAULT NULL,
  `successful` int NOT NULL DEFAULT '0',
  `pending` int NOT NULL DEFAULT '0',
  `canceled` int NOT NULL DEFAULT '0',
  `failed` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`_id`),
  KEY `order_id` (`order_id`),
  CONSTRAINT `user orders_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`order_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user orders`
--

LOCK TABLES `user orders` WRITE;
/*!40000 ALTER TABLE `user orders` DISABLE KEYS */;
/*!40000 ALTER TABLE `user orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_orders`
--

DROP TABLE IF EXISTS `user_orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_orders` (
  `status_id` int NOT NULL,
  `order_id` int DEFAULT NULL,
  `successful` int NOT NULL DEFAULT '0',
  `pending` int NOT NULL DEFAULT '0',
  `canceled` int NOT NULL DEFAULT '0',
  `failed` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`status_id`),
  KEY `order_id` (`order_id`),
  CONSTRAINT `user_orders_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`order_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_orders`
--

LOCK TABLES `user_orders` WRITE;
/*!40000 ALTER TABLE `user_orders` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `fullname` varchar(200) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(100) NOT NULL,
  `role` enum('admin','user') DEFAULT 'user',
  `address` varchar(1000) NOT NULL DEFAULT 'please update your address',
  `image` text,
  `img_public_id` text,
  `phone` varchar(30) NOT NULL,
  `gender` enum('male','female') DEFAULT 'female',
  `emailNotification` tinyint(1) NOT NULL DEFAULT '0',
  `blacklisted` tinyint(1) NOT NULL DEFAULT '0',
  `verificationString` text,
  `isVerified` tinyint(1) NOT NULL DEFAULT '0',
  `verified` datetime DEFAULT NULL,
  `passwordToken` text,
  `passwordExpirationDate` datetime DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `phone` (`phone`),
  CONSTRAINT `users_chk_2` CHECK ((char_length(`password`) between 6 and 100))
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'John Doe','johndoe@example.com','password123','admin','123 Main St, City, Country','https://example.com/profile.jpg',NULL,'1234567890','male',1,0,NULL,1,NULL,NULL,NULL,'2023-01-15 10:30:00','2023-01-15 10:30:00'),(2,'Jane Smith','janesmith@example.com','securepass','user','456 Oak Ave, Town, Country',NULL,NULL,'9876543210','female',1,0,NULL,0,NULL,NULL,NULL,'2023-02-20 08:45:00','2023-02-20 08:45:00'),(3,'Alice Johnson','alicejohnson@example.com','password567','user','789 Pine Rd, Village, Country','https://example.com/avatar.jpg',NULL,'5551234567','female',0,0,NULL,1,NULL,NULL,NULL,'2023-03-10 15:20:00','2023-03-10 15:20:00'),(4,'Bob Smith','bobsmith@example.com','strongpassword','user','101 Maple Ave, Suburb, Country',NULL,NULL,'3334445555','male',1,0,NULL,0,NULL,NULL,NULL,'2023-04-05 12:00:00','2023-04-05 12:00:00'),(5,'Emily Brown','emilybrown@example.com','pass123','user','222 Elm St, Rural, Country','https://example.com/photo.jpg',NULL,'4445556666','female',1,1,NULL,1,NULL,NULL,NULL,'2023-05-01 09:30:00','2023-05-01 09:30:00'),(7,'Ibrahim Muhammed','apiariessixteen@gmail.com','$2a$10$gYVRB0TZy4qp10V0dvaaWuaC.tcD1tJ5cGK5G7Qg8TJ716rcKuSMe','admin','Babanfada suite','https://res.cloudinary.com/dod7yij4e/image/upload/v1723585564/Apiaries%2016%20user%27s%20Images/tmp-2-1723585561258_psbhfw.jpg','Apiaries 16 user\'s Images/tmp-2-1723585561258_psbhfw','+30 (327) 450-84849','male',1,0,'',1,'2024-07-26 20:37:35','f68f054e221bc78eaa6d7b92a09952f63a010f046e2eb43b232fd497ccca540f4927d760814f3808','2024-07-27 14:30:20','2024-07-26 20:35:50','2024-08-13 22:03:20'),(8,'muhammed kabeer ibrahim','tasiguduu@gmail.com','$2a$10$/FqhnhhQArhUfM67j5ggSetr/FZLyFvFuMqczeT.4s2mvnQphiRh.','user','please update your address','https://lh3.googleusercontent.com/a/ACg8ocKK_eOyXKNnDMrqPAvkXnBv08HAIUwEcuPUdpudy9tylaDFFA=s96-c',NULL,'+234110986009220824024781','female',1,0,NULL,1,NULL,NULL,NULL,'2024-08-03 13:20:24','2024-08-03 13:20:24'),(10,'Wasiu Aminat','aminahwasiu96@gmail.com','$2a$10$BIVa54Zl3pnH4Sbxgu0eZu/XraUuh0hJ/ith8dZSHapJukYFDkZgi','user','please update your address','https://lh3.googleusercontent.com/a/ACg8ocIStkfGxE_FHuBXhO52Gtx5C2q14BCWnWGF0zpwtMW2CwjB-g=s96-c',NULL,'+234111217196048805531674','female',1,0,NULL,1,NULL,NULL,NULL,'2024-08-03 14:31:15','2024-08-03 14:31:15'),(11,'Tolani','ibn.ibrahim1992@gmail.com','$2a$10$q36hozlyVQ//uZ.t3PozK.iAOg9mc6EvfHaPFPmzvRvwWj2qiKV5y','user','please update your address','https://lh3.googleusercontent.com/a/ACg8ocIhg6PE1oKIcpo_a6FwuXYEr0zQXatfYId_fE6qweNCEf-9mf2Y=s96-c',NULL,'+234101272374151215085737','female',1,0,NULL,1,NULL,NULL,NULL,'2024-08-13 12:56:17','2024-08-13 12:56:17');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-08-20 23:17:50
