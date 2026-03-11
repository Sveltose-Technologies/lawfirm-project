-- MySQL dump 10.13  Distrib 8.0.44, for Win64 (x86_64)
--
-- Host: localhost    Database: task
-- ------------------------------------------------------
-- Server version	8.0.44

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
-- Table structure for table `attorney`
--

DROP TABLE IF EXISTS `attorney`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `attorney` (
  `id` int NOT NULL AUTO_INCREMENT,
  `firstName` varchar(50) NOT NULL,
  `lastName` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `isActive` tinyint(1) DEFAULT '0',
  `activationToken` varchar(255) DEFAULT NULL,
  `street` varchar(100) DEFAULT NULL,
  `aptBlock` varchar(50) DEFAULT NULL,
  `city` int DEFAULT NULL,
  `state` varchar(50) DEFAULT NULL,
  `country` varchar(50) DEFAULT NULL,
  `zipCode` varchar(10) DEFAULT NULL,
  `locationId` int DEFAULT NULL,
  `phoneCell` varchar(15) DEFAULT NULL,
  `phoneHome` varchar(15) DEFAULT NULL,
  `phoneOffice` varchar(15) DEFAULT NULL,
  `dob` date DEFAULT NULL,
  `language` json DEFAULT NULL,
  `profileImage` varchar(255) DEFAULT NULL,
  `servicesOffered` json DEFAULT NULL,
  `education` json DEFAULT NULL,
  `admission` json DEFAULT NULL,
  `experience` json DEFAULT NULL,
  `barCouncilIndiaNo` varchar(100) DEFAULT NULL,
  `barCouncilIndiaId` varchar(255) DEFAULT NULL,
  `barCouncilStateNo` varchar(100) DEFAULT NULL,
  `barCouncilStateId` varchar(255) DEFAULT NULL,
  `familyLawPractice` tinyint(1) DEFAULT NULL,
  `familyDetails` json DEFAULT NULL,
  `kycIdentity` json DEFAULT NULL,
  `kycAddress` json DEFAULT NULL,
  `resume` varchar(255) DEFAULT NULL,
  `resetOtp` varchar(20) DEFAULT NULL,
  `resetOtpExpire` bigint DEFAULT NULL,
  `resetOtpVerified` tinyint(1) DEFAULT '0',
  `termsAccepted` tinyint(1) NOT NULL,
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  KEY `fk_attorney_city` (`city`),
  CONSTRAINT `fk_attorney_city` FOREIGN KEY (`city`) REFERENCES `location_city` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `attorney`
--

LOCK TABLES `attorney` WRITE;
/*!40000 ALTER TABLE `attorney` DISABLE KEYS */;
INSERT INTO `attorney` VALUES (1,'parag','singh','hemu@gmail.com','$2b$10$HWbZgaweXnRFgJdVO1RsyOp5hsjUZQhJbnVTTal2avT2yYb2516i2',0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'[{\"code\": \"bi\", \"name\": \"Bislama\", \"local\": \"Bislama\"}]',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,0,'2026-03-07 15:29:20','2026-03-10 14:34:07');
/*!40000 ALTER TABLE `attorney` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-03-11 17:49:34
