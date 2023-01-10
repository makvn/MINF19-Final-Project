-- MySQL dump 10.13  Distrib 8.0.31, for Linux (x86_64)
--
-- Host: mariadb    Database: sg2
-- ------------------------------------------------------
-- Server version	5.5.5-10.9.3-MariaDB-1:10.9.3+maria~ubu2204

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `bookings`
--

DROP TABLE IF EXISTS `bookings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bookings` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `customer_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `customer_phone` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `pickup_place` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `datetime_start` datetime NOT NULL,
  `datetime_end` datetime DEFAULT NULL,
  `vehicle_id` bigint(20) unsigned NOT NULL,
  `created_by` bigint(20) unsigned NOT NULL,
  `updated_by` bigint(20) unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `amount` double(8,2) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_booking_vehicle` (`vehicle_id`),
  KEY `fk_booking_user_created` (`created_by`),
  KEY `fk_booking_user_updated` (`updated_by`),
  CONSTRAINT `fk_booking_user_created` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_booking_user_updated` FOREIGN KEY (`updated_by`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_booking_vehicle` FOREIGN KEY (`vehicle_id`) REFERENCES `vehicles` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bookings`
--

LOCK TABLES `bookings` WRITE;
/*!40000 ALTER TABLE `bookings` DISABLE KEYS */;
INSERT INTO `bookings` VALUES (1,'Tran quoc kiet','0359753662','63/13 go dau tan phu tphcm','2022-11-27 12:00:50','2022-11-27 04:51:13',1,1,1,'2022-11-27 04:43:33','2022-11-27 04:51:13',NULL),(2,'Tran quoc kiet','0359753662','63/13 go dau tan phu tphcm','2022-11-28 12:00:50','2022-11-29 10:39:16',1,1,1,'2022-11-28 01:55:18','2022-11-29 10:39:16',NULL),(3,'Tran quoc kiet','0359753662','63/13 go dau tan phu tphcm','2022-12-02 12:00:50','2022-12-01 08:49:18',1,1,1,'2022-12-01 08:48:22','2022-12-01 08:49:18',12000.00),(4,'Tran quoc kiet','0359753662','63/13 go dau tan phu tphcm','2022-12-02 12:00:50','2022-12-01 08:50:00',2,1,1,'2022-12-01 08:48:43','2022-12-01 08:50:00',12000.00),(5,'Tran quoc kiet','0359753662','63/13 go dau tan phu tphcm','2022-12-20 12:00:50',NULL,1,1,1,'2022-12-15 03:09:31','2022-12-15 03:09:31',NULL),(6,'Tran quoc kiet','0359753662','63/13 go dau tan phu tphcm','2022-12-20 12:00:50','2022-12-15 03:12:57',3,1,1,'2022-12-15 03:12:33','2022-12-15 03:12:57',1005.00);
/*!40000 ALTER TABLE `bookings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `failed_jobs`
--

DROP TABLE IF EXISTS `failed_jobs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `failed_jobs` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `uuid` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `failed_jobs`
--

LOCK TABLES `failed_jobs` WRITE;
/*!40000 ALTER TABLE `failed_jobs` DISABLE KEYS */;
/*!40000 ALTER TABLE `failed_jobs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `migrations`
--

DROP TABLE IF EXISTS `migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `migrations` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `migrations`
--

LOCK TABLES `migrations` WRITE;
/*!40000 ALTER TABLE `migrations` DISABLE KEYS */;
INSERT INTO `migrations` VALUES (1,'2014_10_12_000000_create_users_table',1),(2,'2014_10_12_100000_create_password_resets_table',1),(3,'2019_08_19_000000_create_failed_jobs_table',1),(4,'2019_12_14_000001_create_personal_access_tokens_table',1),(5,'2022_11_19_052159_create_permission_tables',1),(6,'2022_11_19_073647_create_vehicles_table',1),(7,'2022_11_24_034657_create_vehicle_registry',2),(8,'2022_11_27_032658_create_booking',2),(12,'2022_12_01_072602_add_column_amount_book',3),(13,'2022_12_01_072703_create_summary_tables',3),(16,'2022_12_14_143638_add_field_vehicle',4),(17,'2022_12_16_012514_edit_field_year_manufacture',5);
/*!40000 ALTER TABLE `migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `model_has_permissions`
--

DROP TABLE IF EXISTS `model_has_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `model_has_permissions` (
  `permission_id` bigint(20) unsigned NOT NULL,
  `model_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `model_id` bigint(20) unsigned NOT NULL,
  PRIMARY KEY (`permission_id`,`model_id`,`model_type`),
  KEY `model_has_permissions_model_id_model_type_index` (`model_id`,`model_type`),
  CONSTRAINT `model_has_permissions_permission_id_foreign` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `model_has_permissions`
--

LOCK TABLES `model_has_permissions` WRITE;
/*!40000 ALTER TABLE `model_has_permissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `model_has_permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `model_has_roles`
--

DROP TABLE IF EXISTS `model_has_roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `model_has_roles` (
  `role_id` bigint(20) unsigned NOT NULL,
  `model_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `model_id` bigint(20) unsigned NOT NULL,
  PRIMARY KEY (`role_id`,`model_id`,`model_type`),
  KEY `model_has_roles_model_id_model_type_index` (`model_id`,`model_type`),
  CONSTRAINT `model_has_roles_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `model_has_roles`
--

LOCK TABLES `model_has_roles` WRITE;
/*!40000 ALTER TABLE `model_has_roles` DISABLE KEYS */;
INSERT INTO `model_has_roles` VALUES (1,'App\\Models\\User',8),(2,'App\\Models\\User',2),(2,'App\\Models\\User',3),(2,'App\\Models\\User',4),(2,'App\\Models\\User',5),(2,'App\\Models\\User',6),(2,'App\\Models\\User',7),(2,'App\\Models\\User',9),(2,'App\\Models\\User',10),(3,'App\\Models\\User',1);
/*!40000 ALTER TABLE `model_has_roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `password_resets`
--

DROP TABLE IF EXISTS `password_resets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `password_resets` (
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  KEY `password_resets_email_index` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `password_resets`
--

LOCK TABLES `password_resets` WRITE;
/*!40000 ALTER TABLE `password_resets` DISABLE KEYS */;
/*!40000 ALTER TABLE `password_resets` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `permissions`
--

DROP TABLE IF EXISTS `permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `permissions` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `guard_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `permissions_name_guard_name_unique` (`name`,`guard_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `permissions`
--

LOCK TABLES `permissions` WRITE;
/*!40000 ALTER TABLE `permissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `personal_access_tokens`
--

DROP TABLE IF EXISTS `personal_access_tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `tokenable_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tokenable_id` bigint(20) unsigned NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `abilities` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `personal_access_tokens`
--

LOCK TABLES `personal_access_tokens` WRITE;
/*!40000 ALTER TABLE `personal_access_tokens` DISABLE KEYS */;
/*!40000 ALTER TABLE `personal_access_tokens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `role_has_permissions`
--

DROP TABLE IF EXISTS `role_has_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `role_has_permissions` (
  `permission_id` bigint(20) unsigned NOT NULL,
  `role_id` bigint(20) unsigned NOT NULL,
  PRIMARY KEY (`permission_id`,`role_id`),
  KEY `role_has_permissions_role_id_foreign` (`role_id`),
  CONSTRAINT `role_has_permissions_permission_id_foreign` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`id`) ON DELETE CASCADE,
  CONSTRAINT `role_has_permissions_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role_has_permissions`
--

LOCK TABLES `role_has_permissions` WRITE;
/*!40000 ALTER TABLE `role_has_permissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `role_has_permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roles` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `guard_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `roles_name_guard_name_unique` (`name`,`guard_name`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES (1,'Admin','api','2022-11-24 11:01:56','2022-11-24 11:01:56'),(2,'Driver','api','2022-11-24 11:01:56','2022-11-24 11:01:56'),(3,'Supper Admin','api','2022-11-24 11:01:56','2022-11-24 11:01:56');
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `summary_per_month`
--

DROP TABLE IF EXISTS `summary_per_month`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `summary_per_month` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `month_year` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `total` decimal(14,2) NOT NULL,
  `type` enum('amount','booking','user') COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `summary_per_month_month_year_type_unique` (`month_year`,`type`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `summary_per_month`
--

LOCK TABLES `summary_per_month` WRITE;
/*!40000 ALTER TABLE `summary_per_month` DISABLE KEYS */;
INSERT INTO `summary_per_month` VALUES (1,'2022-12',12004.00,'booking','2022-12-01 08:48:22','2022-12-15 03:12:33'),(4,'2022-12',13005.00,'amount','2022-12-01 08:50:00','2022-12-15 03:12:57'),(5,'2022-12',2.00,'user','2022-12-01 08:53:04','2022-12-15 02:59:23');
/*!40000 ALTER TABLE `summary_per_month` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `last_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `first_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `affiliation` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `dob` date DEFAULT NULL,
  `status` enum('AC','IA') COLLATE utf8mb4_unicode_ci NOT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email_unique` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Admin','Supper',NULL,'admin@gmail.com','$2y$10$5lhIYschavclKk0DS6w9.OZCVVhq8WvVtDIkidW4mVZwfcL51hk92',NULL,'AC',NULL,'2022-11-24 11:01:56','2022-11-24 11:01:56'),(5,'Tran','Kiet',NULL,'tranquockiet.cs@gmail.com','$2y$10$9tnsY78nRPD2sKr2rb9lzOvEWeYhhFSE8W7QJfW6KfFoNxdUqFeDK','1994-11-11','AC',NULL,'2022-11-23 11:23:56','2022-11-24 12:20:32'),(6,'Tran','Kiet',NULL,'tranquockiet.cs.fake@gmail.com','$2y$10$UTLXlf6W/K04Ir3FPRSNFeDb/3njp9ij5zE.wGZfiJIRCtwX3Htza','1994-11-11','AC',NULL,'2022-11-24 12:22:42','2022-11-24 12:22:42'),(7,'Tran','Kiet',NULL,'tranquockiet.cs2@gmail.com','$2y$10$dl79HqJEfVtaLmLh8l8sd.zbbmx3ND9RfPAE.Dht6.p7jMSKEs5qS',NULL,'AC',NULL,'2022-11-25 02:20:42','2022-11-25 02:20:42'),(8,'Tran','Quoc Kiet',NULL,'tranquockiet.cs.fake1@gmail.com','$2y$10$ScjwaV5sLZ4/3/1HYmgZxOfq1FMCq5AOQn3XlNskbyxIwktcedZou','1993-11-11','AC',NULL,'2022-11-25 03:37:08','2022-11-25 03:39:22'),(9,'Tran','Quoc Kiet',NULL,'tranquockiet.cs.fake2@gmail.com','$2y$10$kaxV58D/9mIOpcO5whS8.uM.kcDbTxBqic5EO5FGYR8N7ZcDqO3Hi','1993-11-11','AC',NULL,'2022-12-01 08:53:04','2022-12-01 08:53:04'),(10,'nguyen','nghia',NULL,'nghia.cs21@gmail.com','$2y$10$z6SN0vD0e9L.W8Adiyaz7.5vf5AlbQjOrO5/Y0dNyQAxN0om4JkVO',NULL,'AC',NULL,'2022-12-15 02:59:23','2022-12-15 02:59:23');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vehicle_registry`
--

DROP TABLE IF EXISTS `vehicle_registry`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vehicle_registry` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `chassis_number` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'Số khung',
  `engine_number` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'Số máy',
  `date_range` date NOT NULL COMMENT 'Ngày cấp',
  `issued_by` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'Nơi cấp',
  `expired_date` datetime NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `vehicle_id` bigint(20) unsigned NOT NULL,
  `created_by` bigint(20) unsigned NOT NULL,
  `updated_by` bigint(20) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_vehicle_registry_vehicle` (`vehicle_id`),
  KEY `fk_vehicle_registry_user_created` (`created_by`),
  KEY `fk_vehicle_registry_user_updated` (`updated_by`),
  CONSTRAINT `fk_vehicle_registry_user_created` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_vehicle_registry_user_updated` FOREIGN KEY (`updated_by`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_vehicle_registry_vehicle` FOREIGN KEY (`vehicle_id`) REFERENCES `vehicles` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vehicle_registry`
--

LOCK TABLES `vehicle_registry` WRITE;
/*!40000 ALTER TABLE `vehicle_registry` DISABLE KEYS */;
INSERT INTO `vehicle_registry` VALUES (7,'ABC02','LK001','2022-01-01','Nha Trang, Khánh Hoà','2022-12-01 00:00:00','2022-11-29 09:58:28','2022-12-15 03:09:11',1,1,1);
/*!40000 ALTER TABLE `vehicle_registry` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vehicles`
--

DROP TABLE IF EXISTS `vehicles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vehicles` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `brand` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `car_number` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `weight` double(8,2) unsigned NOT NULL,
  `type_of_fuel` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` enum('AC','IA','PE') COLLATE utf8mb4_unicode_ci NOT NULL,
  `status_active_at` datetime DEFAULT NULL,
  `status_active_by` bigint(20) unsigned DEFAULT NULL,
  `driver_id` bigint(20) unsigned NOT NULL,
  `created_by` bigint(20) unsigned NOT NULL,
  `updated_by` bigint(20) unsigned NOT NULL,
  `book_by` bigint(20) unsigned DEFAULT NULL,
  `book_at` datetime DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `vehicle_registry_id` bigint(20) unsigned DEFAULT NULL,
  `current_booking_id` bigint(20) unsigned DEFAULT NULL,
  `last_booking_end_time` datetime DEFAULT NULL,
  `document_id` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `date_registration` date DEFAULT NULL,
  `date_expire` date DEFAULT NULL,
  `year_manufacture` varchar(4) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_vehicle_user_created` (`created_by`),
  KEY `fk_vehicle_user_updated` (`updated_by`),
  KEY `fk_vehicle_user_driver` (`driver_id`),
  KEY `fk_vehicle_user_status_active_by` (`status_active_by`),
  KEY `fk_vehicle_user_book_by` (`book_by`),
  KEY `fk_vehicle_vehicle_registry` (`vehicle_registry_id`),
  KEY `fk_vehicle_booking` (`current_booking_id`),
  CONSTRAINT `fk_vehicle_booking` FOREIGN KEY (`current_booking_id`) REFERENCES `bookings` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_vehicle_user_book_by` FOREIGN KEY (`book_by`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_vehicle_user_created` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_vehicle_user_driver` FOREIGN KEY (`driver_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_vehicle_user_status_active_by` FOREIGN KEY (`status_active_by`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_vehicle_user_updated` FOREIGN KEY (`updated_by`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_vehicle_vehicle_registry` FOREIGN KEY (`vehicle_registry_id`) REFERENCES `vehicle_registry` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vehicles`
--

LOCK TABLES `vehicles` WRITE;
/*!40000 ALTER TABLE `vehicles` DISABLE KEYS */;
INSERT INTO `vehicles` VALUES (1,'Mer 2','Truck','79A-01345',3.50,'Oil','AC','2022-11-24 13:21:35',1,5,5,1,1,'2022-12-15 03:09:31','2022-11-24 12:21:31','2022-12-15 03:09:51',7,5,'2022-12-01 08:49:18',NULL,NULL,NULL,NULL,'2022-12-15 03:09:51'),(2,'Mer 2','Truck','79A-01345',3.50,'Oil','AC','2022-12-01 08:48:38',1,5,5,1,NULL,NULL,'2022-11-24 12:21:54','2022-12-15 03:09:42',NULL,NULL,'2022-12-01 08:50:00',NULL,NULL,NULL,NULL,'2022-12-15 03:09:42'),(3,'Mer','Truck','80A-013416',6.10,'Oil','AC','2022-12-15 03:12:27',1,5,5,1,NULL,NULL,'2022-11-24 12:22:16','2022-12-16 01:29:10',NULL,NULL,'2022-12-15 03:12:57','2679','2022-01-09','2022-08-05','2022',NULL),(4,'Mer 2','Truck','79A-01345',3.50,'Oil','AC','2022-12-15 03:13:46',1,6,6,1,NULL,NULL,'2022-11-24 12:23:28','2022-12-15 03:13:46',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(5,'Mer','Truck','80A-013417',6.20,'Oil','PE',NULL,NULL,7,7,7,NULL,NULL,'2022-11-25 02:21:27','2022-11-25 02:21:27',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(6,'Mer','Truck','A79-0979',1.90,'Oil','PE',NULL,NULL,5,5,5,NULL,NULL,'2022-12-19 02:08:22','2022-12-19 02:08:22',NULL,NULL,NULL,'ABC','2022-12-23','2022-12-23','2033',NULL),(7,'Mer','Truck','A79-0979',1.90,'Oil','PE',NULL,NULL,5,5,5,NULL,NULL,'2022-12-19 02:09:45','2022-12-19 02:09:45',NULL,NULL,NULL,'ABC','2022-12-23','2022-12-23','2033',NULL);
/*!40000 ALTER TABLE `vehicles` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-12-23  2:43:12
