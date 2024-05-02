-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 02, 2024 at 07:24 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `sf_eng`
--

-- --------------------------------------------------------

--
-- Table structure for table `blog_posts`
--

CREATE TABLE `blog_posts` (
  `id` int(11) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `code` varchar(255) DEFAULT NULL,
  `text` text DEFAULT NULL,
  `image_url` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `insert_img`
--

CREATE TABLE `insert_img` (
  `id` int(11) NOT NULL,
  `make` varchar(255) NOT NULL,
  `company` varchar(255) NOT NULL,
  `type` varchar(255) NOT NULL,
  `current_price` varchar(255) NOT NULL,
  `launched_price` varchar(255) NOT NULL,
  `image` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `insert_img`
--

INSERT INTO `insert_img` (`id`, `make`, `company`, `type`, `current_price`, `launched_price`, `image`) VALUES
(1, 'fvdc', 'vfdc', 'fvdc', '1234', '1245', 'uploads\\1712081801434-sign.png'),
(2, 'leo', 'qwe', 'qwert', '1234', '12456', 'uploads\\1712082271924-wilbert-photo.jpg'),
(3, 'leonal', 'hp', 'laptop', '26000', '50000', 'D:\\frontend-backend working\\company_recruitment\\server\\uploads\\1712084999969-image.jpg'),
(4, 'e3rf', 'edrf', 'e3rf', '12345', '23456', 'D:\\frontend-backend working\\software_backend\\server\\uploads\\1712387562248-Gemini_Generated_Image.jpeg'),
(5, 'hnbg', 'nhbgv', 'tred', '234', '345t', 'D:\\frontend-backend working\\software_backend\\server\\uploads\\1712387908957-Gemini_Generated_Image.jpeg'),
(6, 'tfgyhuj', 'fvgbh', 'fgbhn', '4567', '5678', 'D:\\frontend-backend working\\software_backend\\server\\uploads\\1712388726761-Gemini_Generated_Image.jpeg'),
(7, 'juhnygt', 'hygt', 'hygt', '654', '765', 'D:\\frontend-backend working\\software_backend\\server\\uploads\\1712388787463-Gemini_Generated_Image.jpeg');

-- --------------------------------------------------------

--
-- Table structure for table `passwords`
--

CREATE TABLE `passwords` (
  `id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `passwords`
--

INSERT INTO `passwords` (`id`, `email`, `password`) VALUES
(1, '12leo@gmail.com', '123'),
(2, 'leo123@gmail.com', 'password123'),
(3, 'leo123@gmail.com', 'password123'),
(4, 'leo123@gmail.com', '1234'),
(5, 'leo45@gmail.com', '123'),
(7, 'leo45@gmail.com', '678');

-- --------------------------------------------------------

--
-- Table structure for table `predictions`
--

CREATE TABLE `predictions` (
  `id` int(11) NOT NULL,
  `pdtName` varchar(255) DEFAULT NULL,
  `storage` varchar(255) DEFAULT NULL,
  `ram` varchar(255) DEFAULT NULL,
  `pdtDatesPrices` text DEFAULT NULL,
  `smartphone_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `predictions`
--

INSERT INTO `predictions` (`id`, `pdtName`, `storage`, `ram`, `pdtDatesPrices`, `smartphone_id`) VALUES
(6, 'iPhone 12', '256GB', '4GB', '[{\n    \"2022-10-22\": 52399,\n    \"2022-11-28\": 54999,\n    \"2022-12-30\": 59000,\n    \"2023-01-27\": 57800,\n    \"2023-12-02\": 52000,\n    \"2023-11-03\": 64000,\n    \"2023-11-04\": 51000,\n    \"2023-12-05\": 51000,\n    \"2023-10-06\": 49999,\n    \"2023-07-22\": 52000,\n    \"2023-08-27\": 53999\n}]\n', 68),
(8, 'iPhone 14 Pro Max', '512GB', '8GB', '{\"2023-10-31\": 164900.00, \"2023-10-30\": 124999.00, \"2023-10-29\": 164900.00}', 70),
(10, 'iPhone 14', '512GB', '8GB', '{\"2023-12-17\": 71999.00, \"2023-12-06\": 91999.00, \"2023-08-21\": 97999.00}', 72),
(11, 'iPhone 13', '512GB', '8GB', '{\"2023-12-1\": 68999.00, \"2023-08-29\": 69999.00, \"2023-05-25\": 50900.00}', 73),
(12, 'iPhone 13 pro max', '512GB', '8GB', '{\"2023-1-12\": 157900.00, \"2023-01-05\": 117900.00, \"2023-12-26\": 143699.00}', 74),
(13, 'PIXEL 6', '128GB', '8GB', '{\"2023-1-12\": 67900.00, \"2023-04-05\": 56900.00, \"2023-12-26\": 53699.00}', 75),
(14, 'ACER ASPIRE 5', '512GB', '16GB', '{\"2023-4-22\": 77900.00, \"2023-05-15\": 76900.00, \"2023-12-16\": 73699.00}', 76),
(15, 'Google Pixel Watch', NULL, NULL, '{\"2023-5-02\": 27900.00, \"2023-05-13\": 26900.00, \"2023-11-16\": 23699.00}', 77),
(16, 'ACER PREDATOR HELIOS 300', NULL, '16GB', '{\"2023-4-12\": 107900.00, \"2023-05-25\": 96900.00, \"2023-10-16\": 93699.00}', 78),
(17, 'Dell Inspiron 15 5000 Series', '512GB', '8GB', '{\"2023-3-12\": 77900.00, \"2023-05-05\": 66900.00, \"2023-07-16\": 63699.00}', 79),
(18, 'Dell Alienware M15 R6', '1TB SSD', '32GB DDR4', '{\"2023-02-24\": 177900.00, \"2023-05-15\": 166900.00, \"2023-12-30\": 163699.00}', 80),
(19, 'APPLE WATCH SERIES 9', NULL, NULL, '{\"2023-6-22\": 37900.00, \"2023-07-13\": 36900.00, \"2023-11-8\": 33699.00}', 81),
(20, 'Sony WH-1000XM5 Wireless Active Noise Cancelling Headphones', NULL, NULL, '{\"2023-3-12\": 31900.00, \"2023-07-03\": 26900.00, \"2023-09-8\": 23699.00}', 82),
(21, 'Marshall Willen Portable Bluetooth 20 Watts Speaker', NULL, NULL, '{\"2023-5-2\": 31900.00, \"2023-06-23\": 26900.00, \"2023-11-8\": 23699.00}', 83),
(22, 'iPhone 12', 'edf', '', '[{\"date\":\"2024-05-03\",\"price\":\"1200\"},{\"date\":\"2024-05-08\",\"price\":\"1300\"}]', NULL),
(23, 'iPhone 12', 'edf', '', '[{\"date\":\"2024-05-03\",\"price\":\"1200\"},{\"date\":\"2024-05-08\",\"price\":\"1300\"}]', NULL),
(24, 'iPhone 12', 'edf', '', '[{\"date\":\"2024-05-03\",\"price\":\"1200\"},{\"date\":\"2024-05-08\",\"price\":\"1300\"}]', NULL),
(25, 'iPhone 12', 'edf', '', '[{\"date\":\"2024-05-03\",\"price\":\"1200\"},{\"date\":\"2024-05-08\",\"price\":\"1300\"}]', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `questions`
--

CREATE TABLE `questions` (
  `id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `question` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `questions`
--

INSERT INTO `questions` (`id`, `email`, `question`, `created_at`) VALUES
(1, 'leo@gmail.com', 'dfgbnhfd', '2024-05-02 04:57:24'),
(2, 'leo@gmail.com', 'dfgbnhfd', '2024-05-02 04:57:24'),
(3, 'ghg@gmail.com', 'xdfchgvjbk', '2024-05-02 05:09:13'),
(4, 'jyfyu@gmail.com', 'cdvf', '2024-05-02 05:18:41'),
(5, 'uvuv@gmail.com', 'vddf', '2024-05-02 05:37:07');

-- --------------------------------------------------------

--
-- Table structure for table `smartphones`
--

CREATE TABLE `smartphones` (
  `id` int(11) NOT NULL,
  `pdt_name` varchar(50) DEFAULT NULL,
  `current_price` decimal(10,2) DEFAULT NULL,
  `initial_price` decimal(10,2) DEFAULT NULL,
  `storage_capacity` int(11) DEFAULT NULL,
  `ram` int(11) DEFAULT NULL,
  `display_description` varchar(100) DEFAULT NULL,
  `resolution` varchar(20) DEFAULT NULL,
  `refresh_rate` varchar(10) DEFAULT NULL,
  `camera_setup` varchar(100) DEFAULT NULL,
  `processor` varchar(50) DEFAULT NULL,
  `battery_life` varchar(50) DEFAULT NULL,
  `operating_system` varchar(20) DEFAULT NULL,
  `biometric_security` varchar(20) DEFAULT NULL,
  `water_resistance` varchar(10) DEFAULT NULL,
  `fast_charging_support` varchar(3) DEFAULT 'no',
  `wireless_charging_support` varchar(3) DEFAULT 'no',
  `connectivity_options` varchar(100) DEFAULT NULL,
  `color_options` varchar(100) DEFAULT NULL,
  `dimensions` varchar(50) DEFAULT NULL,
  `image_path` varchar(255) DEFAULT NULL,
  `product` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `smartphones`
--

INSERT INTO `smartphones` (`id`, `pdt_name`, `current_price`, `initial_price`, `storage_capacity`, `ram`, `display_description`, `resolution`, `refresh_rate`, `camera_setup`, `processor`, `battery_life`, `operating_system`, `biometric_security`, `water_resistance`, `fast_charging_support`, `wireless_charging_support`, `connectivity_options`, `color_options`, `dimensions`, `image_path`, `product`) VALUES
(68, 'iPhone 12', 799.00, 799.00, 256, 4, '6.1\" Super Retina XDR display', '1170x2532 pixels', '60Hz', 'Dual: 12MP + 12MP', 'Apple A14 Bionic', '2815mAh', 'iOS 15', 'Face ID', 'IP68', 'yes', 'yes', 'Wi-Fi 802.11, Bluetooth 5.0, NFC', 'Black, White, Red, Green, Blue', '146.7 x 71.5 x 7.4 mm', 'D:\\frontend-backend working\\software_backend\\server\\uploads\\iphone_12.jpeg', 'smartphones'),
(70, 'iPhone 14 Pro Max', 52399.00, 52399.00, 512, 8, '6.1\" Super Retina XDR OLED display', '2556x1179 pixels', '120Hz', 'Dual: 12MP + 12MP', 'Apple A16 Bionic', '4323mAh', 'iOS 16', 'Face ID', 'IP68', 'yes', 'yes', 'Wi-Fi 802.11, Bluetooth 5.0, NFC', 'Space Black, Silver, Gold, Deep purple', '146.7 x 71.5 x 7.4 mm', 'D:\\frontend-backend working\\software_backend\\server\\uploads\\iphone_14_promax.jpg', 'smartphones'),
(72, 'iPhone 14', 88999.00, 88999.00, 512, 8, '6.1\" Super Retina XDR display', '2532x1170 pixel', '60Hz', 'Dual: 12MP + 12MP', 'Apple A15 Bionic', '3,279mAh', 'iOS 16', 'Face ID', 'IP68', 'yes', 'yes', 'Wi-Fi 802.11, Bluetooth 5.0, NFC', 'midnight, starlight, (product)Red, purple, blue', '146.7 x 71.5 x 7.8 mm ', 'D:\\frontend-backend working\\software_backend\\server\\uploads\\iphone_14.jpg', 'smartphones'),
(73, 'iPhone 13', 81900.00, 81900.00, 512, 8, '6.1\" Super Retina XDR OLED display', '2532×1170 pixels', '60Hz', 'Dual: 12MP + 12MP', 'Apple A15 Bionic', '3227mAh', 'iOS 15', 'Face ID', 'IP68', 'yes', 'yes', 'Wi-Fi 802.11, Bluetooth 5.0, NFC', 'midnight, starlight, blue, pink', '146.7 x 71.5 x 7.65 mm', 'D:\\frontend-backend working\\software_backend\\server\\uploads\\iphone_13.jpg', 'smartphones'),
(74, 'iPhone 13 Pro Max', 127900.00, 127900.00, 512, 8, '6.68\" OLED display', '2778×1284 pixels', '120Hz', 'Dual: 12MP + 12MP', 'Apple A15 Bionic', '4352mAh', 'iOS 15', 'Face ID', 'IP68', 'yes', 'yes', 'Wi-Fi 802.11, Bluetooth 5.0, NFC', 'graphite, silver, sierra blue, gold', '160.8 x 78.1 x 7.7 mm', 'D:\\frontend-backend working\\software_backend\\server\\uploads\\iphone_13_promax.jpg', 'smartphones'),
(75, 'PIXEL 6', 52000.00, 59000.00, 128, 8, '6.4\" OLED display', '2400 x 1080 pixels', '90Hz', 'Dual: 12MP + 12MP', 'Google Tensor', '4352mAh', 'Android 12', 'In-display fingerpri', 'IP68', 'yes', 'yes', '5G, Wi-Fi 6, Bluetooth 5.2, NFC', 'Sorta Seafoam, Sorta Sunny, Sorta Stormy', '158.6 x 74.8 x 8.9 mm', 'D:\\frontend-backend working\\software_backend\\server\\uploads\\PIXEL6.jpg', 'smartphones'),
(76, 'Acer Aspire 5', 52000.00, 59000.00, 512, 16, '15.6-inch Full HD IPS display', '1920 x 1080 pixels', '60Hz', 'HD webcam', 'Intel Core i5-1135G7', 'Up to 8 hours', 'Windows 10 Home', 'fingerprint reader', NULL, 'no', 'no', 'Wi-Fi 6, Bluetooth 5.0, USB 3.1, HDMI, Ethernet', 'Silver', '14.3 x 9.9 x 0.7 inches', 'D:\\frontend-backend working\\software_backend\\server\\uploads\\ACER_ASPIRE.jpeg', 'laptops'),
(77, 'Google Pixel Watch', 21900.00, 25400.00, NULL, NULL, 'Circular AMOLED display', '416 x 416 pixels', '60Hz', NULL, 'Google\'s custom chipset for wearables', 'Up to 36 hours (estimated)', 'Wear OS by Google', 'Heart rate sensor, p', 'Up to 5 AT', 'Yes', 'Yes', 'Bluetooth 5.0, Wi-Fi 802.11 b/g/n, NFC', 'Black, Silver, Green, Rose Gold', '42mm, Thickness: 11mm', 'D:\\frontend-backend working\\software_backend\\server\\Google_Pixel_Watch.jpeg', 'accessories'),
(78, 'Acer Predator Helios 300', 97499.25, 112499.25, 0, 512, '15.6-inch Full HD IPS display', '1920 x 1080 pixels', '144Hz', 'HD webcam', 'Intel Core i7-10750H', 'Up to 6 hours', 'Windows 10 Home', 'fingerprint reader', NULL, 'no', 'no', 'Wi-Fi 6, Bluetooth 5.0, USB 3.1, HDMI, Ethernet', 'Abyssal Black', '14.3 x 9.9 x 0.7 inches', 'D:\\frontend-backend working\\software_backend\\server\\uploads\\Acer_predator.jpeg', 'laptops'),
(79, 'Dell Inspiron 15 5000 Series', 64999.00, 74999.00, 512, 8, '15.6\" Full HD LED-backlit Touch Display', '1920 x 1080 pixels', '60Hz', 'Integrated HD webcam', '11th Gen Intel Core i5-1135G7', 'Up to 8 hours', 'Windows 11 Home', 'fingerprint reader', NULL, 'no', 'no', 'Wi-Fi 6, Bluetooth 5.2', 'Platinum silver', '14.3 x 9.9 x 0.7 inches', 'D:\\frontend-backend working\\software_backend\\server\\uploads\\Dell_inspiron.jpeg', 'laptops'),
(80, 'Dell Alienware M15 R6', 179999.00, 199999.00, 1024, 32, '15.6\" QHD (2560 x 1440) 240Hz refresh rate', '2560 x 1440 pixels', '240Hz', 'Alienware HD webcam with dual-array microphones', '11th Gen Intel Core i9-11900H', 'Up to 6 hours', 'Windows 11 Pro', 'fingerprint reader', NULL, 'no', 'no', 'Killer Wi-Fi 6E AX1675 (2x2) 802.11ax Wireless, Bluetooth 5.2', 'Lunar Light,Dark Side of the Moon', '14.3 x 9.9 x 0.7 inches', 'D:\\frontend-backend working\\software_backend\\server\\uploads\\Dell_alienware.jpg', 'laptops'),
(81, 'Apple Watch Series 9', 39900.00, 41900.00, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Up to 18 hours', NULL, NULL, NULL, 'Yes', 'no', 'GPS, Bluetooth 5.0, Wi-Fi', 'Midnight, Starlight, Silver, Pink', NULL, 'D:\\frontend-backend working\\software_backend\\server\\uploads\\apple_watch9.jpeg', 'Smartwatch'),
(82, 'Sony WH-1000XM5 Wireless Active Noise Cancelling H', 31990.00, 34990.00, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '40 hours without noise cancellation, 30 hours with', NULL, NULL, NULL, 'no', 'no', 'Bluetooth', 'Black', NULL, 'D:\\frontend-backend working\\software_backend\\server\\uploads\\sony_headphones.jpg', 'Accessories'),
(83, 'Marshall Willen Portable Bluetooth 20 Watts Speake', 9999.00, 14990.00, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Up to 20 hours of playtime', NULL, NULL, NULL, 'no', 'no', 'Bluetooth 5.0, Aux input', 'Cream', NULL, 'D:\\frontend-backend working\\software_backend\\server\\uploads\\Marshall.jpg', 'Accessories'),
(84, 'samsung', 12300.00, 12123.00, 256, 8, '21', '67', '789', 'hnj', 'cdvf', 'xc', 'fvbg', 'dsf', 'scdv', 'cdv', 'csd', 'cxdv', 'cxv', 'cdv', 'D:\\frontend-backend working\\software_backend\\server\\uploads\\1714628757565-price_trend.png', 'smartphones');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `dob` date DEFAULT NULL,
  `gender` varchar(10) DEFAULT NULL,
  `pincode` varchar(10) DEFAULT NULL,
  `country` varchar(255) DEFAULT NULL,
  `state` varchar(255) DEFAULT NULL,
  `district` varchar(255) DEFAULT NULL,
  `address` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `email`, `name`, `phone`, `dob`, `gender`, `pincode`, `country`, `state`, `district`, `address`) VALUES
(1, '12leo@gmail.com', 'fvgf', '0987654321', '2024-04-10', 'Male', '624001', 'India', 'Tamil Nadu', 'Dindigul', 'cs'),
(2, 'leorobim@gmail.com', 'dgfh', '1234567890', '2024-04-04', 'Male', '631501', 'India', 'Tamil Nadu', 'Kanchipuram', 'redf'),
(4, 'leo123@gmail.com', 'fvdc', '0987654321', '2024-04-09', 'Male', '624001', 'India', 'Tamil Nadu', 'Dindigul', ' vc'),
(5, 'leonal2003@gmail.com', 'vfcd', '8248731433', '2024-05-23', 'Male', '624001', 'India', 'Tamil Nadu', 'Dindigul', 'fcdr'),
(6, 'leo45@gmail.com', 'frde', '0987654321', '2024-05-23', 'Male', '624001', 'India', 'Tamil Nadu', 'Dindigul', 'fcd');

-- --------------------------------------------------------

--
-- Table structure for table `wishlist`
--

CREATE TABLE `wishlist` (
  `id` int(11) NOT NULL,
  `pdt_name` varchar(255) NOT NULL,
  `current_price` decimal(10,2) NOT NULL,
  `initial_price` decimal(10,2) NOT NULL,
  `storage_capacity` int(11) NOT NULL,
  `ram` int(11) NOT NULL,
  `camera_setup` varchar(255) NOT NULL,
  `smartphone_id` int(11) DEFAULT NULL,
  `image_path` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `wishlist`
--

INSERT INTO `wishlist` (`id`, `pdt_name`, `current_price`, `initial_price`, `storage_capacity`, `ram`, `camera_setup`, `smartphone_id`, `image_path`) VALUES
(27, 'Acer Predator Helios 300', 97499.25, 112499.25, 0, 512, 'HD webcam', NULL, 'D:\\frontend-backend working\\software_backend\\server\\uploads\\Acer_predator.jpeg'),
(28, 'Acer Predator Helios 300', 97499.25, 112499.25, 0, 512, 'HD webcam', NULL, 'D:\\frontend-backend working\\software_backend\\server\\uploads\\Acer_predator.jpeg'),
(29, 'iPhone 13', 81900.00, 81900.00, 512, 8, 'Dual: 12MP + 12MP', NULL, 'D:\\frontend-backend working\\software_backend\\server\\uploads\\iphone_13.jpg'),
(30, 'iPhone 13', 81900.00, 81900.00, 512, 8, 'Dual: 12MP + 12MP', NULL, 'D:\\frontend-backend working\\software_backend\\server\\uploads\\iphone_13.jpg'),
(31, 'iPhone 14', 88999.00, 88999.00, 512, 8, 'Dual: 12MP + 12MP', NULL, 'D:\\frontend-backend working\\software_backend\\server\\uploads\\iphone_14.jpg'),
(32, 'iPhone 14', 88999.00, 88999.00, 512, 8, 'Dual: 12MP + 12MP', NULL, 'D:\\frontend-backend working\\software_backend\\server\\uploads\\iphone_14.jpg'),
(33, 'iPhone 13 Pro Max', 127900.00, 127900.00, 512, 8, 'Dual: 12MP + 12MP', NULL, 'D:\\frontend-backend working\\software_backend\\server\\uploads\\iphone_13_promax.jpg'),
(34, 'iPhone 13 Pro Max', 127900.00, 127900.00, 512, 8, 'Dual: 12MP + 12MP', NULL, 'D:\\frontend-backend working\\software_backend\\server\\uploads\\iphone_13_promax.jpg');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `blog_posts`
--
ALTER TABLE `blog_posts`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `insert_img`
--
ALTER TABLE `insert_img`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `passwords`
--
ALTER TABLE `passwords`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `predictions`
--
ALTER TABLE `predictions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `smartphone_id` (`smartphone_id`);

--
-- Indexes for table `questions`
--
ALTER TABLE `questions`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `smartphones`
--
ALTER TABLE `smartphones`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `wishlist`
--
ALTER TABLE `wishlist`
  ADD PRIMARY KEY (`id`),
  ADD KEY `smartphone_id` (`smartphone_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `blog_posts`
--
ALTER TABLE `blog_posts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `insert_img`
--
ALTER TABLE `insert_img`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `passwords`
--
ALTER TABLE `passwords`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `predictions`
--
ALTER TABLE `predictions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT for table `questions`
--
ALTER TABLE `questions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `smartphones`
--
ALTER TABLE `smartphones`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=85;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `wishlist`
--
ALTER TABLE `wishlist`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `predictions`
--
ALTER TABLE `predictions`
  ADD CONSTRAINT `predictions_ibfk_1` FOREIGN KEY (`smartphone_id`) REFERENCES `smartphones` (`id`);

--
-- Constraints for table `wishlist`
--
ALTER TABLE `wishlist`
  ADD CONSTRAINT `wishlist_ibfk_1` FOREIGN KEY (`smartphone_id`) REFERENCES `smartphones` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
