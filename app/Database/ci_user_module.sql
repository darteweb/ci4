-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 06, 2022 at 08:59 AM
-- Server version: 10.4.21-MariaDB
-- PHP Version: 7.4.23

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ci_user_module`
--

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `mobile` varchar(255) NOT NULL,
  `user_name` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role_id` int(11) NOT NULL,
  `parent_id` int(11) NOT NULL,
  `country` varchar(255) NOT NULL,
  `region` varchar(255) NOT NULL,
  `otp` varchar(100) DEFAULT NULL,
  `last_login` datetime DEFAULT NULL,
  `status` tinyint(4) NOT NULL,
  `created_by` int(11) NOT NULL,
  `created_on` timestamp NOT NULL DEFAULT current_timestamp(),
  `edited_by` int(11) NOT NULL,
  `edited_on` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp(),
  `flag` tinyint(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `mobile`, `user_name`, `password`, `role_id`, `parent_id`, `country`, `region`, `otp`, `last_login`, `status`, `created_by`, `created_on`, `edited_by`, `edited_on`, `flag`) VALUES
(1, 'Hemendra', 'hemendra@darteweb.in', '8003836264', 'hemendra@darteweb.in', '$2y$10$1fHLe147eHUWFJokZqMEeeoWiOQ2PpNwIVA4Q/.FlyZdHbsPTyzea', 1, 1, 'cambodia', 'India', NULL, '2022-09-06 12:09:31', 0, 1, '2022-08-16 12:16:07', 0, '2022-09-06 05:58:31', 0),
(2, 'Rahul', 'rahul@darteweb.in', '9876543210', 'rahul@darteweb.in', '$2y$10$1fHLe147eHUWFJokZqMEeeoWiOQ2PpNwIVA4Q/.FlyZdHbsPTyzea', 2, 1, 'cambodia', 'XYZ', NULL, '2022-08-18 12:08:22', 0, 1, '2022-08-16 12:16:07', 0, '2022-09-05 05:41:17', 0),
(3, 'Dipak', 'dipak@darteweb.in', '9876543211', 'dipak@darteweb.in', '$2y$10$1fHLe147eHUWFJokZqMEeeoWiOQ2PpNwIVA4Q/.FlyZdHbsPTyzea', 2, 1, 'cambodia', 'XYZ', NULL, '2022-08-19 11:08:14', 0, 1, '2022-08-16 12:16:07', 0, '2022-09-06 04:33:19', 0),
(4, 'Harshit', 'harshit@darteweb.in', '9876543212', 'harshit@darteweb.in', '$2y$10$1fHLe147eHUWFJokZqMEeeoWiOQ2PpNwIVA4Q/.FlyZdHbsPTyzea', 2, 1, 'cambodia', 'XYZ', NULL, NULL, 0, 1, '2022-08-16 12:16:07', 0, '2022-09-06 04:33:22', 0),
(5, 'Kamlesh', 'kamlesh@darteweb.in', '9876543213', 'kamlesh@darteweb.in', '$2y$10$1fHLe147eHUWFJokZqMEeeoWiOQ2PpNwIVA4Q/.FlyZdHbsPTyzea', 2, 4, 'cambodia', 'XYZ', NULL, NULL, 0, 1, '2022-08-16 12:16:07', 0, '2022-09-06 04:33:25', 0),
(6, 'Ramesh', 'ramesh@darteweb.in', '9876543214', 'ramesh@darteweb.in', '$2y$10$1fHLe147eHUWFJokZqMEeeoWiOQ2PpNwIVA4Q/.FlyZdHbsPTyzea', 3, 1, 'cambodia', 'XYZ', NULL, NULL, 0, 1, '2022-08-16 12:16:07', 0, '2022-09-06 04:33:28', 0),
(7, 'Suresh', 'suresh@darteweb.in', '9876543215', 'suresh@darteweb.in', '$2y$10$1fHLe147eHUWFJokZqMEeeoWiOQ2PpNwIVA4Q/.FlyZdHbsPTyzea', 3, 1, 'cambodia', 'XYZ', NULL, NULL, 0, 1, '2022-09-05 05:43:32', 0, '2022-09-06 04:33:30', 0),
(8, 'Karan', 'karan@darteweb.in', '9876543216', 'karan@darteweb.in', '$2y$10$1fHLe147eHUWFJokZqMEeeoWiOQ2PpNwIVA4Q/.FlyZdHbsPTyzea', 3, 1, 'cambodia', 'XYZ', NULL, NULL, 0, 1, '2022-09-05 05:43:32', 0, '2022-09-06 04:33:31', 0),
(9, 'Ram', 'ram@darteweb.in', '9876543217', 'ram@darteweb.in', '$2y$10$1fHLe147eHUWFJokZqMEeeoWiOQ2PpNwIVA4Q/.FlyZdHbsPTyzea', 3, 1, 'cambodia', 'XYZ', NULL, NULL, 0, 1, '2022-09-05 05:43:32', 0, '2022-09-06 04:33:32', 0),
(10, 'Shyam', 'shyam@darteweb.in', '9876543218', 'shyam@darteweb.in', '$2y$10$1fHLe147eHUWFJokZqMEeeoWiOQ2PpNwIVA4Q/.FlyZdHbsPTyzea', 3, 1, 'cambodia', 'XYZ', NULL, NULL, 0, 1, '2022-09-05 05:43:32', 0, '2022-09-06 04:33:33', 0),
(11, 'Veer', 'veer@darteweb.in', '9876543219', 'veer@darteweb.in', '$2y$10$1fHLe147eHUWFJokZqMEeeoWiOQ2PpNwIVA4Q/.FlyZdHbsPTyzea', 3, 1, 'cambodia', 'XYZ', NULL, NULL, 0, 1, '2022-09-05 05:43:32', 0, '2022-09-06 04:33:35', 0),
(12, 'Dheer', 'dheer@darteweb.in', '9876543221', 'dheer@darteweb.in', '$2y$10$1fHLe147eHUWFJokZqMEeeoWiOQ2PpNwIVA4Q/.FlyZdHbsPTyzea', 3, 1, 'cambodia', 'XYZ', NULL, NULL, 0, 1, '2022-09-05 05:43:32', 0, '2022-09-06 04:33:37', 0),
(13, 'Rajkumar', 'rajkumar@darteweb.in', '9876543222', 'rajkumar@darteweb.in', '$2y$10$1fHLe147eHUWFJokZqMEeeoWiOQ2PpNwIVA4Q/.FlyZdHbsPTyzea', 3, 1, 'cambodia', 'XYZ', NULL, '2022-09-05 11:09:34', 0, 1, '2022-09-05 05:43:32', 0, '2022-09-06 04:45:34', 0);

-- --------------------------------------------------------

--
-- Table structure for table `user_roles`
--

CREATE TABLE `user_roles` (
  `id` int(11) NOT NULL,
  `role` varchar(255) NOT NULL,
  `status` tinyint(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user_roles`
--

INSERT INTO `user_roles` (`id`, `role`, `status`) VALUES
(1, 'Admin', 0),
(2, 'Faculty', 0),
(3, 'Student', 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user_roles`
--
ALTER TABLE `user_roles`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `user_roles`
--
ALTER TABLE `user_roles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
