-- MySQL dump 10.13  Distrib 8.0.38, for macos14 (arm64)
--
-- Host: 127.0.0.1    Database: BlogDB
-- ------------------------------------------------------
-- Server version	8.0.36

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
-- Table structure for table `tbl_admin`
--

DROP TABLE IF EXISTS `tbl_admin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_admin` (
  `id` int NOT NULL AUTO_INCREMENT,
  `password` varchar(255) NOT NULL,
  `username` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `gender` enum('Male','Female','Other') DEFAULT NULL,
  `address` text,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `avatar` longtext,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_admin`
--

LOCK TABLES `tbl_admin` WRITE;
/*!40000 ALTER TABLE `tbl_admin` DISABLE KEYS */;
INSERT INTO `tbl_admin` VALUES (1,'adminpass1','john','adminjohn@example.com','Female','123 Admin St, City','2024-10-09 11:00:34','123-123-123'),(2,'adminpass2','admin_jane','adminjane@example.com','Female','456 Admin Ave, City','2024-10-09 11:00:34',NULL),(3,'1234','admin','adminjohn123@example.com','Male','123 Admin St, City','2024-10-09 11:00:34',NULL);
/*!40000 ALTER TABLE `tbl_admin` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_category`
--

DROP TABLE IF EXISTS `tbl_category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_category` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(100) NOT NULL,
  `description` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_category`
--

LOCK TABLES `tbl_category` WRITE;
/*!40000 ALTER TABLE `tbl_category` DISABLE KEYS */;
INSERT INTO `tbl_category` VALUES (1,'Technology','Posts about the latest in technology'),(2,'Health','Articles on health and wellness'),(3,'Lifestyle','Lifestyle tips and advice'),(4,'Travel','Traveling tips and stories'),(5,'Finance','Financial advice and news'),(6,'Education','Educational resources and guides'),(7,'Science','Scientific discoveries and research'),(8,'Food','Recipes and food reviews'),(9,'Fitness','Fitness routines and tips'),(10,'Fashion','Fashion trends and tips'),(11,'Environment','Environmental news and guides'),(12,'Entertainment','Movies, music, and entertainment news');
/*!40000 ALTER TABLE `tbl_category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_comment`
--

DROP TABLE IF EXISTS `tbl_comment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_comment` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `post_id` int NOT NULL,
  `comment_id` int DEFAULT NULL,
  `content` text NOT NULL,
  `create_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `post_id` (`post_id`),
  KEY `comment_id` (`comment_id`),
  CONSTRAINT `tbl_comment_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `tbl_user` (`id`) ON DELETE CASCADE,
  CONSTRAINT `tbl_comment_ibfk_2` FOREIGN KEY (`post_id`) REFERENCES `tbl_post` (`id`) ON DELETE CASCADE,
  CONSTRAINT `tbl_comment_ibfk_3` FOREIGN KEY (`comment_id`) REFERENCES `tbl_comment` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=50 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_comment`
--

LOCK TABLES `tbl_comment` WRITE;
/*!40000 ALTER TABLE `tbl_comment` DISABLE KEYS */;
INSERT INTO `tbl_comment` VALUES (1,2,1,NULL,'new comment','2024-10-26 17:15:19'),(2,3,1,NULL,'Can’t wait to see these developments in action.','2024-10-26 17:15:19'),(3,4,1,NULL,'AI is advancing so quickly, it’s exciting.','2024-10-26 17:15:19'),(4,5,1,NULL,'Incredible potential in AI technology!','2024-10-26 17:15:19'),(5,1,2,NULL,'Great advice on living a healthy lifestyle.','2024-10-26 17:15:19'),(6,3,2,NULL,'Diet plays a big role in overall health.','2024-10-26 17:15:19'),(7,4,2,NULL,'Balanced diet tips are always welcome!','2024-10-26 17:15:19'),(8,5,2,NULL,'Thanks for sharing these healthy habits.','2024-10-26 17:15:19'),(9,1,3,NULL,'Travel tips are so helpful, thanks!','2024-10-26 17:15:19'),(10,2,3,NULL,'These are must-know tips for travelers.','2024-10-26 17:15:19'),(11,4,3,NULL,'I’ll be using these on my next trip!','2024-10-26 17:15:19'),(12,5,3,NULL,'Traveling just got easier with these tips.','2024-10-26 17:15:19'),(13,1,4,NULL,'Financial planning is essential for everyone.','2024-10-26 17:15:19'),(14,2,4,NULL,'Very useful tips on managing finances.','2024-10-26 17:15:19'),(15,3,4,NULL,'Learning to budget is a valuable skill.','2024-10-26 17:15:19'),(16,5,4,NULL,'Everyone should have a financial plan.','2024-10-26 17:15:19'),(17,1,5,NULL,'Interesting trends in education for the future.','2024-10-26 17:15:19'),(18,2,5,NULL,'Education is evolving rapidly.','2024-10-26 17:15:19'),(19,3,5,NULL,'Insightful take on modern education.','2024-10-26 17:15:19'),(20,4,5,NULL,'Thanks for the info on education trends.','2024-10-26 17:15:19'),(21,2,6,NULL,'Science is constantly surprising us!','2024-10-26 17:15:19'),(22,3,6,NULL,'These discoveries are mind-blowing.','2024-10-26 17:15:19'),(23,4,6,NULL,'Can’t wait to learn more about this.','2024-10-26 17:15:19'),(24,5,6,NULL,'Science advancements are so inspiring.','2024-10-26 17:15:19'),(25,1,7,NULL,'Fashion tips are always helpful.','2024-10-26 17:15:19'),(26,3,7,NULL,'Excited to try these fashion essentials.','2024-10-26 17:15:19'),(27,4,7,NULL,'Fashion trends are always changing.','2024-10-26 17:15:19'),(28,5,7,NULL,'This is a great fashion guide!','2024-10-26 17:15:19'),(29,1,8,NULL,'These routines are easy to start with.','2024-10-26 17:15:19'),(30,2,8,NULL,'Helpful tips for fitness beginners.','2024-10-26 17:15:19'),(31,3,8,NULL,'Getting started with fitness is key.','2024-10-26 17:15:19'),(32,4,8,NULL,'Thanks for these beginner-friendly tips.','2024-10-26 17:15:19'),(46,1,1,NULL,'1','2024-11-06 03:05:16');
/*!40000 ALTER TABLE `tbl_comment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_like`
--

DROP TABLE IF EXISTS `tbl_like`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_like` (
  `user_id` int NOT NULL,
  `post_id` int NOT NULL,
  `create_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`user_id`,`post_id`),
  UNIQUE KEY `user_id` (`user_id`,`post_id`),
  KEY `post_id` (`post_id`),
  CONSTRAINT `tbl_like_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `tbl_user` (`id`) ON DELETE CASCADE,
  CONSTRAINT `tbl_like_ibfk_2` FOREIGN KEY (`post_id`) REFERENCES `tbl_post` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_like`
--

LOCK TABLES `tbl_like` WRITE;
/*!40000 ALTER TABLE `tbl_like` DISABLE KEYS */;
INSERT INTO `tbl_like` VALUES (1,1,'2024-10-27 06:16:45'),(1,2,'2024-10-27 06:16:45'),(2,1,'2024-10-27 06:16:45'),(2,2,'2024-10-27 06:16:45'),(2,3,'2024-10-27 06:16:45'),(2,4,'2024-10-27 06:16:45'),(3,1,'2024-10-27 06:16:45'),(4,1,'2024-10-27 06:16:45'),(4,6,'2024-10-27 06:16:45'),(4,7,'2024-10-27 06:16:45');
/*!40000 ALTER TABLE `tbl_like` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_post`
--

DROP TABLE IF EXISTS `tbl_post`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_post` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `title` varchar(255) NOT NULL,
  `content` text,
  `create_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `update_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `hash_img` longtext,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `tbl_post_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `tbl_user` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=50 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_post`
--

LOCK TABLES `tbl_post` WRITE;
/*!40000 ALTER TABLE `tbl_post` DISABLE KEYS */;
INSERT INTO `tbl_post` VALUES (1,1,'AI in 2024','Exploring the future of AI technology in the coming year.','2024-10-26 17:15:14','2024-10-26 17:15:14','hash_img1'),(2,2,'Healthy Living','Maintaining a balanced diet for a healthier lifestyle.','2024-10-26 17:15:14','2024-10-26 17:15:14','hash_img2'),(3,3,'Travel Tips','Essential travel tips for a smooth journey.','2024-10-26 17:15:14','2024-10-26 17:15:14','hash_img3'),(4,4,'Financial Planning 101','Basics of financial planning for young adults.','2024-10-26 17:15:14','2024-10-26 17:15:14','hash_img4'),(5,5,'Education Trends','Upcoming trends in education for 2024.','2024-10-26 17:15:14','2024-10-26 17:15:14','hash_img5'),(6,1,'Scientific Discoveries','A look into recent scientific advancements.','2024-10-26 17:15:14','2024-10-26 17:15:14','hash_img6'),(7,2,'Fashion Essentials','Key fashion items everyone should have.','2024-10-26 17:15:14','2024-10-26 17:15:14','hash_img7'),(8,3,'Beginner Fitness','Simple fitness routines for beginners.','2024-10-26 17:15:14','2024-10-26 17:15:14','hash_img8'),(9,1,'AI in 2024','Exploring the future of AI technology in the coming year.','2024-10-26 17:13:58','2024-10-26 17:17:18','hash_img1'),(10,2,'Healthy Living','Maintaining a balanced diet for a healthier lifestyle.','2024-10-26 17:13:58','2024-10-26 17:17:18','hash_img2'),(11,3,'Travel Tips','Essential travel tips for a smooth journey.','2024-10-26 17:13:58','2024-10-26 17:17:18','hash_img3'),(12,5,'new title','Lorem Ipsum is simply dummy text of the printing and typesetting industry.','2024-10-26 17:13:58','2024-11-07 19:15:32','hash'),(13,5,'Education Trends','Upcoming trends in education for 2024.','2024-10-26 17:13:58','2024-10-26 17:17:18','hash_img5'),(14,1,'Scientific Discoveries','A look into recent scientific advancements.','2024-10-26 17:13:58','2024-10-26 17:17:18','hash_img6'),(15,2,'Fashion Essentials','Key fashion items everyone should have.','2024-10-26 17:13:58','2024-10-26 17:17:18','hash_img7'),(16,3,'Beginner Fitness','Simple fitness routines for beginners.','2024-10-26 17:13:58','2024-10-26 17:17:18','hash_img8'),(49,1,'new book --- 123','lorem lorem lorem x3.14','2024-10-28 13:05:42','2024-10-28 13:05:42','hashImage....');
/*!40000 ALTER TABLE `tbl_post` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_post_category`
--

DROP TABLE IF EXISTS `tbl_post_category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_post_category` (
  `post_id` int NOT NULL,
  `category_id` int NOT NULL,
  PRIMARY KEY (`post_id`,`category_id`),
  KEY `category_id` (`category_id`),
  CONSTRAINT `tbl_post_category_ibfk_1` FOREIGN KEY (`post_id`) REFERENCES `tbl_post` (`id`) ON DELETE CASCADE,
  CONSTRAINT `tbl_post_category_ibfk_2` FOREIGN KEY (`category_id`) REFERENCES `tbl_category` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_post_category`
--

LOCK TABLES `tbl_post_category` WRITE;
/*!40000 ALTER TABLE `tbl_post_category` DISABLE KEYS */;
INSERT INTO `tbl_post_category` VALUES (1,1),(6,1),(49,1),(2,2),(8,2),(49,2),(2,3),(8,3),(49,3),(3,4),(49,4),(4,5),(4,6),(5,6),(1,7),(6,7),(3,8),(2,9),(4,9),(8,9),(7,10),(6,11),(7,11),(1,12),(5,12);
/*!40000 ALTER TABLE `tbl_post_category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_user`
--

DROP TABLE IF EXISTS `tbl_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `password` varchar(255) NOT NULL,
  `username` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `gender` enum('Male','Female','Other') DEFAULT NULL,
  `address` text,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `avatar` longtext,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `email_2` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_user`
--

LOCK TABLES `tbl_user` WRITE;
/*!40000 ALTER TABLE `tbl_user` DISABLE KEYS */;
INSERT INTO `tbl_user` VALUES (1,'1234','user1','user1@example.com','Male','123 User St, City','2024-10-26 17:11:13',NULL),(2,'1234','user2','user2@example.com','Female','456 Sample Rd, Town','2024-10-26 17:11:13',NULL),(3,'1234','user3','user3@example.com','Male','789 Example Ave, Village','2024-10-26 17:11:13',NULL),(4,'1234','user4','user4@example.com','Other','101 Main Blvd, City','2024-10-26 17:11:13',NULL),(5,'1234','user5','user5@example.com','Female','202 Maple St, Town','2024-10-26 17:11:13',NULL),(21,'1234','hihihoho','user123@example.com',NULL,NULL,'2024-11-04 18:31:59',NULL),(22,'pass','user','email',NULL,NULL,'2024-11-06 03:14:57','...'),(23,'pass','user','email1',NULL,NULL,'2024-11-06 03:24:46',NULL);
/*!40000 ALTER TABLE `tbl_user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-11-15 23:22:24
