-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 17, 2021 at 08:21 PM
-- Server version: 10.4.17-MariaDB
-- PHP Version: 8.0.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `vacationsequelize`
--

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `mail` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `isAdmin` int(11) NOT NULL DEFAULT 0,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `mail`, `password`, `isAdmin`, `createdAt`, `updatedAt`) VALUES
(1, 'yoshi Yosh', 'yoshi@gmail.com', '111', 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(2, 'Maya', 'maya@gmail.com', '222', 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(3, 'Ellie', 'ellie@gmail.com', '333', 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `vacations`
--

CREATE TABLE `vacations` (
  `id` int(11) NOT NULL,
  `destination` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `img` varchar(255) DEFAULT NULL,
  `initialDate` datetime DEFAULT NULL,
  `finalDate` datetime DEFAULT NULL,
  `price` int(250) NOT NULL DEFAULT 0,
  `followers` int(250) NOT NULL DEFAULT 0,
  `isDeleted` int(11) NOT NULL DEFAULT 0,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `vacations`
--

INSERT INTO `vacations` (`id`, `destination`, `description`, `img`, `initialDate`, `finalDate`, `price`, `followers`, `isDeleted`, `createdAt`, `updatedAt`) VALUES
(1, 'Bangkok, Thailand', 'Family Trip', NULL, '2021-05-15 00:00:00', '2021-06-15 00:00:00', 0, 0, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(2, 'Rome, Italy', 'Family Trip', NULL, '2021-05-15 00:00:00', '2021-06-15 00:00:00', 0, 0, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(3, 'Athens, Greece', 'Family Trip', NULL, '2021-05-15 00:00:00', '2021-06-15 00:00:00', 0, 0, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(4, 'Zurich, Switzerland ', 'Family Trip', NULL, '2021-05-15 00:00:00', '2021-06-15 00:00:00', 0, 0, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(5, 'Amsterdam, Netherlands', 'Family Trip', NULL, '2021-05-15 00:00:00', '2021-06-15 00:00:00', 0, 0, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(6, 'Oslo, Norway', 'Family Trip', NULL, '2021-05-15 00:00:00', '2021-06-15 00:00:00', 0, 0, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(7, 'Tokyo, Japan', 'Family Trip', NULL, '2021-05-15 00:00:00', '2021-06-15 00:00:00', 0, 0, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `mail` (`mail`);

--
-- Indexes for table `vacations`
--
ALTER TABLE `vacations`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `vacations`
--
ALTER TABLE `vacations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
