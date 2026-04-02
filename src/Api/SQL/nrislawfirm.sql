-- phpMyAdmin SQL Dump
-- version 5.2.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Apr 02, 2026 at 02:18 PM
-- Server version: 8.0.44-0ubuntu0.22.04.2
-- PHP Version: 8.1.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `nrislawfirm`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `id` int NOT NULL,
  `firstName` varchar(255) DEFAULT NULL,
  `lastName` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `phoneNo` varchar(50) DEFAULT NULL,
  `city` varchar(100) DEFAULT NULL,
  `profileImage` varchar(255) DEFAULT NULL,
  `websiteLogo` varchar(255) DEFAULT NULL,
  `resetOtp` varchar(20) DEFAULT NULL,
  `resetOtpExpire` bigint DEFAULT NULL,
  `resetOtpVerified` tinyint(1) DEFAULT '0',
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`id`, `firstName`, `lastName`, `email`, `password`, `phoneNo`, `city`, `profileImage`, `websiteLogo`, `resetOtp`, `resetOtpExpire`, `resetOtpVerified`, `createdAt`, `updatedAt`) VALUES
(1, 'Shubhangi', 'Mahajan', 'shubhangisveltose11@gmail.com', '$2b$10$kl7soizYgOpGXCEtireIR.8rBeJuWcqQoLiCo5nZFbbyVrxUub//C', '1234567890', 'mumbai', '/uploads/1774518589997-111545602.webp', '/uploads/1773651429401-613719267.jfif', NULL, NULL, 0, '2026-01-01 05:14:15', '2026-03-26 15:19:50');

-- --------------------------------------------------------

--
-- Table structure for table `admindashboard`
--

CREATE TABLE `admindashboard` (
  `id` int NOT NULL,
  `fullName` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `designation` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `admindashboard`
--

INSERT INTO `admindashboard` (`id`, `fullName`, `email`, `phone`, `password`, `designation`, `createdAt`, `updatedAt`) VALUES
(2, ' Doe', 'john12@example.com', '1234567890', 'secret123', 'Manager', '2025-12-15 11:12:53', '2025-12-15 11:12:53'),
(3, 'John Doe', 'john.doe@example.com', '9876543210', 'Password@123', 'Manager', '2025-12-15 12:11:46', '2025-12-15 12:11:46');

-- --------------------------------------------------------

--
-- Table structure for table `attorney`
--

CREATE TABLE `attorney` (
  `id` int NOT NULL,
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
  `barCouncilIndiaId` varchar(100) DEFAULT NULL,
  `barCouncilStateNo` varchar(100) DEFAULT NULL,
  `barCouncilStateId` varchar(100) DEFAULT NULL,
  `familyLawPractice` tinyint(1) DEFAULT NULL,
  `familyDetails` json DEFAULT NULL,
  `kycIdentity` json DEFAULT NULL,
  `kycAddress` json DEFAULT NULL,
  `resume` varchar(255) DEFAULT NULL,
  `resetOtp` varchar(10) DEFAULT NULL,
  `resetOtpExpire` datetime DEFAULT NULL,
  `resetOtpVerified` tinyint(1) DEFAULT '0',
  `isVerified` tinyint(1) DEFAULT '0',
  `termsAccepted` tinyint(1) NOT NULL,
  `aboutus` longtext,
  `categoryId` int DEFAULT NULL,
  `linkedin` varchar(255) DEFAULT NULL,
  `twitter` varchar(255) DEFAULT NULL,
  `facebook` varchar(255) DEFAULT NULL,
  `gmail` varchar(255) DEFAULT NULL,
  `status` enum('active','inactive','verified') DEFAULT 'inactive',
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `servicesId` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `attorney`
--

INSERT INTO `attorney` (`id`, `firstName`, `lastName`, `email`, `password`, `isActive`, `activationToken`, `street`, `aptBlock`, `city`, `state`, `country`, `zipCode`, `locationId`, `phoneCell`, `phoneHome`, `phoneOffice`, `dob`, `language`, `profileImage`, `servicesOffered`, `education`, `admission`, `experience`, `barCouncilIndiaNo`, `barCouncilIndiaId`, `barCouncilStateNo`, `barCouncilStateId`, `familyLawPractice`, `familyDetails`, `kycIdentity`, `kycAddress`, `resume`, `resetOtp`, `resetOtpExpire`, `resetOtpVerified`, `isVerified`, `termsAccepted`, `aboutus`, `categoryId`, `linkedin`, `twitter`, `facebook`, `gmail`, `status`, `createdAt`, `updatedAt`, `servicesId`) VALUES
(1, 'Shubham', 'Soni', 'riturajsinghgour900@gmail.com', '$2b$10$s5okBf4GEGDwuwOTO580BOVkShTdXAkyXbaiRrX33pvuyr.nyMMma', 0, NULL, '', '', 9, '', 'Asia', '', NULL, '+1 678.553.2232', '+1 312.476.5125', '+1 312.476.5125', NULL, NULL, NULL, '\"\"', '\"\"', '\"\"', '\"Represented an organic food company in connection with a strategic investment by a private equity firm.° Represented a global technology company in its acquisition of a data, analytics, and advisory firm.° Represented an independent community bank in its acquisition of three California bank branches.° Represented a network of physicians in its merger with a healthcare services company.° Represented a geospatial technology company in its merger with a location data company.° Represented a publicly traded manufacturing company in the sale of one of its manufacturing facilities to a privately held manufacturing company.° Represented a publicly traded multinational telecommunications company in connection with its acquisition of a media company.°\"', '', NULL, '', NULL, 0, '\"\"', NULL, NULL, NULL, '630668', '2026-03-28 13:27:47', 1, 1, 0, '', NULL, '', '', '', '', 'active', '2026-03-28 07:51:01', '2026-04-02 12:01:50', 2),
(10, 'Rituraj', 'Singh', 'mahajanshubhangi2326@gmail.com', '$2b$10$YxfEMeuHL8ZDw2d.RMEmaOfqs3KRHAG0CToDOotDQxG60jdmKxLvm', 0, NULL, '12 Street old Road', 'Cambridge University Press', 9, '', 'Asia', '', NULL, '+1 678.553.2232', '+1 312.476.5125', '+1 312.476.5125', NULL, NULL, '/uploads/1775131861371-768560221.png', '\"Shareholder\"', '\"LL.M., Taxation, New York University School of Law, 2024\"', '\"New York\"', '\"Represented an organic food company in connection with a strategic investment by a private equity firm.° Represented a global technology company in its acquisition of a data, analytics, and advisory firm.° Represented an independent community bank in its acquisition of three California bank branches.° Represented a network of physicians in its merger with a healthcare services company.° Represented a geospatial technology company in its merger with a location data company.° Represented a publicly traded manufacturing company in the sale of one of its manufacturing facilities to a privately held manufacturing company.° Represented a publicly traded multinational telecommunications company in connection with its acquisition of a media company.°\"', 'Japan Federation of Bar Associations', NULL, 'Tokyo Bar Association', NULL, 0, '\"\"', '\"/uploads/1775131861371-826090745.pdf\"', NULL, NULL, '171934', '2026-03-30 17:54:43', 1, 1, 0, 'Melissa Gaglia focuses on representing clients on matters related to executive compensation and employee benefits in mergers, acquisitions, and other strategic transactions. Melissa drafts employment and compensation plans, agreements, and awards, as well as conducts benefits related transactional due diligence.\r\n\r\nMelissa also assists with the design and implementation of health and welfare benefit plans, cafeteria plans, fringe benefit plans, and retirement plans. Melissa counsels clients on compliance with health care reform, federal, state, and local laws impacting benefits and benefit plans, and related tax implications. ', 13, 'https://www.linkedin.com', 'https://twitter.com#', 'https://www.facebook.com/#', 'johnattorney@gmail.com', 'verified', '2026-03-30 12:19:43', '2026-04-02 12:11:01', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `attorney_client_conversations`
--

CREATE TABLE `attorney_client_conversations` (
  `id` int NOT NULL,
  `attorneyId` int NOT NULL,
  `clientId` int NOT NULL,
  `senderType` enum('attorney','client') NOT NULL,
  `message` text NOT NULL,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `attorney_client_conversations`
--

INSERT INTO `attorney_client_conversations` (`id`, `attorneyId`, `clientId`, `senderType`, `message`, `createdAt`, `updatedAt`) VALUES
(6, 1, 12, 'client', 'hey Shubham', '2026-03-30 11:35:40', '2026-03-30 11:35:40'),
(7, 10, 12, 'attorney', 'hey', '2026-03-30 12:31:12', '2026-03-30 12:31:12'),
(8, 1, 12, 'attorney', 'hii', '2026-03-31 05:09:48', '2026-03-31 05:09:48'),
(9, 1, 12, 'attorney', 'hii', '2026-03-31 05:10:00', '2026-03-31 05:10:00'),
(10, 1, 14, 'client', 'hii', '2026-03-31 05:23:27', '2026-03-31 05:23:27'),
(11, 10, 12, 'attorney', 'hiii', '2026-03-31 06:41:58', '2026-03-31 06:41:58'),
(12, 10, 12, 'attorney', 'hii', '2026-03-31 06:45:55', '2026-03-31 06:45:55');

-- --------------------------------------------------------

--
-- Table structure for table `attorney_conversations`
--

CREATE TABLE `attorney_conversations` (
  `id` int NOT NULL,
  `adminId` int NOT NULL,
  `attorneyId` int NOT NULL,
  `senderType` enum('admin','attorney') NOT NULL,
  `message` text NOT NULL,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `attorney_conversations`
--

INSERT INTO `attorney_conversations` (`id`, `adminId`, `attorneyId`, `senderType`, `message`, `createdAt`, `updatedAt`) VALUES
(9, 1, 1, 'attorney', 'heloo', '2026-03-30 12:19:44', '2026-03-30 12:19:44'),
(10, 1, 1, 'attorney', 'hey', '2026-03-30 12:20:00', '2026-03-30 12:20:00'),
(14, 1, 10, 'attorney', 'hey admin', '2026-03-30 12:25:32', '2026-03-30 12:25:32'),
(15, 1, 10, 'attorney', 'hey', '2026-03-30 12:37:40', '2026-03-30 12:37:40'),
(16, 1, 10, 'admin', 'hii', '2026-03-31 05:07:12', '2026-03-31 05:07:12'),
(17, 1, 10, 'admin', 'hii', '2026-03-31 05:43:10', '2026-03-31 05:43:10'),
(18, 1, 10, 'attorney', 'hey admin is that you ', '2026-04-02 11:55:43', '2026-04-02 11:55:43'),
(19, 1, 10, 'admin', 'yes, I am Admin.', '2026-04-02 11:56:07', '2026-04-02 11:56:07'),
(20, 1, 10, 'attorney', 'are available', '2026-04-02 11:56:12', '2026-04-02 11:56:12'),
(21, 1, 10, 'admin', 'yes and you', '2026-04-02 11:56:22', '2026-04-02 11:56:22');

-- --------------------------------------------------------

--
-- Table structure for table `awards`
--

CREATE TABLE `awards` (
  `id` int NOT NULL,
  `adminId` int NOT NULL,
  `bannerImage` varchar(255) NOT NULL,
  `personName` varchar(255) NOT NULL,
  `organization` varchar(255) NOT NULL,
  `year` int NOT NULL,
  `awardTitle` varchar(255) NOT NULL,
  `details` longtext,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `peopleImage` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `awards`
--

INSERT INTO `awards` (`id`, `adminId`, `bannerImage`, `personName`, `organization`, `year`, `awardTitle`, `details`, `createdAt`, `updatedAt`, `peopleImage`) VALUES
(2, 1, '/uploads/1775021101410-282539593.jpg', 'Raj Varma', 'organization', 2026, 'Rahul Sharma', '<p><strong>Law</strong>&nbsp;is a set of rules that are created and are enforceable by&nbsp;<a href=\"https://en.wikipedia.org/wiki/Government\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"background-color: initial; color: var(--color-progressive,#36c);\">governmental</a>&nbsp;or societal institutions to regulate behavior,<a href=\"https://en.wikipedia.org/wiki/Law#cite_note-FOOTNOTERobertson200690-1\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"background-color: initial; color: var(--color-progressive,#36c);\"><sup>[1]</sup></a>&nbsp;with its precise definition a matter of longstanding debate.<a href=\"https://en.wikipedia.org/wiki/Law#cite_note-FOOTNOTEWillis1926-2\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"background-color: initial; color: var(--color-progressive,#36c);\"><sup>[2]</sup></a><a href=\"https://en.wikipedia.org/wiki/Law#cite_note-3\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"background-color: initial; color: var(--color-progressive,#36c);\"><sup>[3]</sup></a><a href=\"https://en.wikipedia.org/wiki/Law#cite_note-4\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"background-color: initial; color: var(--color-progressive,#36c);\"><sup>[4]</sup></a>&nbsp;It has been variously described as a&nbsp;<a href=\"https://en.wikipedia.org/wiki/Social_science#Law\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"background-color: initial; color: var(--color-progressive,#36c);\">science</a><a href=\"https://en.wikipedia.org/wiki/Law#cite_note-5\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"background-color: initial; color: var(--color-progressive,#36c);\"><sup>[5]</sup></a><a href=\"https://en.wikipedia.org/wiki/Law#cite_note-6\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"background-color: initial; color: var(--color-progressive,#36c);\"><sup>[6]</sup></a>&nbsp;and as the art of justice.<a href=\"https://en.wikipedia.org/wiki/Law#cite_note-FOOTNOTECohen1992-7\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"background-color: initial; color: var(--color-progressive,#36c);\"><sup>[7]</sup></a><a href=\"https://en.wikipedia.org/wiki/Law#cite_note-8\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"background-color: initial; color: var(--color-progressive,#36c);\"><sup>[8]</sup></a><a href=\"https://en.wikipedia.org/wiki/Law#cite_note-FOOTNOTEBerger1953525-9\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"background-color: initial; color: var(--color-progressive,#36c);\"><sup>[9]</sup></a>&nbsp;State-enforced laws can be made by a&nbsp;<a href=\"https://en.wikipedia.org/wiki/Legislature\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"background-color: initial; color: var(--color-progressive,#36c);\">legislature</a>, resulting in&nbsp;<a href=\"https://en.wikipedia.org/wiki/Statute\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"background-color: initial; color: var(--color-progressive,#36c);\">statutes</a>; by the executive through&nbsp;<a href=\"https://en.wikipedia.org/wiki/Decree\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"background-color: initial; color: var(--color-progressive,#36c);\">decrees</a>&nbsp;and&nbsp;<a href=\"https://en.wikipedia.org/wiki/Regulation\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"background-color: initial; color: var(--color-progressive,#36c);\">regulations</a>; or by judges\' decisions, which form&nbsp;<a href=\"https://en.wikipedia.org/wiki/Precedent\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"background-color: initial; color: var(--color-progressive,#36c);\">precedent</a>&nbsp;in&nbsp;<a href=\"https://en.wikipedia.org/wiki/Common_law\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"background-color: initial; color: var(--color-progressive,#36c);\">common law</a>&nbsp;jurisdictions. An&nbsp;<a href=\"https://en.wikipedia.org/wiki/Autocrat\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"background-color: initial; color: var(--color-progressive,#36c);\">autocrat</a>&nbsp;may exercise those functions within their realm. The creation of laws themselves may be influenced by a&nbsp;<a href=\"https://en.wikipedia.org/wiki/Constitution\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"background-color: initial; color: var(--color-progressive,#36c);\">constitution</a>, written or tacit, and the&nbsp;<a href=\"https://en.wikipedia.org/wiki/Rights\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"background-color: initial; color: var(--color-progressive,#36c);\">rights</a>&nbsp;encoded therein. The law shapes&nbsp;<a href=\"https://en.wikipedia.org/wiki/Politics\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"background-color: initial; color: var(--color-progressive,#36c);\">politics</a>,&nbsp;<a href=\"https://en.wikipedia.org/wiki/Economics\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"background-color: initial; color: var(--color-progressive,#36c);\">economics</a>,&nbsp;<a href=\"https://en.wikipedia.org/wiki/History\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"background-color: initial; color: var(--color-progressive,#36c);\">history</a>&nbsp;and&nbsp;<a href=\"https://en.wikipedia.org/wiki/Society\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"background-color: initial; color: var(--color-progressive,#36c);\">society</a>&nbsp;in various ways and also serves as a mediator of relations between people.</p><p>Legal systems vary between&nbsp;<a href=\"https://en.wikipedia.org/wiki/Jurisdiction_(area)\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"background-color: initial; color: var(--color-progressive,#36c);\">jurisdictions</a>, with their differences analysed in&nbsp;<a href=\"https://en.wikipedia.org/wiki/Comparative_law\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"background-color: initial; color: var(--color-progressive,#36c);\">comparative law</a>. In&nbsp;<a href=\"https://en.wikipedia.org/wiki/Civil_law_(legal_system)\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"background-color: initial; color: var(--color-progressive,#36c);\">civil law</a>&nbsp;jurisdictions, a legislature or other central body&nbsp;<a href=\"https://en.wikipedia.org/wiki/Codification_(law)\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"background-color: initial; color: var(--color-progressive,#36c);\">codifies and consolidates</a>&nbsp;the law. In common law systems, judges may make&nbsp;<a href=\"https://en.wikipedia.org/wiki/Legally_binding\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"background-color: initial; color: var(--color-progressive,#36c);\">binding</a>&nbsp;case law through precedent,<a href=\"https://en.wikipedia.org/wiki/Law#cite_note-10\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"background-color: initial; color: var(--color-progressive,#36c);\"><sup>[10]</sup></a>&nbsp;although on occasion this may be overturned by a higher court or the legislature.<a href=\"https://en.wikipedia.org/wiki/Law#cite_note-11\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"background-color: initial; color: var(--color-progressive,#36c);\"><sup>[11]</sup></a>&nbsp;<a href=\"https://en.wikipedia.org/wiki/Religious_law\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"background-color: initial; color: var(--color-progressive,#36c);\">Religious law</a>&nbsp;is in use in some religious communities and states, and has historically influenced secular law.<a href=\"https://en.wikipedia.org/wiki/Law#cite_note-12\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"background-color: initial; color: var(--color-progressive,#36c);\"><sup>[12]</sup></a><a href=\"https://en.wikipedia.org/wiki/Law#cite_note-13\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"background-color: initial; color: var(--color-progressive,#36c);\"><sup>[13]</sup></a><a href=\"https://en.wikipedia.org/wiki/Law#cite_note-14\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"background-color: initial; color: var(--color-progressive,#36c);\"><sup>[14]</sup></a><a href=\"https://en.wikipedia.org/wiki/Law#cite_note-15\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"background-color: initial; color: var(--color-progressive,#36c);\"><sup>[15]</sup></a><a href=\"https://en.wikipedia.org/wiki/Law#cite_note-16\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"background-color: initial; color: var(--color-progressive,#36c);\"><sup>[16]</sup></a></p><p>The scope of law can be divided into two domains:&nbsp;<a href=\"https://en.wikipedia.org/wiki/Public_law\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"background-color: initial; color: var(--color-progressive,#36c);\">public law</a>&nbsp;concerns government and society, including&nbsp;<a href=\"https://en.wikipedia.org/wiki/Constitutional_law\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"background-color: initial; color: var(--color-progressive,#36c);\">constitutional law</a>,&nbsp;<a href=\"https://en.wikipedia.org/wiki/Administrative_law\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"background-color: initial; color: var(--color-progressive,#36c);\">administrative law</a>, and&nbsp;<a href=\"https://en.wikipedia.org/wiki/Criminal_law\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"background-color: initial; color: var(--color-progressive,#36c);\">criminal law</a>; while&nbsp;<a href=\"https://en.wikipedia.org/wiki/Private_law\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"background-color: initial; color: var(--color-progressive,#36c);\">private law</a>&nbsp;deals with legal disputes between parties in areas such as&nbsp;<a href=\"https://en.wikipedia.org/wiki/Contracts\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"background-color: initial; color: var(--color-progressive,#36c);\">contracts</a>,&nbsp;<a href=\"https://en.wikipedia.org/wiki/Property\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"background-color: initial; color: var(--color-progressive,#36c);\">property</a>,&nbsp;<a href=\"https://en.wikipedia.org/wiki/Torts\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"background-color: initial; color: var(--color-progressive,#36c);\">torts</a>,&nbsp;<a href=\"https://en.wikipedia.org/wiki/Delicts\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"background-color: initial; color: var(--color-progressive,#36c);\">delicts</a>&nbsp;and&nbsp;<a href=\"https://en.wikipedia.org/wiki/Commercial_law\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"background-color: initial; color: var(--color-progressive,#36c);\">commercial law</a>.<a href=\"https://en.wikipedia.org/wiki/Law#cite_note-17\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"background-color: initial; color: var(--color-progressive,#36c);\"><sup>[17]</sup></a>&nbsp;This distinction is stronger in civil law countries, particularly those with a separate system of&nbsp;<a href=\"https://en.wikipedia.org/wiki/Administrative_courts\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"background-color: initial; color: var(--color-progressive,#36c);\">administrative courts</a>;<a href=\"https://en.wikipedia.org/wiki/Law#cite_note-18\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"background-color: initial; color: var(--color-progressive,#36c);\"><sup>[18]</sup></a><a href=\"https://en.wikipedia.org/wiki/Law#cite_note-19\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"background-color: initial; color: var(--color-progressive,#36c);\"><sup>[19]</sup></a>&nbsp;by contrast, the public-private law divide is less pronounced in common law jurisdictions.</p>', '2026-03-13 12:49:25', '2026-04-01 10:55:01', '/uploads/1775021101413-156936603.png');

-- --------------------------------------------------------

--
-- Table structure for table `blogcategories`
--

CREATE TABLE `blogcategories` (
  `id` int NOT NULL,
  `categoryName` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `blogcategories`
--

INSERT INTO `blogcategories` (`id`, `categoryName`, `description`, `createdAt`, `updatedAt`) VALUES
(1, 'Blog categoryName', 'Blog description ', '2025-12-19 05:40:36', '2025-12-19 05:42:16');

-- --------------------------------------------------------

--
-- Table structure for table `blogs`
--

CREATE TABLE `blogs` (
  `id` int NOT NULL,
  `title` varchar(255) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `video_url` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `capabilities`
--

CREATE TABLE `capabilities` (
  `id` int NOT NULL,
  `bannerImage` varchar(255) DEFAULT NULL,
  `textEditor` longtext NOT NULL,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `capabilities`
--

INSERT INTO `capabilities` (`id`, `bannerImage`, `textEditor`, `createdAt`, `updatedAt`) VALUES
(1, 'https://res.cloudinary.com/dz7vmlvqn/image/upload/v1773379653/attorney_files/vg896mhvuu0ozufxyrnb.jpg', '<h2>&nbsp;Capability</h2><p><br></p>', '2026-03-13 05:27:34', '2026-03-13 05:27:34');

-- --------------------------------------------------------

--
-- Table structure for table `capability_categories`
--

CREATE TABLE `capability_categories` (
  `id` int NOT NULL,
  `adminId` int NOT NULL,
  `categoryName` varchar(255) NOT NULL,
  `bannerImage` varchar(255) DEFAULT NULL,
  `description` text NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `capability_categories`
--

INSERT INTO `capability_categories` (`id`, `adminId`, `categoryName`, `bannerImage`, `description`, `createdAt`, `updatedAt`) VALUES
(13, 1, 'Banking & Financial Services', '/uploads/1774957858478-696238686.jfif', '<p>Greenberg Traurig\'s Banking &amp; Finance Practice has wide-ranging experience representing clients in various finance and financial regulatory matters, including:</p><ul><li>Acquisition Finance</li><li>Asset Based Finance</li><li>Aircraft &amp; Equipment Finance</li><li>Borrower-Side Representation</li><li>Cross-Border Finance</li><li>Export Credit Finance</li><li>Financial Regulatory &amp; Compliance</li><li>Investment Grade Lending</li><li>Lender-Side Representation</li><li>Mezzanine Lending</li><li>Middle Market Lending</li><li>Multilateral Development Bank Finance</li><li>Project &amp; Infrastructure Finance</li><li>Restructuring &amp; Workouts</li><li>Securitizations</li><li>Structured Finance &amp; Derivatives</li><li>Syndicated Lending</li></ul><p><br></p>', '2026-03-31 17:20:58', '2026-03-31 17:20:58');

-- --------------------------------------------------------

--
-- Table structure for table `capability_subcategories`
--

CREATE TABLE `capability_subcategories` (
  `id` int NOT NULL,
  `adminId` int NOT NULL,
  `categoryId` int NOT NULL,
  `subcategoryName` varchar(255) NOT NULL,
  `bannerImage` varchar(255) DEFAULT NULL,
  `description` text NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `capability_subcategories`
--

INSERT INTO `capability_subcategories` (`id`, `adminId`, `categoryId`, `subcategoryName`, `bannerImage`, `description`, `createdAt`, `updatedAt`) VALUES
(14, 1, 13, 'Business Aviation', '/uploads/1774957890676-671082780.jfif', '<p><span style=\"color: rgb(0, 0, 0);\">Greenberg Traurig’s Business Aviation Group represents airlines, leasing companies, financial institutions, corporations, and other aviation-related businesses on a variety of finance, leasing, commercial, and related corporate matters. Our team is skilled in advising both domestic and foreign airlines, lessors, and lenders on aircraft, engines, and parts financings, purchases and sales of aircraft and aircraft portfolios, equipment leasing matters, as well as airline investments and other aviation-related commercial and operational matters. We capitalize on our global resources by working closely with our restructuring, tax, antitrust, governmental affairs, intellectual property,&nbsp;environmental, and labor &amp; employment colleagues to develop multifaceted strategies meeting our clients’ aviation needs.</span></p>', '2026-03-31 17:21:30', '2026-03-31 17:21:30');

-- --------------------------------------------------------

--
-- Table structure for table `careerbanner`
--

CREATE TABLE `careerbanner` (
  `id` int NOT NULL,
  `bannerImage` varchar(255) NOT NULL,
  `content` longtext,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `careerbanner`
--

INSERT INTO `careerbanner` (`id`, `bannerImage`, `content`, `createdAt`, `updatedAt`) VALUES
(1, '/uploads/1775043229423-628647304.jpg', 'text', '2026-04-01 11:33:49', '2026-04-01 11:33:49'),
(2, '/uploads/1775125283573-865934801.jpg', '<p>jnhj</p>', '2026-04-02 10:21:23', '2026-04-02 10:21:23');

-- --------------------------------------------------------

--
-- Table structure for table `careerlaw`
--

CREATE TABLE `careerlaw` (
  `id` int NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `categoryid` varchar(255) NOT NULL,
  `countryId` json NOT NULL,
  `content` longtext,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `careerlaw`
--

INSERT INTO `careerlaw` (`id`, `image`, `categoryid`, `countryId`, `content`, `createdAt`, `updatedAt`) VALUES
(1, '/uploads/1775125317370-164162057.jpg', '1', '\"5\"', '<p>this is law</p>', '2026-04-01 12:23:45', '2026-04-02 10:21:57'),
(9, '/uploads/1775125296422-134130471.jfif', '1', '\"5\"', '<p>fgh</p>', '2026-04-02 10:21:36', '2026-04-02 10:21:36');

-- --------------------------------------------------------

--
-- Table structure for table `careers`
--

CREATE TABLE `careers` (
  `id` int NOT NULL,
  `jobTitle` varchar(255) NOT NULL,
  `jobCode` varchar(255) NOT NULL,
  `jobCategoryId` json NOT NULL,
  `lawCareerCategoryId` int NOT NULL,
  `countryId` int NOT NULL,
  `cityId` int NOT NULL,
  `address` varchar(255) DEFAULT NULL,
  `location` enum('Onsite','Hybrid','Remote') NOT NULL,
  `jobType` enum('FullTime','PartTime') NOT NULL,
  `textEditor` longtext NOT NULL,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `careers`
--

INSERT INTO `careers` (`id`, `jobTitle`, `jobCode`, `jobCategoryId`, `lawCareerCategoryId`, `countryId`, `cityId`, `address`, `location`, `jobType`, `textEditor`, `createdAt`, `updatedAt`) VALUES
(2, 'Junior Legal Associate', 'JR202600400', '[4]', 2, 5, 9, 'Sector 62, Noida, Uttar Pradesh', 'Hybrid', 'PartTime', '<p>We are looking for a motivated Junior Legal Associate to assist with legal research, drafting documents, and supporting senior attorneys.</p><ul><li>Research legal cases</li><li>Draft contracts</li><li>Assist in court filings</li></ul>', '2026-03-31 07:25:50', '2026-03-31 07:25:50');

-- --------------------------------------------------------

--
-- Table structure for table `career_attorney`
--

CREATE TABLE `career_attorney` (
  `id` int NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `categoryid` int NOT NULL,
  `countryId` json NOT NULL,
  `content` longtext,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `career_attorney`
--

INSERT INTO `career_attorney` (`id`, `image`, `categoryid`, `countryId`, `content`, `createdAt`, `updatedAt`) VALUES
(1, '/uploads/1775125335879-944342834.jpg', 2, '\"5\"', '<p>this is career attoney</p>', '2026-04-02 06:25:09', '2026-04-02 10:22:15');

-- --------------------------------------------------------

--
-- Table structure for table `career_details`
--

CREATE TABLE `career_details` (
  `id` int NOT NULL,
  `bannerImage` varchar(255) DEFAULT NULL,
  `bannerText` longtext,
  `description` longtext,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `career_details`
--

INSERT INTO `career_details` (`id`, `bannerImage`, `bannerText`, `description`, `createdAt`, `updatedAt`) VALUES
(4, '/uploads/1774942701921-87012356.jpg', 'banner text', 'description ', '2026-03-31 13:08:21', '2026-03-31 13:08:21'),
(11, '/uploads/1775124260816-77232530.jfif', 'sa', '<p>asdx</p>', '2026-04-02 15:34:20', '2026-04-02 15:34:20');

-- --------------------------------------------------------

--
-- Table structure for table `career_front`
--

CREATE TABLE `career_front` (
  `id` int NOT NULL,
  `categoryId` int NOT NULL,
  `bannerImage` varchar(255) DEFAULT NULL,
  `bannerText` longtext,
  `firstText` longtext,
  `firstImage` varchar(255) DEFAULT NULL,
  `secondText` longtext,
  `secondImage` varchar(255) DEFAULT NULL,
  `thirdText` longtext,
  `thirdImage` varchar(255) DEFAULT NULL,
  `countryId` json NOT NULL,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `career_front`
--

INSERT INTO `career_front` (`id`, `categoryId`, `bannerImage`, `bannerText`, `firstText`, `firstImage`, `secondText`, `secondImage`, `thirdText`, `thirdImage`, `countryId`, `createdAt`, `updatedAt`) VALUES
(7, 2, '/uploads/1775033409850-73947351.jpg', 'banner texts', 'first texts', '/uploads/1775033409850-45926928.jpg', 'second texts', '/uploads/1775033409850-446005394.jpg', 'third texts', '/uploads/1775033409850-264663366.jpg', '\"5\"', '2026-04-01 08:50:09', '2026-04-01 08:50:09');

-- --------------------------------------------------------

--
-- Table structure for table `career_professional`
--

CREATE TABLE `career_professional` (
  `id` int NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `categoryId` int NOT NULL,
  `countryId` json NOT NULL,
  `content` longtext,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `career_professional`
--

INSERT INTO `career_professional` (`id`, `image`, `categoryId`, `countryId`, `content`, `createdAt`, `updatedAt`) VALUES
(2, '/uploads/1775125344126-523563423.jfif', 4, '\"5\"', '<p>this is professional Staf</p>', '2026-04-02 08:38:01', '2026-04-02 10:22:24');

-- --------------------------------------------------------

--
-- Table structure for table `cases`
--

CREATE TABLE `cases` (
  `id` int NOT NULL,
  `case_name` varchar(255) NOT NULL,
  `description` text,
  `documents` json DEFAULT NULL,
  `hearing_datetime` datetime DEFAULT NULL,
  `priority` enum('low','medium','high') DEFAULT 'low',
  `contact_person` varchar(255) DEFAULT NULL,
  `contact_person_number` varchar(20) DEFAULT NULL,
  `people_name` varchar(255) DEFAULT NULL,
  `status` enum('Pending','Running','Completed') DEFAULT 'Pending',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `case_categories`
--

CREATE TABLE `case_categories` (
  `id` int NOT NULL,
  `adminId` int NOT NULL,
  `categoryName` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `chat`
--

CREATE TABLE `chat` (
  `id` int NOT NULL,
  `roomId` varchar(255) NOT NULL,
  `senderId` int NOT NULL,
  `senderType` enum('admin','client','attorney') NOT NULL,
  `receiverId` int NOT NULL,
  `receiverType` enum('admin','client','attorney') NOT NULL,
  `message` text NOT NULL,
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `chat`
--

INSERT INTO `chat` (`id`, `roomId`, `senderId`, `senderType`, `receiverId`, `receiverType`, `message`, `createdAt`, `updatedAt`) VALUES
(1, '21', 12, 'admin', 13, 'client', 'hii', '2026-03-19 18:09:37', '2026-03-19 18:09:37');

-- --------------------------------------------------------

--
-- Table structure for table `client`
--

CREATE TABLE `client` (
  `id` int NOT NULL,
  `firstName` varchar(255) NOT NULL,
  `lastName` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `mobile` varchar(255) DEFAULT NULL,
  `street` varchar(255) DEFAULT NULL,
  `aptBlock` varchar(255) DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `state` varchar(255) DEFAULT NULL,
  `country` varchar(255) DEFAULT NULL,
  `zipCode` varchar(255) DEFAULT NULL,
  `countryCode` varchar(255) DEFAULT NULL,
  `dob` date DEFAULT NULL,
  `profileImage` varchar(255) DEFAULT NULL,
  `kycIdentity` varchar(255) DEFAULT NULL,
  `kycAddress` varchar(255) DEFAULT NULL,
  `termsAccepted` tinyint(1) DEFAULT '0',
  `resetOtp` varchar(255) DEFAULT NULL,
  `resetOtpExpire` datetime DEFAULT NULL,
  `resetOtpVerified` tinyint(1) DEFAULT '0',
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `isVerified` tinyint(1) DEFAULT '0',
  `status` enum('active','inactive','verified') DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `client`
--

INSERT INTO `client` (`id`, `firstName`, `lastName`, `email`, `password`, `mobile`, `street`, `aptBlock`, `city`, `state`, `country`, `zipCode`, `countryCode`, `dob`, `profileImage`, `kycIdentity`, `kycAddress`, `termsAccepted`, `resetOtp`, `resetOtpExpire`, `resetOtpVerified`, `createdAt`, `updatedAt`, `isVerified`, `status`) VALUES
(12, 'Kumar', 'Vyas', 'riturajsinghgour900@gmail.com', '$2b$10$ePhZHRukLhpMEEbhXI3D6eCORd.4DnUM2YVrMtx51KsXK2.lzFTZu', '9876543211', '12 Street old Road', 'Cambridge University Press', 'Seoul', 'Madhya Pradesh', 'Asia', '452001', '', '2026-03-04', '/uploads/1775128312462-36858195.png', NULL, NULL, 1, '733360', '2026-03-28 14:18:42', 1, '2026-03-28 14:13:42', '2026-04-02 16:41:52', 1, 'verified'),
(14, 'Davil', 'Acosta', 'paragsveltose20@gmail.com', '$2b$10$f2Vol/AGqodcfmkqoMYRaO4.1TdOeuI3BINOJSCYk8NJG7L.Xb7Fa', '9876543211', '12 Street old Road', 'Cambridge University Press', 'Seoul', 'Madhya Pradesh', 'Asia', '452001', '+91', NULL, '/uploads/1775132020173-182781534.jfif', '/uploads/1775132020177-9964970.pdf', '/uploads/1775132020177-9964970.pdf', 1, '405758', '2026-03-31 10:47:09', 1, '2026-03-31 10:42:09', '2026-04-02 17:43:40', 1, 'verified');

-- --------------------------------------------------------

--
-- Table structure for table `client_conversations`
--

CREATE TABLE `client_conversations` (
  `id` int NOT NULL,
  `adminId` int NOT NULL,
  `clientId` int NOT NULL,
  `senderType` enum('admin','client') NOT NULL,
  `message` text NOT NULL,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `client_conversations`
--

INSERT INTO `client_conversations` (`id`, `adminId`, `clientId`, `senderType`, `message`, `createdAt`, `updatedAt`) VALUES
(13, 1, 12, 'admin', 'ok kumar ', '2026-03-30 07:13:04', '2026-03-30 07:13:04'),
(14, 1, 12, 'admin', 'how are you ', '2026-03-30 07:14:11', '2026-03-30 07:14:11'),
(15, 1, 12, 'admin', 'take care', '2026-03-30 07:14:30', '2026-03-30 07:14:30'),
(16, 1, 12, 'admin', 'are you here ', '2026-03-30 07:18:24', '2026-03-30 07:18:24'),
(19, 1, 12, 'admin', 'hii', '2026-03-30 10:24:32', '2026-03-30 10:24:32'),
(20, 1, 12, 'admin', 'How are you', '2026-03-30 10:24:51', '2026-03-30 10:24:51'),
(22, 1, 12, 'client', 'hay admin are you alive', '2026-03-30 10:28:03', '2026-03-30 10:28:03'),
(24, 1, 12, 'client', 'admin?', '2026-03-30 10:30:01', '2026-03-30 10:30:01'),
(25, 1, 12, 'client', 'ok', '2026-03-30 10:49:31', '2026-03-30 10:49:31'),
(26, 1, 12, 'client', 'its fine', '2026-03-30 10:55:11', '2026-03-30 10:55:11'),
(27, 1, 14, 'client', 'HII', '2026-03-31 05:14:34', '2026-03-31 05:14:34'),
(28, 1, 14, 'client', 'HELLO ', '2026-03-31 05:14:51', '2026-03-31 05:14:51'),
(29, 1, 14, 'client', 'hiii', '2026-03-31 05:17:58', '2026-03-31 05:17:58'),
(30, 1, 14, 'client', 'hiii', '2026-03-31 05:25:38', '2026-03-31 05:25:38'),
(31, 1, 14, 'client', 'hiii', '2026-03-31 05:25:51', '2026-03-31 05:25:51'),
(32, 1, 14, 'client', 'hiii', '2026-03-31 05:28:32', '2026-03-31 05:28:32'),
(33, 1, 14, 'client', 'hii', '2026-03-31 05:35:10', '2026-03-31 05:35:10'),
(34, 1, 14, 'client', 'hii', '2026-03-31 05:36:24', '2026-03-31 05:36:24'),
(35, 1, 12, 'client', 'its fine ', '2026-03-31 05:39:18', '2026-03-31 05:39:18'),
(36, 1, 14, 'client', 'hii', '2026-03-31 05:39:30', '2026-03-31 05:39:30'),
(37, 1, 14, 'client', 'hii', '2026-03-31 05:40:11', '2026-03-31 05:40:11'),
(38, 1, 14, 'admin', 'hii', '2026-03-31 05:43:23', '2026-03-31 05:43:23'),
(39, 1, 12, 'admin', 'hiii', '2026-03-31 06:07:55', '2026-03-31 06:07:55'),
(40, 1, 14, 'client', 'hii', '2026-03-31 06:19:08', '2026-03-31 06:19:08'),
(41, 1, 14, 'client', 'hey shubhangi how are you ', '2026-04-02 11:33:06', '2026-04-02 11:33:06'),
(42, 1, 14, 'admin', 'I am good and you?', '2026-04-02 11:33:42', '2026-04-02 11:33:42'),
(43, 1, 14, 'client', 'lets move to the attorney ', '2026-04-02 11:33:56', '2026-04-02 11:33:56'),
(44, 1, 14, 'admin', 'Okay', '2026-04-02 11:34:27', '2026-04-02 11:34:27'),
(45, 1, 14, 'admin', 'hii', '2026-04-02 11:41:13', '2026-04-02 11:41:13'),
(46, 1, 14, 'client', 'all done?', '2026-04-02 11:42:09', '2026-04-02 11:42:09'),
(47, 1, 14, 'admin', 'Hello sir', '2026-04-02 11:54:17', '2026-04-02 11:54:17');

-- --------------------------------------------------------

--
-- Table structure for table `cms_category`
--

CREATE TABLE `cms_category` (
  `id` int NOT NULL,
  `adminId` int NOT NULL,
  `categoryId` int NOT NULL,
  `subcategoryIds` json NOT NULL,
  `content` longtext NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `cms_subcategory`
--

CREATE TABLE `cms_subcategory` (
  `id` int NOT NULL,
  `adminId` int NOT NULL,
  `categoryId` int NOT NULL,
  `subcategoryId` int NOT NULL,
  `content` longtext NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `contact_text`
--

CREATE TABLE `contact_text` (
  `id` int NOT NULL,
  `contactText` longtext NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `contact_text`
--

INSERT INTO `contact_text` (`id`, `contactText`, `createdAt`, `updatedAt`) VALUES
(1, 'contactText 1', '2026-03-02 17:57:24', '2026-03-02 18:05:11'),
(2, '<p>now their is other content </p>', '2026-03-07 18:13:56', '2026-03-07 18:13:56'),
(3, '<p>This is my new content </p>', '2026-03-10 17:20:52', '2026-03-10 17:20:52'),
(4, '<p>okok</p>', '2026-03-10 17:30:02', '2026-03-10 17:30:02'),
(5, '<p>This is our address</p>', '2026-03-10 19:10:52', '2026-03-10 19:10:52');

-- --------------------------------------------------------

--
-- Table structure for table `conversation_participants`
--

CREATE TABLE `conversation_participants` (
  `id` int NOT NULL,
  `conversationId` int NOT NULL,
  `userId` int NOT NULL,
  `role` enum('client','admin','attorney') NOT NULL,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `enquiries`
--

CREATE TABLE `enquiries` (
  `id` int NOT NULL,
  `firstName` varchar(255) NOT NULL,
  `lastName` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `countryCode` varchar(10) NOT NULL,
  `phoneNumber` varchar(20) NOT NULL,
  `inquiryType` varchar(255) NOT NULL,
  `message` longtext,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `address` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `enquiries`
--

INSERT INTO `enquiries` (`id`, `firstName`, `lastName`, `email`, `countryCode`, `phoneNumber`, `inquiryType`, `message`, `createdAt`, `updatedAt`, `address`) VALUES
(3, 'Tarun', 'Varma', 'tarun@gmail.com', '19', '9876543210', 'fulltime', 'Message', '2026-02-19 11:45:07', '2026-02-19 11:45:07', NULL),
(4, 'Tarun', 'Varma', 'tarun@gmail.com', '19', '9876543210', 'fulltime', 'Message', '2026-02-19 11:46:58', '2026-02-19 11:46:58', NULL),
(5, 'Amit', 'Sharma', 'amitsharma@gmail.com', '+91', '9123456789', 'Support', 'I am facing an issue while submitting the form on your website.', '2026-03-12 11:05:05', '2026-03-12 11:05:36', '12 Indore, Madhya Pradesh, India'),
(6, 'Amit', 'Sharma', 'amitsharma@gmail.com', '+91', '9123456789', 'Support', 'I am facing an issue while submitting the form on your website.', '2026-03-12 11:11:57', '2026-03-12 11:11:57', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `event`
--

CREATE TABLE `event` (
  `id` int NOT NULL,
  `bannerImage` varchar(255) NOT NULL,
  `adminId` int NOT NULL,
  `title` varchar(255) NOT NULL,
  `startDate` datetime NOT NULL,
  `endDate` datetime NOT NULL,
  `capabilityCategoryId` int NOT NULL,
  `subcategoryIds` json NOT NULL,
  `countryId` int NOT NULL,
  `cityIds` json NOT NULL,
  `registrationLink` varchar(255) DEFAULT NULL,
  `description` longtext NOT NULL,
  `linkedin` varchar(255) DEFAULT NULL,
  `facebook` varchar(255) DEFAULT NULL,
  `twitter` varchar(255) DEFAULT NULL,
  `attorneyIds` json NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `startTime` time NOT NULL DEFAULT '00:00:00',
  `endTime` time NOT NULL DEFAULT '00:00:00',
  `gmail` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `event`
--

INSERT INTO `event` (`id`, `bannerImage`, `adminId`, `title`, `startDate`, `endDate`, `capabilityCategoryId`, `subcategoryIds`, `countryId`, `cityIds`, `registrationLink`, `description`, `linkedin`, `facebook`, `twitter`, `attorneyIds`, `createdAt`, `updatedAt`, `startTime`, `endTime`, `gmail`) VALUES
(12, '/uploads/1774958042538-816358097.jfif', 1, 'Emerging Tech Summit', '2026-03-03 05:30:00', '2026-03-21 05:30:00', 13, '[14]', 5, '[9]', ' https://gtlawinfo.com/s/c778600c743b2457415501d6b8ceb19f43726105', '<p><br></p><p><span style=\"color: rgb(0, 0, 0);\">Western Alliance Bank’s Class Action Law Forum™ (CALF) Mass Torts Summit, held in San Diego, California from March 31–April 1, is presented in collaboration with the University of San Diego School of Law and brings together federal judges and leading class action practitioners for in-depth discussions on major developments in class actions and mass torts. On Wednesday, April 1, from 9:00 to 10:15 a.m., Lori will present “From Bellwether Trial to Forward Strategy,” highlighting emerging trends in bellwether trials and their impact on trial practice and post-verdict strategy.</span></p>', 'www.@gmail.com', 'www.@gmail.com', 'www.@gmail.com', '[10]', '2026-03-31 17:24:02', '2026-03-31 17:24:02', '20:22:00', '17:27:00', 'www.@gmail.com');

-- --------------------------------------------------------

--
-- Table structure for table `event_banner`
--

CREATE TABLE `event_banner` (
  `id` int NOT NULL,
  `bannerImage` varchar(255) NOT NULL,
  `textEditor` longtext NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `event_banner`
--

INSERT INTO `event_banner` (`id`, `bannerImage`, `textEditor`, `createdAt`, `updatedAt`) VALUES
(1, 'https://res.cloudinary.com/dz7vmlvqn/image/upload/v1773231244/attorney_files/afxnh0xnanuxx2rlgjbh.jpg', '<p>Events</p>', '2026-03-11 13:10:04', '2026-03-31 18:35:14'),
(11, '/uploads/1775128883869-72366396.jfif', '<p>Events</p>', '2026-04-02 16:51:23', '2026-04-02 16:51:23');

-- --------------------------------------------------------

--
-- Table structure for table `home_banner_text`
--

CREATE TABLE `home_banner_text` (
  `id` int NOT NULL,
  `typeId` int NOT NULL,
  `image` varchar(255) NOT NULL,
  `textEditor` longtext NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `home_banner_text`
--

INSERT INTO `home_banner_text` (`id`, `typeId`, `image`, `textEditor`, `createdAt`, `updatedAt`) VALUES
(5, 1, 'https://res.cloudinary.com/dz7vmlvqn/image/upload/v1773141602/attorney_files/yoofxqh8xfhkohwswetx.png', '<h1 class=\"ql-align-center\">Global Legal Excellence</h1>', '2026-03-05 18:06:23', '2026-03-10 16:50:03'),
(6, 3, '/uploads/1774518519661-99119747.png', '<p><br></p>', '2026-03-19 11:28:22', '2026-03-26 15:18:39');

-- --------------------------------------------------------

--
-- Table structure for table `home_count`
--

CREATE TABLE `home_count` (
  `id` int NOT NULL,
  `consultationsText` varchar(255) NOT NULL,
  `consultationsNo` int NOT NULL,
  `successRateText` varchar(255) NOT NULL,
  `successRateCount` int NOT NULL,
  `yearsExperienceText` varchar(255) NOT NULL,
  `yearsExperienceCount` int NOT NULL,
  `attorneysText` varchar(255) NOT NULL,
  `attorneysCount` int NOT NULL,
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `home_count`
--

INSERT INTO `home_count` (`id`, `consultationsText`, `consultationsNo`, `successRateText`, `successRateCount`, `yearsExperienceText`, `yearsExperienceCount`, `attorneysText`, `attorneysCount`, `createdAt`, `updatedAt`) VALUES
(1, 'Free Consultations', 2550, 'Case Success Rate', 96, 'Professional Experience', 20, 'Expert Attorneys', 40, '2026-03-03 14:33:15', '2026-03-05 18:16:17');

-- --------------------------------------------------------

--
-- Table structure for table `home_data`
--

CREATE TABLE `home_data` (
  `id` int NOT NULL,
  `firstImage` varchar(255) DEFAULT NULL,
  `firstTextEditor` text,
  `middleText` text,
  `secondImage` varchar(255) DEFAULT NULL,
  `secondTextEditor` text,
  `thirdImage` varchar(255) DEFAULT NULL,
  `thirdTextEditor` text,
  `fourthImage` varchar(255) DEFAULT NULL,
  `fourthTextEditor` text,
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `home_data`
--

INSERT INTO `home_data` (`id`, `firstImage`, `firstTextEditor`, `middleText`, `secondImage`, `secondTextEditor`, `thirdImage`, `thirdTextEditor`, `fourthImage`, `fourthTextEditor`, `createdAt`, `updatedAt`) VALUES
(1, 'https://res.cloudinary.com/dz7vmlvqn/image/upload/v1773039617/attorney_files/ty6kghmrx0sbmjkloxyq.jpg', '<h2>Executive order</h2><p><span style=\"color: rgb(32, 33, 34);\">An&nbsp;</span><strong style=\"color: rgb(32, 33, 34);\">executive order</strong><span style=\"color: rgb(32, 33, 34);\">&nbsp;is a directive issued by the head of state or government that manages the operations of a nation\'s federal administration. While the structure and authority of executive orders vary by country, they generally allow leaders to direct government agencies, implement policies, or respond to emergencies without new legislation. In many systems, the legality of such orders is subject to constitutional or legislative limits and judicial oversight.</span></p>', 'middleText', 'https://res.cloudinary.com/dz7vmlvqn/image/upload/v1773041082/attorney_files/pdxzr7aektmw5e99i6zq.jpg', '<h2>Alumni Network</h2><p>An alumni network connects graduates from universities, colleges, or corporations to foster professional relationships, career development, and mentorship. These networks offer exclusive access to job opportunities, industry events, and reunions, allowing members to leverage shared experiences for networking, professional growth, and continued engagement with their alma mater or former employer.</p>', 'https://res.cloudinary.com/dz7vmlvqn/image/upload/v1773041963/attorney_files/qtivcszjubf8jpx4ftjy.jpg', '<h2><strong style=\"color: var(--primary-blue);\">Presidential&nbsp;Actions&nbsp;Hub</strong></h2><p><span style=\"color: rgb(32, 33, 34);\">Responding to the lack of financial incentives for drug manufacturers to innovate new antibiotics and antifungals and the regulatory barriers to their doing so, it proposed an expedited pathway for testing drugs intended for diseases for which no cure yet existed. After it died in committee, a similar version of the Act was re-introduced by Representative&nbsp;</span><a href=\"https://en.wikipedia.org/wiki/John_Shimkus\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"color: var(--color-progressive,#36c);\">John Shimkus</a><span style=\"color: rgb(32, 33, 34);\">&nbsp;of Illinois and his cosponsor Representative&nbsp;</span><a href=\"https://en.wikipedia.org/wiki/Gene_Green\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"color: var(--color-progressive,#36c);\">Gene Green</a><span style=\"color: rgb(32, 33, 34);\">&nbsp;of Texas.</span></p>', 'https://res.cloudinary.com/dz7vmlvqn/image/upload/v1773040197/attorney_files/b83liyv32tgzmbmiuuev.jpg', '<h2>Tariff Task Force</h2><p><span style=\"color: rgba(var(--bs-secondary-rgb),var(--bs-text-opacity)); background-color: rgb(248, 249, 250);\">The&nbsp;Corporate&nbsp;Transparency&nbsp;Act&nbsp;(CTA)&nbsp;took&nbsp;effect,&nbsp;requiring&nbsp;non-exempt&nbsp;U.S.&nbsp;entities&nbsp;and&nbsp;non-exempt&nbsp;foreign&nbsp;entities&nbsp;registered&nbsp;to&nbsp;do&nbsp;business&nbsp;in&nbsp;the&nbsp;United&nbsp;States&nbsp;to&nbsp;submit&nbsp;beneficial&nbsp;ownership&nbsp;information&nbsp;(BOI)&nbsp;reports.</span></p>', '2026-02-20 16:09:17', '2026-03-09 13:09:24');

-- --------------------------------------------------------

--
-- Table structure for table `home_ranking`
--

CREATE TABLE `home_ranking` (
  `id` int NOT NULL,
  `rankingText` varchar(255) NOT NULL,
  `rankingNo` int NOT NULL,
  `languageText` varchar(255) NOT NULL,
  `languageNo` int NOT NULL,
  `countrieText` varchar(255) NOT NULL,
  `countrieNo` int NOT NULL,
  `locationText` varchar(255) NOT NULL,
  `locationNo` int NOT NULL,
  `textEditor` longtext NOT NULL,
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `home_ranking`
--

INSERT INTO `home_ranking` (`id`, `rankingText`, `rankingNo`, `languageText`, `languageNo`, `countrieText`, `countrieNo`, `locationText`, `locationNo`, `textEditor`, `createdAt`, `updatedAt`) VALUES
(1, 'Top Legal Firm Ranking', 23, 'Multilingual Expertise', 23, 'Global Presence', 23, 'International Offices', 55, '<p>Our firm consistently ranks among the leading international law firms, delivering trusted legal solutions across multiple jurisdictions with a strong global network.</p>', '2026-03-03 15:25:44', '2026-03-05 18:04:34');

-- --------------------------------------------------------

--
-- Table structure for table `job_categories`
--

CREATE TABLE `job_categories` (
  `id` int NOT NULL,
  `jobCategory` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `job_categories`
--

INSERT INTO `job_categories` (`id`, `jobCategory`, `createdAt`, `updatedAt`) VALUES
(4, 'Software Developer', '2026-03-31 12:51:16', '2026-03-31 12:51:16');

-- --------------------------------------------------------

--
-- Table structure for table `law_career_categories`
--

CREATE TABLE `law_career_categories` (
  `id` int NOT NULL,
  `name` enum('Law Students','Attorneys','Professional Staff') NOT NULL,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `law_career_categories`
--

INSERT INTO `law_career_categories` (`id`, `name`, `createdAt`, `updatedAt`) VALUES
(1, 'Law Students', '2026-03-25 12:18:22', '2026-03-25 12:18:22'),
(2, 'Attorneys', '2026-03-25 12:18:52', '2026-03-25 12:18:52'),
(4, 'Professional Staff', '2026-03-31 10:07:39', '2026-03-31 10:07:39');

-- --------------------------------------------------------

--
-- Table structure for table `location_city`
--

CREATE TABLE `location_city` (
  `id` int NOT NULL,
  `adminId` int NOT NULL,
  `countryId` int NOT NULL,
  `cityName` varchar(255) NOT NULL,
  `address` text NOT NULL,
  `phoneNo` varchar(50) NOT NULL,
  `faxNo` varchar(50) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `content` longtext
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `location_city`
--

INSERT INTO `location_city` (`id`, `adminId`, `countryId`, `cityName`, `address`, `phoneNo`, `faxNo`, `image`, `createdAt`, `updatedAt`, `content`) VALUES
(9, 1, 5, 'Seoul', 'Greenberg Traurig, LLP\r\nForeign Legal Consultant Office\r\n23F, Seoul Finance Center\r\n136 Sejong-daero, Jung-gu\r\nSeoul 04520\r\nSouth Korea', ' +82 (0) 2.369.1000', ' +82 (0) 2.369.1000', '/uploads/1775021833553-715140763.jfif', '2026-03-18 18:06:44', '2026-04-01 11:07:13', '<p>Greenberg Traurig’s Seoul office was established in 2013 as a U.S. foreign legal consultant office.</p><p>Our award-winning&nbsp;<a href=\"https://www.gtlaw.com/en/general/regions-practice-pages-general-content/regions-korea-practice\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"color: rgb(149, 110, 10); background-color: transparent;\">Korea Practice</a>&nbsp;consists of over 30 Korean-speaking attorneys located in the firm’s Seoul, Singapore, London and U.S. offices. Fluent in both the Korean language and Korean business culture, our attorneys have decades of combined experience advising Korean and international clients in a range of cross-border matters including M&amp;A, joint ventures, capital markets, private equity, venture capital, investment funds, project financing, energy and infrastructure, real estate, intellectual property, litigation, arbitration, regulatory, and immigration.</p><p>In both 2022 and 2023, the&nbsp;<em>Asia Business Law Journal</em>&nbsp;selected Greenberg Traurig as the Best Foreign Law Firm in Korea.</p><h3>Contact Us</h3><p>For more information about our Seoul office, please feel free to reach out to our&nbsp;<a href=\"https://www.gtlaw.com/en/general/location-key-contacts/seoul-office-contacts\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"color: rgb(149, 110, 10); background-color: transparent;\"><strong>Seoul office contacts</strong></a>.</p><p>∞Greenberg Traurig\'s Seoul office is operated by Greenberg Traurig LLP Foreign Legal Consultant Office. Greenberg Traurig LLP Foreign Legal Consultant Office is a foreign legal consultant office approved by the Ministry of Justice of the Republic of Korea. Under the Foreign Legal Consultant Act of Korea, Greenberg Traurig’s Seoul office is only allowed to provide legal advice with respect to US law, with respect to treaties of which the United States is a party, and with respect to universally recognized customary international law. As a Foreign Legal Consultant Office, we may not render legal advice on Korean law matters. Our Seoul office is allowed to represent clients in international arbitration cases when US law is applicable.</p>');

-- --------------------------------------------------------

--
-- Table structure for table `location_cms`
--

CREATE TABLE `location_cms` (
  `id` int NOT NULL,
  `adminId` int NOT NULL,
  `countryId` int NOT NULL,
  `cityId` int NOT NULL,
  `content` longtext NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `location_country`
--

CREATE TABLE `location_country` (
  `id` int NOT NULL,
  `adminId` int NOT NULL,
  `countryName` varchar(255) NOT NULL,
  `content` longtext NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `location_country`
--

INSERT INTO `location_country` (`id`, `adminId`, `countryName`, `content`, `createdAt`, `updatedAt`) VALUES
(5, 1, 'Asia', '<p>Greenberg Traurig provides comprehensive legal services to companies across the Asia region, including North Asia (South Korea, Japan, Greater China, and Taiwan), Southeast Asia (Singapore, Malaysia, Philippines, Indonesia, Thailand, and Vietnam), and South Asia (India and Bangladesh). We bridge diverse legal systems and cultures with a focus on efficient and effective legal services. We also advise U.S. and European companies engaging in transactions throughout the Asia-Pacific region. Our attorneys provide strategic advice and legal services in connection with mergers and acquisitions, financings and securitization activities, intellectual property, trade and governmental strategies, international dispute resolution, infrastructure and project development and&nbsp;finance, export controls, and business immigration issues. The practice brings together attorneys from our Shanghai, Seoul, Singapore, and Tokyo offices along with numerous multilingual attorneys from across GT’s global organization with experience handling client matters in Asia.</p><p><br></p>', '2026-03-07 13:16:21', '2026-03-17 18:04:15');

-- --------------------------------------------------------

--
-- Table structure for table `location_page`
--

CREATE TABLE `location_page` (
  `id` int NOT NULL,
  `bannerImage` varchar(255) DEFAULT NULL,
  `content` longtext NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `location_page`
--

INSERT INTO `location_page` (`id`, `bannerImage`, `content`, `createdAt`, `updatedAt`) VALUES
(1, 'https://res.cloudinary.com/dz7vmlvqn/image/upload/v1773208662/attorney_files/u6oqma1ws3dzvvh8nmax.jpg', '<h1><strong>Location</strong></h1>', '2026-03-06 11:47:09', '2026-03-11 11:28:23');

-- --------------------------------------------------------

--
-- Table structure for table `logo_types`
--

CREATE TABLE `logo_types` (
  `id` int NOT NULL,
  `type` enum('logo','banner') NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `logo_types`
--

INSERT INTO `logo_types` (`id`, `type`, `createdAt`, `updatedAt`) VALUES
(1, 'banner', '2026-03-05 18:05:07', '2026-03-07 18:50:35'),
(3, 'logo', '2026-03-19 11:23:08', '2026-03-19 11:23:08');

-- --------------------------------------------------------

--
-- Table structure for table `messages`
--

CREATE TABLE `messages` (
  `id` int NOT NULL,
  `senderId` int NOT NULL,
  `senderType` enum('client','attorney','admin') NOT NULL,
  `receiverId` int NOT NULL,
  `receiverType` enum('client','attorney','admin') NOT NULL,
  `message` text NOT NULL,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `news`
--

CREATE TABLE `news` (
  `id` int NOT NULL,
  `bannerImage` varchar(255) NOT NULL,
  `title` varchar(255) NOT NULL,
  `adminId` int NOT NULL,
  `attorneyId` json DEFAULT NULL,
  `capabilityCategoryId` json DEFAULT NULL,
  `countryId` json DEFAULT NULL,
  `cityId` json DEFAULT NULL,
  `date` date DEFAULT NULL,
  `year` int DEFAULT NULL,
  `textEditor` longtext,
  `socialLinks` json DEFAULT NULL,
  `newsImage` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `news`
--

INSERT INTO `news` (`id`, `bannerImage`, `title`, `adminId`, `attorneyId`, `capabilityCategoryId`, `countryId`, `cityId`, `date`, `year`, `textEditor`, `socialLinks`, `newsImage`, `createdAt`, `updatedAt`) VALUES
(3, 'https://res.cloudinary.com/dz7vmlvqn/image/upload/v1773145590/attorney_files/nvyy5msr5l1bfociezqh.jpg', 'US-Israel vs Iran War Live Updates', 1, '\"[22,21]\"', '\"[10]\"', '\"[3]\"', '\"[1]\"', '2026-03-07', 2026, '<p><strong>US-Israel-Iran War Live Updates:</strong>&nbsp;As tensions escalated between the United States, Israel and Iran, the conflict entered its eighth day. with Israel launching a new wave of strikes and explosions reported at one of Tehran’s main commercial airports, where eyewitnesses said planes were burning on the tarmac.</p><p>The confrontation, which began on February 28 with a strike in Tehran, has expanded beyond aerial attacks to include naval activity in the Indian Ocean and drone strikes across the Gulf. US President&nbsp;<a href=\"https://indianexpress.com/about/donald-trump/\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"color: rgb(0, 98, 152); background-color: initial;\">Donald Trump</a>&nbsp;said there would be “no deal” with Iran except “unconditional surrender”, adding that after any capitulation the country should choose a new leader acceptable to his administration.</p>', '\"{\\\"linkedin\\\":\\\"https://www.linkedin.com/uas/login-submit\\\",\\\"twitter\\\":\\\"https://x.com/\\\",\\\"facebook\\\":\\\"https://www.facebook.com/\\\"}\"', 'https://res.cloudinary.com/dz7vmlvqn/image/upload/v1773145590/attorney_files/fksxzzdsodlfly9cnzwt.jpg', '2026-03-07 11:56:02', '2026-03-27 13:27:35'),
(4, 'https://res.cloudinary.com/dz7vmlvqn/image/upload/v1773145738/attorney_files/gr4ocxwsfusnayaeyqpg.jpg', 'ICC T20 World Cup final', 1, '\"[21,10]\"', '\"[10]\"', '\"[3]\"', '\"[1]\"', '2026-03-07', 2026, '<p>Taking a cue from its past two setbacks where the Indian team lost two big-ticket games in a World Cup at Ahmedabad, the Indian team will be offered a mixed-soil pitch at the Narendra Modi Stadium for their ICC T20 World Cup final game against New Zealand.</p>', '\"{\\\"linkedin\\\":\\\"https://www.linkedin.com/company/login\\\",\\\"twitter\\\":\\\"https://x.com/\\\",\\\"facebook\\\":\\\"https://www.facebook.com/\\\"}\"', NULL, '2026-03-07 12:15:16', '2026-04-01 11:28:15'),
(5, 'https://res.cloudinary.com/dz7vmlvqn/image/upload/v1773146151/attorney_files/vndqwvx5trjbsdhv1tti.jpg', 'New magnetic discovery inside Sun', 1, '\"[21,10,1]\"', '\"[9]\"', '\"[3]\"', '\"[2]\"', '2026-03-05', 2026, '<p>Scientists have possibly detected new evidence of subtle movements of magnetism deep inside the Sun, which may help them better predict solar storms and space weather.</p><p>The new study was conducted by a team of researchers from the <a href=\"https://www.financialexpress.com/auto/new-cars/tata/\" rel=\"noopener noreferrer\" target=\"_blank\">Tata</a> Institute of Fundamental Research (TIFR) in <a href=\"https://indianexpress.com/section/cities/mumbai/\" rel=\"noopener noreferrer\" target=\"_blank\">Mumbai</a> and New York University, Abu Dhabi, and was originally published in Nature Astronomy.</p><h2><strong>Inside the Sun</strong></h2><p>Scientists used a method called helioseismology to detect the movements inside the Sun. This method is used to study the solar surface to understand the movements inside the Sun, the same way earthquakes are used to study the movements inside the Earth.</p><p>They analysed more than a decade of solar observations collected by the Solar Dynamics Observatory, a satellite operated by NASA. In particular, they used measurements from the satellite’s Helioseismic and Magnetic Imager (HMI)– an instrument designed to track oscillations and magnetic activity across the Sun’s surface.</p>', '\"{\\\"linkedin\\\":\\\"https://www.linkedin.com/uas/login-submit\\\",\\\"twitter\\\":\\\"https://x.com/\\\",\\\"facebook\\\":\\\"https://www.facebook.com/\\\"}\"', 'https://res.cloudinary.com/dz7vmlvqn/image/upload/v1773145832/attorney_files/bhg7gnl51dxtm32oetmk.jpg', '2026-03-07 13:12:34', '2026-04-01 11:28:03');

-- --------------------------------------------------------

--
-- Table structure for table `our_firm`
--

CREATE TABLE `our_firm` (
  `id` int NOT NULL,
  `adminId` int NOT NULL,
  `bannerImage` varchar(255) NOT NULL,
  `innovationContent` longtext NOT NULL,
  `innovationImage` varchar(255) NOT NULL,
  `peopleContent` longtext NOT NULL,
  `peopleImage` varchar(255) NOT NULL,
  `historyContent` longtext NOT NULL,
  `historyImage` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `our_firm`
--

INSERT INTO `our_firm` (`id`, `adminId`, `bannerImage`, `innovationContent`, `innovationImage`, `peopleContent`, `peopleImage`, `historyContent`, `historyImage`, `createdAt`, `updatedAt`) VALUES
(2, 1, 'https://res.cloudinary.com/dz7vmlvqn/image/upload/v1773144707/attorney_files/ohtj4cda1tt61ypsmwio.jpg', '<h2>Driving&nbsp;Innovation&nbsp;with&nbsp;Purpose</h2><p>Innovation&nbsp;is&nbsp;at&nbsp;the&nbsp;core&nbsp;of&nbsp;our&nbsp;firm’s&nbsp;identity.&nbsp;We&nbsp;continuously&nbsp;explore&nbsp;new&nbsp;technologies,&nbsp;modern&nbsp;methodologies,&nbsp;and&nbsp;forward-thinking&nbsp;strategies&nbsp;to&nbsp;deliver&nbsp;measurable&nbsp;results.</p><p>Our&nbsp;approach&nbsp;blends&nbsp;creativity&nbsp;with&nbsp;precision,&nbsp;ensuring&nbsp;that&nbsp;every&nbsp;solution&nbsp;is&nbsp;practical,&nbsp;scalable,&nbsp;and&nbsp;future-ready.&nbsp;Inspired&nbsp;by&nbsp;global&nbsp;innovators&nbsp;like&nbsp;Apple&nbsp;Inc.&nbsp;and&nbsp;Tesla,&nbsp;Inc.,&nbsp;we&nbsp;foster&nbsp;a&nbsp;culture&nbsp;where&nbsp;bold&nbsp;ideas&nbsp;transform&nbsp;into&nbsp;real-world&nbsp;impact.</p>', 'https://res.cloudinary.com/dz7vmlvqn/image/upload/v1773144407/attorney_files/skoazexiyliz4d9u476c.jpg', '<h2>Driving&nbsp;Innovation&nbsp;with&nbsp;Purpose</h2><p>Innovation&nbsp;is&nbsp;at&nbsp;the&nbsp;core&nbsp;of&nbsp;our&nbsp;firm’s&nbsp;identity.&nbsp;We&nbsp;continuously&nbsp;explore&nbsp;new&nbsp;technologies,&nbsp;modern&nbsp;methodologies,&nbsp;and&nbsp;forward-thinking&nbsp;strategies&nbsp;to&nbsp;deliver&nbsp;measurable&nbsp;results.</p><p>Our&nbsp;approach&nbsp;blends&nbsp;creativity&nbsp;with&nbsp;precision,&nbsp;ensuring&nbsp;that&nbsp;every&nbsp;solution&nbsp;is&nbsp;practical,&nbsp;scalable,&nbsp;and&nbsp;future-ready.&nbsp;Inspired&nbsp;by&nbsp;global&nbsp;innovators&nbsp;like&nbsp;Apple&nbsp;Inc.&nbsp;and&nbsp;Tesla,&nbsp;Inc.,&nbsp;we&nbsp;foster&nbsp;a&nbsp;culture&nbsp;where&nbsp;bold&nbsp;ideas&nbsp;transform&nbsp;into&nbsp;real-world&nbsp;impact.</p>', 'https://res.cloudinary.com/dz7vmlvqn/image/upload/v1773144707/attorney_files/ktsorrdb3ml8nleujpmq.jpg', '<h2>Driving&nbsp;Innovation&nbsp;with&nbsp;Purpose</h2><p>Innovation&nbsp;is&nbsp;at&nbsp;the&nbsp;core&nbsp;of&nbsp;our&nbsp;firm’s&nbsp;identity.&nbsp;We&nbsp;continuously&nbsp;explore&nbsp;new&nbsp;technologies,&nbsp;modern&nbsp;methodologies,&nbsp;and&nbsp;forward-thinking&nbsp;strategies&nbsp;to&nbsp;deliver&nbsp;measurable&nbsp;results.</p><p>Our&nbsp;approach&nbsp;blends&nbsp;creativity&nbsp;with&nbsp;precision,&nbsp;ensuring&nbsp;that&nbsp;every&nbsp;solution&nbsp;is&nbsp;practical,&nbsp;scalable,&nbsp;and&nbsp;future-ready.&nbsp;Inspired&nbsp;by&nbsp;global&nbsp;innovators&nbsp;like&nbsp;Apple&nbsp;Inc.&nbsp;and&nbsp;Tesla,&nbsp;Inc.,&nbsp;we&nbsp;foster&nbsp;a&nbsp;culture&nbsp;where&nbsp;bold&nbsp;ideas&nbsp;transform&nbsp;into&nbsp;real-world&nbsp;impact.</p>', 'https://res.cloudinary.com/dz7vmlvqn/image/upload/v1773144707/attorney_files/ml7jtbgsotvk2c9zjyst.jpg', '2026-03-05 18:49:19', '2026-03-10 17:41:48');

-- --------------------------------------------------------

--
-- Table structure for table `privacy_policies`
--

CREATE TABLE `privacy_policies` (
  `id` int NOT NULL,
  `adminId` int NOT NULL,
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `content` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `privacy_policies`
--

INSERT INTO `privacy_policies` (`id`, `adminId`, `title`, `content`, `createdAt`, `updatedAt`) VALUES
(2, 1, 'title', 'content', '2026-02-17 13:10:13', '2026-02-17 13:10:40');

-- --------------------------------------------------------

--
-- Table structure for table `professionals`
--

CREATE TABLE `professionals` (
  `id` int NOT NULL,
  `bannerImage` varchar(255) DEFAULT NULL,
  `textEditor` longtext NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `professionals`
--

INSERT INTO `professionals` (`id`, `bannerImage`, `textEditor`, `createdAt`, `updatedAt`) VALUES
(2, 'https://res.cloudinary.com/dz7vmlvqn/image/upload/v1773478805/attorney_files/meyesdjabmr4i4syjkjx.webp', '<h1>&nbsp;Professional</h1><h1><br></h1>', '2026-03-14 14:30:05', '2026-03-14 15:54:42');

-- --------------------------------------------------------

--
-- Table structure for table `promoters`
--

CREATE TABLE `promoters` (
  `id` int NOT NULL,
  `adminId` int NOT NULL,
  `bannerImage` varchar(255) NOT NULL,
  `personName` varchar(255) NOT NULL,
  `personImage` varchar(255) NOT NULL,
  `designation` text NOT NULL,
  `specialization` text,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `email` varchar(255) NOT NULL DEFAULT '',
  `mobileNo` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `promoters`
--

INSERT INTO `promoters` (`id`, `adminId`, `bannerImage`, `personName`, `personImage`, `designation`, `specialization`, `createdAt`, `updatedAt`, `email`, `mobileNo`) VALUES
(2, 1, 'https://res.cloudinary.com/dz7vmlvqn/image/upload/v1773146306/attorney_files/xdig54o9l0bezy89o2wi.jpg', 'Raj Varma', 'https://res.cloudinary.com/dz7vmlvqn/image/upload/v1772888489/attorney_files/hjay7vzcr67yxtmytb2s.jpg', 'designation', 'We stay connected with our audience through leading global social platforms where we share insights, updates, and industry knowledge. Our professional presence reflects our values, expertise, and commitment to excellence. We actively engage in meaningful digital conversations and believe that transparency and communication are essential to building strong relationships. Through our online channels, we highlight achievements, milestones, thought leadership, and upcoming events. Our platforms also showcase our culture, vision, and dedication to innovation and growth. We celebrate success stories, client partnerships, and impactful initiatives while providing useful resources and reliable information. By maintaining an active and informative social presence, we ensure accessibility, responsiveness, and continuous engagement with our community. Connect with us to stay informed, explore opportunities, and be part of our journey as we collaborate and grow together.', '2026-02-18 11:24:04', '2026-03-10 18:08:27', 'user@gmail.com', '9898989898'),
(3, 1, '/uploads/1775021121860-433409008.jfif', 'Ujval', 'https://res.cloudinary.com/dz7vmlvqn/image/upload/v1772888478/attorney_files/pttttpq0l8ua3rcibzgw.jpg', 'This is designation is now live', 'We stay connected with our audience through leading global social platforms where we share insights, updates, and industry knowledge. Our professional presence reflects our values, expertise, and commitment to excellence. We actively engage in meaningful digital conversations and believe that transparency and communication are essential to building strong relationships. Through our online channels, we highlight achievements, milestones, thought leadership, and upcoming events. Our platforms also showcase our culture, vision, and dedication to innovation and growth. We celebrate success stories, client partnerships, and impactful initiatives while providing useful resources and reliable information. By maintaining an active and informative social presence, we ensure accessibility, responsiveness, and continuous engagement with our community. Connect with us to stay informed, explore opportunities, and be part of our journey as we collaborate and grow together.', '2026-03-03 11:45:01', '2026-04-01 10:55:21', 'ujval12@gmail.com', '2345679854');

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `id` int NOT NULL,
  `roleName` varchar(255) NOT NULL,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`id`, `roleName`, `createdAt`, `updatedAt`) VALUES
(1, 'manager', '2026-04-01 05:21:43', '2026-04-01 06:09:52');

-- --------------------------------------------------------

--
-- Table structure for table `services`
--

CREATE TABLE `services` (
  `id` int NOT NULL,
  `content` longtext NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `services`
--

INSERT INTO `services` (`id`, `content`, `createdAt`, `updatedAt`) VALUES
(2, 'Associate', '2026-03-30 14:11:23', '2026-03-30 14:11:23'),
(3, 'Shareholder', '2026-03-30 14:15:01', '2026-03-30 14:15:01');

-- --------------------------------------------------------

--
-- Table structure for table `social_media`
--

CREATE TABLE `social_media` (
  `id` int NOT NULL,
  `facebookUrl` varchar(255) DEFAULT NULL,
  `twitterUrl` varchar(255) DEFAULT NULL,
  `instagramUrl` varchar(255) DEFAULT NULL,
  `linkedinUrl` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `social_media`
--

INSERT INTO `social_media` (`id`, `facebookUrl`, `twitterUrl`, `instagramUrl`, `linkedinUrl`, `createdAt`, `updatedAt`) VALUES
(1, 'https://www.facebook.com/testpage', 'https://twitter.com/testpage', 'https://www.instagram.com/testpage', 'https://www.linkedin.com/company/testpage', '2026-02-19 13:30:39', '2026-02-19 14:16:20');

-- --------------------------------------------------------

--
-- Table structure for table `terms_conditions`
--

CREATE TABLE `terms_conditions` (
  `id` int NOT NULL,
  `adminId` int NOT NULL,
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `content` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `terms_conditions`
--

INSERT INTO `terms_conditions` (`id`, `adminId`, `title`, `content`, `createdAt`, `updatedAt`) VALUES
(2, 1, 'titles', 'contents', '2026-02-17 13:05:53', '2026-02-17 13:06:12');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int NOT NULL,
  `fullName` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `phoneNo` varchar(20) DEFAULT NULL,
  `roleId` int NOT NULL,
  `countryId` int DEFAULT NULL,
  `cityId` int DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `resetOtp` varchar(255) DEFAULT NULL,
  `resetOtpExpire` datetime DEFAULT NULL,
  `resetOtpVerified` tinyint(1) DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `fullName`, `email`, `password`, `phoneNo`, `roleId`, `countryId`, `cityId`, `createdAt`, `updatedAt`, `resetOtp`, `resetOtpExpire`, `resetOtpVerified`) VALUES
(1, 'Rituraj Singh', 'riturajsinghgour900@gmail.com', '$2b$10$YbRWL1Q.gb7xcw6s6tFBaeY.mdOOhICsL.UXkIgH09efWDQHeIKxq', '9876543210', 1, 5, 9, '2026-04-02 09:40:01', '2026-04-02 10:12:22', NULL, NULL, 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `admindashboard`
--
ALTER TABLE `admindashboard`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `attorney`
--
ALTER TABLE `attorney`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `fk_services` (`servicesId`);

--
-- Indexes for table `attorney_client_conversations`
--
ALTER TABLE `attorney_client_conversations`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_attorney_client` (`attorneyId`),
  ADD KEY `fk_client_attorney` (`clientId`);

--
-- Indexes for table `attorney_conversations`
--
ALTER TABLE `attorney_conversations`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_admin_attorney_conversation` (`adminId`),
  ADD KEY `fk_attorney_conversation` (`attorneyId`);

--
-- Indexes for table `awards`
--
ALTER TABLE `awards`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_awards_adminId` (`adminId`);

--
-- Indexes for table `blogcategories`
--
ALTER TABLE `blogcategories`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `categoryName` (`categoryName`);

--
-- Indexes for table `blogs`
--
ALTER TABLE `blogs`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `capabilities`
--
ALTER TABLE `capabilities`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `capability_categories`
--
ALTER TABLE `capability_categories`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_capability_categories_admin` (`adminId`);

--
-- Indexes for table `capability_subcategories`
--
ALTER TABLE `capability_subcategories`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_subcategory_admin` (`adminId`),
  ADD KEY `fk_subcategory_category` (`categoryId`);

--
-- Indexes for table `careerbanner`
--
ALTER TABLE `careerbanner`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `careerlaw`
--
ALTER TABLE `careerlaw`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `careers`
--
ALTER TABLE `careers`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `jobCode` (`jobCode`),
  ADD KEY `fk_lawCareerCategory` (`lawCareerCategoryId`),
  ADD KEY `fk_country` (`countryId`),
  ADD KEY `fk_city` (`cityId`);

--
-- Indexes for table `career_attorney`
--
ALTER TABLE `career_attorney`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_category` (`categoryid`);

--
-- Indexes for table `career_details`
--
ALTER TABLE `career_details`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `career_front`
--
ALTER TABLE `career_front`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_career_category` (`categoryId`);

--
-- Indexes for table `career_professional`
--
ALTER TABLE `career_professional`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_career_professional_category` (`categoryId`);

--
-- Indexes for table `cases`
--
ALTER TABLE `cases`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `case_categories`
--
ALTER TABLE `case_categories`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_case_categories_admin` (`adminId`);

--
-- Indexes for table `chat`
--
ALTER TABLE `chat`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `client`
--
ALTER TABLE `client`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `client_conversations`
--
ALTER TABLE `client_conversations`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_admin_conversation` (`adminId`),
  ADD KEY `fk_client_conversation` (`clientId`);

--
-- Indexes for table `cms_category`
--
ALTER TABLE `cms_category`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_cms_capability_admin` (`adminId`),
  ADD KEY `fk_cms_capability_category` (`categoryId`);

--
-- Indexes for table `cms_subcategory`
--
ALTER TABLE `cms_subcategory`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_cms_subcategory_admin` (`adminId`),
  ADD KEY `fk_cms_subcategory_category` (`categoryId`),
  ADD KEY `fk_cms_subcategory_subcategory` (`subcategoryId`);

--
-- Indexes for table `contact_text`
--
ALTER TABLE `contact_text`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `conversation_participants`
--
ALTER TABLE `conversation_participants`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_user` (`userId`);

--
-- Indexes for table `enquiries`
--
ALTER TABLE `enquiries`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `event`
--
ALTER TABLE `event`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_event_capability_category` (`capabilityCategoryId`),
  ADD KEY `fk_event_country` (`countryId`);

--
-- Indexes for table `event_banner`
--
ALTER TABLE `event_banner`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `home_banner_text`
--
ALTER TABLE `home_banner_text`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_home_banner_type` (`typeId`);

--
-- Indexes for table `home_count`
--
ALTER TABLE `home_count`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `home_data`
--
ALTER TABLE `home_data`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `home_ranking`
--
ALTER TABLE `home_ranking`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `job_categories`
--
ALTER TABLE `job_categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `law_career_categories`
--
ALTER TABLE `law_career_categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `location_city`
--
ALTER TABLE `location_city`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_location_city_admin` (`adminId`),
  ADD KEY `fk_location_city_country` (`countryId`);

--
-- Indexes for table `location_cms`
--
ALTER TABLE `location_cms`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_location_cms_admin` (`adminId`),
  ADD KEY `fk_location_cms_country` (`countryId`),
  ADD KEY `fk_location_cms_city` (`cityId`);

--
-- Indexes for table `location_country`
--
ALTER TABLE `location_country`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_location_country_admin` (`adminId`);

--
-- Indexes for table `location_page`
--
ALTER TABLE `location_page`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `logo_types`
--
ALTER TABLE `logo_types`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `type` (`type`);

--
-- Indexes for table `messages`
--
ALTER TABLE `messages`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `news`
--
ALTER TABLE `news`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_news_admin` (`adminId`);

--
-- Indexes for table `our_firm`
--
ALTER TABLE `our_firm`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_our_firm_adminId` (`adminId`);

--
-- Indexes for table `privacy_policies`
--
ALTER TABLE `privacy_policies`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_privacy_policies_admin` (`adminId`);

--
-- Indexes for table `professionals`
--
ALTER TABLE `professionals`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `promoters`
--
ALTER TABLE `promoters`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_promoters_adminId` (`adminId`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `roleName` (`roleName`);

--
-- Indexes for table `services`
--
ALTER TABLE `services`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `social_media`
--
ALTER TABLE `social_media`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `terms_conditions`
--
ALTER TABLE `terms_conditions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_terms_conditions_admin` (`adminId`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `fk_users_role` (`roleId`),
  ADD KEY `fk_users_country` (`countryId`),
  ADD KEY `fk_users_city` (`cityId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `admindashboard`
--
ALTER TABLE `admindashboard`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `attorney`
--
ALTER TABLE `attorney`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `attorney_client_conversations`
--
ALTER TABLE `attorney_client_conversations`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `attorney_conversations`
--
ALTER TABLE `attorney_conversations`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `awards`
--
ALTER TABLE `awards`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `blogcategories`
--
ALTER TABLE `blogcategories`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `blogs`
--
ALTER TABLE `blogs`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `capabilities`
--
ALTER TABLE `capabilities`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `capability_categories`
--
ALTER TABLE `capability_categories`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `capability_subcategories`
--
ALTER TABLE `capability_subcategories`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `careerbanner`
--
ALTER TABLE `careerbanner`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `careerlaw`
--
ALTER TABLE `careerlaw`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `careers`
--
ALTER TABLE `careers`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `career_attorney`
--
ALTER TABLE `career_attorney`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `career_details`
--
ALTER TABLE `career_details`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `career_front`
--
ALTER TABLE `career_front`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `career_professional`
--
ALTER TABLE `career_professional`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `cases`
--
ALTER TABLE `cases`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `case_categories`
--
ALTER TABLE `case_categories`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `chat`
--
ALTER TABLE `chat`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `client`
--
ALTER TABLE `client`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `client_conversations`
--
ALTER TABLE `client_conversations`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=48;

--
-- AUTO_INCREMENT for table `cms_category`
--
ALTER TABLE `cms_category`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `cms_subcategory`
--
ALTER TABLE `cms_subcategory`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `contact_text`
--
ALTER TABLE `contact_text`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `conversation_participants`
--
ALTER TABLE `conversation_participants`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `enquiries`
--
ALTER TABLE `enquiries`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `event`
--
ALTER TABLE `event`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `event_banner`
--
ALTER TABLE `event_banner`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `home_banner_text`
--
ALTER TABLE `home_banner_text`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `home_count`
--
ALTER TABLE `home_count`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `home_data`
--
ALTER TABLE `home_data`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `home_ranking`
--
ALTER TABLE `home_ranking`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `job_categories`
--
ALTER TABLE `job_categories`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `law_career_categories`
--
ALTER TABLE `law_career_categories`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `location_city`
--
ALTER TABLE `location_city`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `location_cms`
--
ALTER TABLE `location_cms`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `location_country`
--
ALTER TABLE `location_country`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `location_page`
--
ALTER TABLE `location_page`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `logo_types`
--
ALTER TABLE `logo_types`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `messages`
--
ALTER TABLE `messages`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `news`
--
ALTER TABLE `news`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `our_firm`
--
ALTER TABLE `our_firm`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `privacy_policies`
--
ALTER TABLE `privacy_policies`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `professionals`
--
ALTER TABLE `professionals`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `promoters`
--
ALTER TABLE `promoters`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `services`
--
ALTER TABLE `services`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `social_media`
--
ALTER TABLE `social_media`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `terms_conditions`
--
ALTER TABLE `terms_conditions`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `attorney`
--
ALTER TABLE `attorney`
  ADD CONSTRAINT `fk_services` FOREIGN KEY (`servicesId`) REFERENCES `services` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `attorney_client_conversations`
--
ALTER TABLE `attorney_client_conversations`
  ADD CONSTRAINT `fk_attorney_client` FOREIGN KEY (`attorneyId`) REFERENCES `attorney` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_client_attorney` FOREIGN KEY (`clientId`) REFERENCES `client` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `attorney_conversations`
--
ALTER TABLE `attorney_conversations`
  ADD CONSTRAINT `fk_admin_attorney_conversation` FOREIGN KEY (`adminId`) REFERENCES `admin` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_attorney_conversation` FOREIGN KEY (`attorneyId`) REFERENCES `attorney` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `awards`
--
ALTER TABLE `awards`
  ADD CONSTRAINT `fk_awards_admin` FOREIGN KEY (`adminId`) REFERENCES `admin` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `capability_categories`
--
ALTER TABLE `capability_categories`
  ADD CONSTRAINT `fk_capability_categories_admin` FOREIGN KEY (`adminId`) REFERENCES `admin` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `capability_subcategories`
--
ALTER TABLE `capability_subcategories`
  ADD CONSTRAINT `fk_subcategory_admin` FOREIGN KEY (`adminId`) REFERENCES `admin` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_subcategory_category` FOREIGN KEY (`categoryId`) REFERENCES `capability_categories` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `careers`
--
ALTER TABLE `careers`
  ADD CONSTRAINT `fk_city` FOREIGN KEY (`cityId`) REFERENCES `location_city` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_country` FOREIGN KEY (`countryId`) REFERENCES `location_country` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_lawCareerCategory` FOREIGN KEY (`lawCareerCategoryId`) REFERENCES `law_career_categories` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `career_attorney`
--
ALTER TABLE `career_attorney`
  ADD CONSTRAINT `fk_category` FOREIGN KEY (`categoryid`) REFERENCES `law_career_categories` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `career_front`
--
ALTER TABLE `career_front`
  ADD CONSTRAINT `fk_career_category` FOREIGN KEY (`categoryId`) REFERENCES `law_career_categories` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `career_professional`
--
ALTER TABLE `career_professional`
  ADD CONSTRAINT `fk_career_professional_category` FOREIGN KEY (`categoryId`) REFERENCES `law_career_categories` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `case_categories`
--
ALTER TABLE `case_categories`
  ADD CONSTRAINT `fk_case_categories_admin` FOREIGN KEY (`adminId`) REFERENCES `admin` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `client_conversations`
--
ALTER TABLE `client_conversations`
  ADD CONSTRAINT `fk_admin_conversation` FOREIGN KEY (`adminId`) REFERENCES `admin` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_client_conversation` FOREIGN KEY (`clientId`) REFERENCES `client` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `cms_category`
--
ALTER TABLE `cms_category`
  ADD CONSTRAINT `fk_cms_capability_admin` FOREIGN KEY (`adminId`) REFERENCES `admin` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_cms_capability_category` FOREIGN KEY (`categoryId`) REFERENCES `capability_categories` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `cms_subcategory`
--
ALTER TABLE `cms_subcategory`
  ADD CONSTRAINT `fk_cms_subcategory_admin` FOREIGN KEY (`adminId`) REFERENCES `admin` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_cms_subcategory_category` FOREIGN KEY (`categoryId`) REFERENCES `capability_categories` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_cms_subcategory_subcategory` FOREIGN KEY (`subcategoryId`) REFERENCES `capability_subcategories` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `conversation_participants`
--
ALTER TABLE `conversation_participants`
  ADD CONSTRAINT `fk_user` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `event`
--
ALTER TABLE `event`
  ADD CONSTRAINT `fk_event_capability_category` FOREIGN KEY (`capabilityCategoryId`) REFERENCES `capability_categories` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_event_country` FOREIGN KEY (`countryId`) REFERENCES `location_country` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `home_banner_text`
--
ALTER TABLE `home_banner_text`
  ADD CONSTRAINT `fk_home_banner_type` FOREIGN KEY (`typeId`) REFERENCES `logo_types` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `location_city`
--
ALTER TABLE `location_city`
  ADD CONSTRAINT `fk_location_city_admin` FOREIGN KEY (`adminId`) REFERENCES `admin` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_location_city_country` FOREIGN KEY (`countryId`) REFERENCES `location_country` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `location_cms`
--
ALTER TABLE `location_cms`
  ADD CONSTRAINT `fk_location_cms_admin` FOREIGN KEY (`adminId`) REFERENCES `admin` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_location_cms_city` FOREIGN KEY (`cityId`) REFERENCES `location_city` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_location_cms_country` FOREIGN KEY (`countryId`) REFERENCES `location_country` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `location_country`
--
ALTER TABLE `location_country`
  ADD CONSTRAINT `fk_location_country_admin` FOREIGN KEY (`adminId`) REFERENCES `admin` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `news`
--
ALTER TABLE `news`
  ADD CONSTRAINT `fk_news_admin` FOREIGN KEY (`adminId`) REFERENCES `admin` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `our_firm`
--
ALTER TABLE `our_firm`
  ADD CONSTRAINT `fk_our_firm_admin` FOREIGN KEY (`adminId`) REFERENCES `admin` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `privacy_policies`
--
ALTER TABLE `privacy_policies`
  ADD CONSTRAINT `fk_privacy_policies_admin` FOREIGN KEY (`adminId`) REFERENCES `admin` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `promoters`
--
ALTER TABLE `promoters`
  ADD CONSTRAINT `fk_promoters_admin` FOREIGN KEY (`adminId`) REFERENCES `admin` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `terms_conditions`
--
ALTER TABLE `terms_conditions`
  ADD CONSTRAINT `fk_terms_conditions_admin` FOREIGN KEY (`adminId`) REFERENCES `admin` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `fk_users_city` FOREIGN KEY (`cityId`) REFERENCES `location_city` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_users_country` FOREIGN KEY (`countryId`) REFERENCES `location_country` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_users_role` FOREIGN KEY (`roleId`) REFERENCES `roles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
