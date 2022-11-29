-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 29 Nov 2022 pada 08.41
-- Versi server: 10.4.24-MariaDB
-- Versi PHP: 7.4.29

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `library`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `books`
--

CREATE TABLE `books` (
  `code_book` varchar(5) NOT NULL,
  `title` varchar(50) NOT NULL,
  `author` varchar(11) NOT NULL,
  `stock` int(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `books`
--

INSERT INTO `books` (`code_book`, `title`, `author`, `stock`) VALUES
('HOB-8', 'The Hobbit, or There and Back Again', 'J.R.R Tolki', 1),
('JK-45', 'Harry Potter', 'J.K Rowling', 1),
('NRN-7', 'The Lion, the Witch and the Wardrobe', 'C.S Lewis', 1),
('SHR-1', 'A Study in Scarlet', 'Arthur Cona', 1),
('TW-11', 'Twilight', 'Stephenie M', 1);

-- --------------------------------------------------------

--
-- Struktur dari tabel `detail_bookings`
--

CREATE TABLE `detail_bookings` (
  `code_detail_bookings` varchar(50) NOT NULL,
  `code_booking` varchar(50) NOT NULL,
  `code_book` varchar(10) NOT NULL,
  `book_name` varchar(50) NOT NULL,
  `code_member` varchar(10) NOT NULL,
  `qty` int(10) NOT NULL,
  `end_date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Struktur dari tabel `members`
--

CREATE TABLE `members` (
  `code_member` varchar(10) NOT NULL,
  `name` varchar(50) NOT NULL,
  `valid` tinyint(1) NOT NULL,
  `end_penalty` date DEFAULT NULL,
  `code_booking` varchar(10) DEFAULT NULL,
  `total_booking` int(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `members`
--

INSERT INTO `members` (`code_member`, `name`, `valid`, `end_penalty`, `code_booking`, `total_booking`) VALUES
('M001', 'Angga', 1, '0000-00-00', 'B0M001', 0),
('M002', 'Ferry', 1, '0000-00-00', 'B0M002', 0),
('M003', 'Putri', 1, '0000-00-00', 'B0M003', 0);

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `books`
--
ALTER TABLE `books`
  ADD PRIMARY KEY (`code_book`);

--
-- Indeks untuk tabel `detail_bookings`
--
ALTER TABLE `detail_bookings`
  ADD PRIMARY KEY (`code_detail_bookings`);

--
-- Indeks untuk tabel `members`
--
ALTER TABLE `members`
  ADD PRIMARY KEY (`code_member`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
