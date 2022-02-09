-- MySQL dump 10.13  Distrib 5.5.62, for Win32 (AMD64)
--
-- Host: localhost    Database: EcommerceApp
-- ------------------------------------------------------
-- Server version	5.7.33-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `cartdetails`
--

DROP TABLE IF EXISTS `cartdetails`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cartdetails` (
  `UserId` varchar(50) DEFAULT NULL,
  `ProductId` varchar(50) DEFAULT NULL,
  `AddTime` varchar(500) DEFAULT NULL,
  `Ordered` varchar(50) DEFAULT NULL,
  KEY `CartDetails_UserId_idx` (`UserId`),
  KEY `CartDetails_ProductId_idx` (`ProductId`),
  KEY `CartDetails_AddTime_idx` (`AddTime`),
  KEY `CartDetails_Ordered_idx` (`Ordered`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cartdetails`
--

/*!40000 ALTER TABLE `cartdetails` DISABLE KEYS */;
/*!40000 ALTER TABLE `cartdetails` ENABLE KEYS */;

--
-- Table structure for table `orderdetails`
--

DROP TABLE IF EXISTS `orderdetails`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `orderdetails` (
  `OrderId` varchar(500) DEFAULT NULL,
  `UserId` varchar(500) DEFAULT NULL,
  `ProductId` varchar(500) DEFAULT NULL,
  `OrderedTime` varchar(500) DEFAULT NULL,
  `Status` varchar(500) DEFAULT NULL,
  KEY `OrderDetails_OrderId_idx` (`OrderId`),
  KEY `OrderDetails_UserId_idx` (`UserId`),
  KEY `OrderDetails_ProductId_idx` (`ProductId`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orderdetails`
--

/*!40000 ALTER TABLE `orderdetails` DISABLE KEYS */;
/*!40000 ALTER TABLE `orderdetails` ENABLE KEYS */;

--
-- Table structure for table `productdetails`
--

DROP TABLE IF EXISTS `productdetails`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `productdetails` (
  `ProductId` varchar(500) NOT NULL,
  `ProductName` mediumtext CHARACTER SET utf8 COLLATE utf8_unicode_ci,
  `Category` varchar(500) DEFAULT NULL,
  `Colour` varchar(500) DEFAULT NULL,
  `Description` mediumtext CHARACTER SET utf8 COLLATE utf8_unicode_ci,
  `ProductShow` varchar(100) DEFAULT NULL,
  `GenDate` varchar(500) DEFAULT NULL,
  `Photo` varchar(500) DEFAULT NULL,
  `Amount` float DEFAULT NULL,
  PRIMARY KEY (`ProductId`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `productdetails`
--

/*!40000 ALTER TABLE `productdetails` DISABLE KEYS */;
INSERT INTO `productdetails` VALUES ('1b5c53f2-b787-4160-b699-c4c89869962e','Samsung Galaxy M52 5G (ICY Blue, 6GB RAM, 128GB Storage) Latest Snapdragon 778G 5G | sAMOLED 120Hz Display','Smartphone','Icy Blue','Triple camera setup-64MP (F 1.8) main camera + 12MP (F2.2) Ultra wide camera+ 5MP (F2.4) depth camera 32MP (F2.2) front camera\n16.95 centimeters (6.7-inch) Super AMOLED Plus- Infinity O display, FHD+ resolution 1080 x 2400 (FHD+) pixels protected by Gorilla Glass 5\nQualcomm SDM 778G Octa Core 2.4GHz,1.8GHz Processor with the 11 band support for a True 5G experience\nMonster 5000 mAh Battery | Memory, Storage & SIM: 8GB RAM | 128GB internal memory expandable up to 1TB| SIM 1 + Hybrid (SIM or MicroSD)\nAndroid v11.0, One UI 3.1 operating system, 5000mAH lithium-ion battery, 1 year manufacturer warranty for device and 6 months manufacturer warranty for in-box accessories including batteries from the date of purchase','T','05/02/2022 04:17:00 PM','http://jkcmassociates.com/Development/EcommerceApp/Images/2.jpg',24999),('47c1934c-182f-4bd6-a59f-30137de47172','Redmi 9 Activ (Coral Green, 4GB RAM, 64GB Storage)','Smartphone','Coral Green','Processor: Octa-core Helio G35 and upto 2.3GHz clock speed\nCamera: 13+2 MP Dual Rear camera with AI portrait| 5 MP front camera\nDisplay: 16.58 centimeters (6.53-inch) HD+ display with 720x1600 pixels and 20:9 aspect ratio\nBattery: 5000 mAH large battery with 10W wired charger in-box\nMemory, Storage & SIM: 4GB RAM | 64GB storage | Dual SIM (nano+nano) + Dedicated SD card slot','T','05/02/2022 04:17:00 PM','http://jkcmassociates.com/Development/EcommerceApp/Images/4.jpg',9999),('824cd04b-db3f-49a2-91f6-884e9e506119','Techno Pop 5 | Dual Rear Camera | 5000mah Battery | Water Proof','Smartphone','Turquoise Cyan','Vibrant 6.52\" Dot Notch HD+ display for perfect viewing experience | 90% screen to body ratio | 480nits max. brightness | No support for Africas frequency bands\n5000mAh battery for unstoppable entertainment | Ultra Power Saving Mode | 48Hours of Video Playback | Battery Lab\n8MP Portrait Dual rear Camera for clear images | Excellent Image Processing | Dual Flashlight\nMicro Slit Front Flash for brighter Night selfies | Adjustable brightness to get a perfect selfie | 5MP F2.0 Aperture Front Camera\nTrendy and Stylish Design | Glossy finish with visual light reflection makes it a design icon | Attractive colors with Premium appeal','T','05/02/2022 04:17:00 PM','http://jkcmassociates.com/Development/EcommerceApp/Images/1.jpg',8900),('ca0b3a46-a1a7-47ee-a7bd-c27a9d56ba65','I KALL Z1 Smartphone (5.5\" Display, 4GB, 32GB, Dual Sim) (Grey)','Smartphone','Grey','8MP Rear Camera | 5MP Front Camera | Made in India, This phone has single rear camera and single front camera\n13.97 cm (5.5 inch) Display | multi-touch capacitive touch screen with 480x960 pixel resolution\n4GB ram, 32GB storage | Expandable Memory 64GB | Dual Sim | 4G Volte\nAndroid 8.1 with 1.3 Ghz Quad Core\n1 Year manufacturing warranty for mobile and 6 months for accessories','T','05/02/2022 04:17:00 PM','http://jkcmassociates.com/Development/EcommerceApp/Images/3.jpg',5399),('f72a12ea-44ca-4e53-9489-ff8436995212','OPPO A31 (Fantasy White, 6GB RAM, 128GB Storage)','Smartphone','Fantasy White','12+2+2MP triple rear camera (12MP main camera+2MP macro lens+2MP depth camera) with Portrait bokeh, macro lens, dazzle color mode, AI beautification | 8MP front camera\n16.5 centimeters (6.5-inch) waterdrop multi touch screen with an 89% screen to body ratio | 1600 x 720 pixels resolution, 269 ppi pixel density\nMemory, Storage & SIM: 6GB RAM | 128GB internal memory expandable up to 256GB | Dual SIM (nano+nano) dual-standby (4G+4G)\nAndroid Pie v9.0 based on ColorOS 6.1 operating system with 2.3GHz Mediatek 6765 octa core processor, IMG GE8320\n4230mAH lithium-polymer battery providing talk-time of 45 hours and standby time of 450 hours\n1 year manufacturer warranty for device and 6 months manufacturer warranty for in-box accessories including batteries from the date of purchase\nBox also includes: USB cable, Sim tray ejecter, pre-applied screen protector and protective case, booklet with warranty card and quick guide. The box does not include earphones','T','05/02/2022 04:17:00 PM','http://jkcmassociates.com/Development/EcommerceApp/Images/5.jpg',12990);
/*!40000 ALTER TABLE `productdetails` ENABLE KEYS */;

--
-- Table structure for table `productinformation`
--

DROP TABLE IF EXISTS `productinformation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `productinformation` (
  `ProductId` varchar(500) DEFAULT NULL,
  `Name` varchar(500) DEFAULT NULL,
  `Value` mediumtext CHARACTER SET utf8 COLLATE utf8_unicode_ci,
  KEY `ProductInformation_ProductId_idx` (`ProductId`),
  KEY `ProductInformation_Name_idx` (`Name`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `productinformation`
--

/*!40000 ALTER TABLE `productinformation` DISABLE KEYS */;
INSERT INTO `productinformation` VALUES ('824cd04b-db3f-49a2-91f6-884e9e506119','OS','HiOS 7.6 based on Android 11'),('824cd04b-db3f-49a2-91f6-884e9e506119','RAM','2 GB'),('824cd04b-db3f-49a2-91f6-884e9e506119','Product Dimensions','16.5 x 7.6 x 0.9 cm; 195 Grams'),('824cd04b-db3f-49a2-91f6-884e9e506119','Batteries','1 Lithium Polymer batteries required. (included)'),('824cd04b-db3f-49a2-91f6-884e9e506119','Item model number','BD4i'),('824cd04b-db3f-49a2-91f6-884e9e506119','Wireless communication technologies','Cellular'),('824cd04b-db3f-49a2-91f6-884e9e506119','Connectivity technologies','Bluetooth, Wi-Fi, USB'),('824cd04b-db3f-49a2-91f6-884e9e506119','GPS','GPS/GNSS/BEIDOU/Galileo'),('824cd04b-db3f-49a2-91f6-884e9e506119','Special features','Enhanced Regional Language Supports | Enjoy in 14 Regional languages, Kids Mode | Anti Theft Alarm | Vault 2.0 | Voice Changer, Splash Resistant up to IPX2 rating | No worry of water splashes, Face Unlock | Closed Eye Protection | 0.93 Sec Instant Unlock, 120Hz Touch Sampling Rate | Smoother touch response'),('824cd04b-db3f-49a2-91f6-884e9e506119','Other display features','Wireless'),('824cd04b-db3f-49a2-91f6-884e9e506119','Device interface - primary','Touchscreen'),('824cd04b-db3f-49a2-91f6-884e9e506119','Other camera features','8MP+AI Lens, Dual Flashlight, F2.0 Aperture, AI Portrait, HDR, AI Beauty, Filters, 16 AI Scene Detection, 4X Zoom, 1080P Video, Rear'),('824cd04b-db3f-49a2-91f6-884e9e506119','Audio Jack','3.5 mm'),('824cd04b-db3f-49a2-91f6-884e9e506119','Form factor','Touch'),('824cd04b-db3f-49a2-91f6-884e9e506119','Colour','Turquoise Cyan'),('824cd04b-db3f-49a2-91f6-884e9e506119','Battery Power Rating','5000'),('824cd04b-db3f-49a2-91f6-884e9e506119','Phone Talk Time','18 Hours'),('824cd04b-db3f-49a2-91f6-884e9e506119','Phone Standby Time (with data)','31 Days'),('824cd04b-db3f-49a2-91f6-884e9e506119','Whats in the box','Pop 5 LTE, Adaptor, Micro USB Cable, SIM Ejector Tool'),('824cd04b-db3f-49a2-91f6-884e9e506119','Manufacturer','G-mobile'),('824cd04b-db3f-49a2-91f6-884e9e506119','Country of Origin','India'),('824cd04b-db3f-49a2-91f6-884e9e506119','Item Weight','195 g');
/*!40000 ALTER TABLE `productinformation` ENABLE KEYS */;

--
-- Table structure for table `userdetails`
--

DROP TABLE IF EXISTS `userdetails`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `userdetails` (
  `UserId` varchar(50) NOT NULL,
  `Name` varchar(500) DEFAULT NULL,
  `EmailId` varchar(500) DEFAULT NULL,
  `ContactNo` varchar(500) DEFAULT NULL,
  `Password` varchar(500) DEFAULT NULL,
  `GenDate` varchar(500) DEFAULT NULL,
  `HouseNo` mediumtext CHARACTER SET utf8 COLLATE utf8_unicode_ci,
  `Building` mediumtext CHARACTER SET utf8 COLLATE utf8_unicode_ci,
  `Landmark` mediumtext CHARACTER SET utf8 COLLATE utf8_unicode_ci,
  `Area` mediumtext CHARACTER SET utf8 COLLATE utf8_unicode_ci,
  `District` mediumtext CHARACTER SET utf8 COLLATE utf8_unicode_ci,
  `State` mediumtext CHARACTER SET utf8 COLLATE utf8_unicode_ci,
  `Pincode` mediumtext CHARACTER SET utf8 COLLATE utf8_unicode_ci,
  PRIMARY KEY (`UserId`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `userdetails`
--

/*!40000 ALTER TABLE `userdetails` DISABLE KEYS */;
/*!40000 ALTER TABLE `userdetails` ENABLE KEYS */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-02-09  7:04:33
