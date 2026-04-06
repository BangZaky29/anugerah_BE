-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 06 Apr 2026 pada 05.48
-- Versi server: 10.4.32-MariaDB
-- Versi PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `asb_portfolio`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `brands`
--

CREATE TABLE `brands` (
  `id` int(11) NOT NULL,
  `category_id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `description` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `external_link` varchar(500) DEFAULT NULL,
  `type` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `brands`
--

INSERT INTO `brands` (`id`, `category_id`, `name`, `description`, `created_at`, `external_link`, `type`) VALUES
(1, 1, 'DN SOLUTIONS', 'Modern manufacturing solutions.', '2026-04-04 08:28:15', 'https://www.dn-solutions.com/main.do', 'Mesin'),
(2, 1, 'MAKINO', 'Extreme precision engineering.', '2026-04-04 08:28:15', 'https://www.makino.com/', 'Mesin'),
(3, 1, 'HNK', 'Specialized heavy-duty machines.', '2026-04-04 08:28:15', 'http://en.hnkkorea.com/sub01/03_01.php', 'Mesin'),
(4, 1, 'KERTZ', 'High-end industrial machinery.', '2026-04-04 08:28:15', NULL, 'Mesin'),
(5, 1, 'TONE FAN', 'Manufacturing drilling specialists.', '2026-04-04 08:28:15', NULL, 'Mesin'),
(6, 1, 'MAZAK', 'Global leader in advanced CNC machine tools.', '2026-04-04 08:28:15', 'https://www.mazak.com/id-en/', 'Mesin'),
(7, 1, 'BROTHER', 'Compact, high-productivity CNC machining.', '2026-04-04 08:28:15', 'https://machinetool.global.brother/en-eu', 'Mesin'),
(8, 1, 'WELE', 'Large-scale, heavy-duty CNC machinery.', '2026-04-04 08:28:15', 'http://www.welegroup.com/en/', 'Mesin'),
(9, 1, 'SODICK', 'Pioneer in precision Electrical Discharge Machining.', '2026-04-04 08:28:15', 'https://sodick.com/?utm_source=google&utm_campaign=%7Bcampaignname%7D&utm_medium=d&utm_content=194866989059&utm_term&gad_source=5&gad_campaignid=23162563870&gclid=EAIaIQobChMI7bua34jIkwMViXpvBB02ATBhEAEYASAAEgJltfD_BwE', 'Electrical'),
(10, 1, 'HYPERTHERM', 'World leader in industrial cutting solutions.', '2026-04-04 08:28:15', 'https://www.hypertherm.com/', 'Mechanical'),
(11, 2, 'TOPTUL', 'Chrome Vanadium professional tools.', '2026-04-04 08:28:15', 'https://www.toptul.com/en', 'Tools'),
(12, 2, 'ELORA', 'High-end German manufacturing quality.', '2026-04-04 08:28:15', 'https://www.elora.de/en/', 'Tools'),
(13, 2, 'TEKIRO', 'Leading industrial tool brand.', '2026-04-04 08:28:15', 'https://tekiro.com/', 'Tools'),
(14, 2, 'MAKITA', 'Global leader in power tools.', '2026-04-04 08:28:15', 'https://makitatools.com/', 'Tools'),
(15, 2, 'BOSCH REXROTH', 'Reliable German engineering.', '2026-04-04 08:28:15', 'https://www.boschrexroth.com/en/id/', 'Tools'),
(16, 2, 'HYTORC', 'The world primary bolting solution.', '2026-04-04 08:28:16', 'https://www.hytorc.com/id/', 'Tools'),
(17, 3, 'CATERPILLAR', 'Construction and mining giants.', '2026-04-04 08:28:16', NULL, 'Mesin'),
(18, 3, 'KOMATSU', 'High-performance heavy equipment.', '2026-04-04 08:28:16', NULL, 'Mesin'),
(19, 3, 'CUMMINS', 'Advanced power solutions.', '2026-04-04 08:28:16', NULL, 'Mesin'),
(20, 3, 'LINCOLN', 'Industrial maintenance experts.', '2026-04-04 08:28:16', NULL, 'Tools');

-- --------------------------------------------------------

--
-- Struktur dari tabel `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `description` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `categories`
--

INSERT INTO `categories` (`id`, `name`, `description`, `created_at`) VALUES
(1, 'Machine Products', 'Advanced CNC and manufacturing machinery for precision production.', '2026-04-04 08:28:15'),
(2, 'Tools Products', 'Precision engineering and heavy-duty durability for industrial applications.', '2026-04-04 08:28:15'),
(3, 'Product Support', 'Heavy machinery and core equipment for large-scale operations.', '2026-04-04 08:28:15');

-- --------------------------------------------------------

--
-- Struktur dari tabel `photos`
--

CREATE TABLE `photos` (
  `id` int(11) NOT NULL,
  `brand_id` int(11) DEFAULT NULL,
  `category_id` int(11) DEFAULT NULL,
  `filename` varchar(255) NOT NULL,
  `filepath` varchar(500) NOT NULL,
  `url` varchar(500) NOT NULL,
  `mimetype` varchar(100) DEFAULT 'image/jpeg',
  `size` int(11) DEFAULT 0,
  `uploaded_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `photos`
--

INSERT INTO `photos` (`id`, `brand_id`, `category_id`, `filename`, `filepath`, `url`, `mimetype`, `size`, `uploaded_at`) VALUES
(1, 7, 1, 'BROTHER.png', 'assets/machine-products/BROTHER.png', 'http://localhost:5000/assets/machine-products/BROTHER.png', 'image/png', 31215, '2026-04-04 08:50:15'),
(2, 1, 1, 'DN SOLUTIONS.png', 'assets/machine-products/DN SOLUTIONS.png', 'http://localhost:5000/assets/machine-products/DN SOLUTIONS.png', 'image/png', 43928, '2026-04-04 08:50:15'),
(3, 3, 1, 'HNK.png', 'assets/machine-products/HNK.png', 'http://localhost:5000/assets/machine-products/HNK.png', 'image/png', 3023052, '2026-04-04 08:50:15'),
(4, 10, 1, 'HYPERTHERM.png', 'assets/machine-products/HYPERTHERM.png', 'http://localhost:5000/assets/machine-products/HYPERTHERM.png', 'image/png', 11958, '2026-04-04 08:50:15'),
(5, 6, 1, 'MAZAK.png', 'assets/machine-products/MAZAK.png', 'http://localhost:5000/assets/machine-products/MAZAK.png', 'image/png', 21459, '2026-04-04 08:50:15'),
(6, 9, 1, 'SODICK.png', 'assets/machine-products/SODICK.png', 'http://localhost:5000/assets/machine-products/SODICK.png', 'image/png', 47350, '2026-04-04 08:50:15'),
(7, 8, 1, 'WELE.png', 'assets/machine-products/WELE.png', 'http://localhost:5000/assets/machine-products/WELE.png', 'image/png', 1300823, '2026-04-04 08:50:15'),
(8, 12, 2, 'ELORA.png', 'assets/tools-products/ELORA.png', 'http://localhost:5000/assets/tools-products/ELORA.png', 'image/png', 1495670, '2026-04-04 08:50:15'),
(9, 16, 2, 'HYTORC.png', 'assets/tools-products/HYTORC.png', 'http://localhost:5000/assets/tools-products/HYTORC.png', 'image/png', 235761, '2026-04-04 08:50:15'),
(10, 14, 2, 'MAKITA.png', 'assets/tools-products/MAKITA.png', 'http://localhost:5000/assets/tools-products/MAKITA.png', 'image/png', 243578, '2026-04-04 08:50:15'),
(11, 15, 2, 'REXROTH.png', 'assets/tools-products/REXROTH.png', 'http://localhost:5000/assets/tools-products/REXROTH.png', 'image/png', 315426, '2026-04-04 08:50:15'),
(12, 13, 2, 'TEKIRO.png', 'assets/tools-products/TEKIRO.png', 'http://localhost:5000/assets/tools-products/TEKIRO.png', 'image/png', 448544, '2026-04-04 08:50:15'),
(13, 11, 2, 'toptul.png', 'assets/tools-products/toptul.png', 'http://localhost:5000/assets/tools-products/toptul.png', 'image/png', 12442, '2026-04-04 08:50:15'),
(14, 2, 1, 'MAKINO.png', 'assets/machine-products/MAKINO.png', 'http://localhost:5000/assets/machine-products/MAKINO.png', 'image/png', 122708, '2026-04-06 03:43:32');

-- --------------------------------------------------------

--
-- Struktur dari tabel `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `brand_id` int(11) NOT NULL,
  `name` varchar(200) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `products`
--

INSERT INTO `products` (`id`, `brand_id`, `name`, `created_at`) VALUES
(1, 1, 'CNC Milling', '2026-04-04 08:28:16'),
(2, 1, 'Lathe Machines', '2026-04-04 08:28:16'),
(3, 2, 'Horizontal Milling', '2026-04-04 08:28:16'),
(4, 2, 'EDM Machines', '2026-04-04 08:28:16'),
(5, 3, 'Vertical Lathes', '2026-04-04 08:28:16'),
(6, 3, 'Boring Machines', '2026-04-04 08:28:16'),
(7, 4, 'Precision Cutting', '2026-04-04 08:28:16'),
(8, 4, 'Milling', '2026-04-04 08:28:16'),
(9, 5, 'Radial Drilling', '2026-04-04 08:28:16'),
(10, 5, 'Industrial Drills', '2026-04-04 08:28:16'),
(11, 6, 'Multi-tasking CNC', '2026-04-04 08:28:16'),
(12, 6, '5-Axis Machining', '2026-04-04 08:28:16'),
(13, 6, 'Turning Centers', '2026-04-04 08:28:16'),
(14, 7, 'SPEEDIO Tapping Centers', '2026-04-04 08:28:16'),
(15, 7, 'High-Speed CNC', '2026-04-04 08:28:16'),
(16, 8, 'Bridge/Double-Column Machining', '2026-04-04 08:28:16'),
(17, 8, 'Boring Machines', '2026-04-04 08:28:16'),
(18, 9, 'Wire & Sinker EDM', '2026-04-04 08:28:16'),
(19, 9, 'High-Speed Milling', '2026-04-04 08:28:16'),
(20, 9, 'Metal 3D Printing', '2026-04-04 08:28:16'),
(21, 10, 'Plasma Cutting Systems', '2026-04-04 08:28:16'),
(22, 10, 'CNC Motion Control', '2026-04-04 08:28:16'),
(23, 11, 'Wrench Set', '2026-04-04 08:28:16'),
(24, 11, 'Socket Set', '2026-04-04 08:28:16'),
(25, 11, 'Torque Tools', '2026-04-04 08:28:16'),
(26, 12, 'Spanners', '2026-04-04 08:28:16'),
(27, 12, 'Pliers', '2026-04-04 08:28:16'),
(28, 12, 'Workshops', '2026-04-04 08:28:16'),
(29, 13, 'Hand Tools', '2026-04-04 08:28:16'),
(30, 13, 'Automotive Tools', '2026-04-04 08:28:16'),
(31, 14, 'Cordless Drill', '2026-04-04 08:28:16'),
(32, 14, 'Grinder', '2026-04-04 08:28:16'),
(33, 14, 'Circular Saw', '2026-04-04 08:28:16'),
(34, 15, 'Power Tools', '2026-04-04 08:28:16'),
(35, 15, 'Measuring Tools', '2026-04-04 08:28:16'),
(36, 16, 'Hydraulic Torque Wrench', '2026-04-04 08:28:16'),
(37, 16, 'Bolt Tensioners', '2026-04-04 08:28:16'),
(38, 17, 'Excavators', '2026-04-04 08:28:16'),
(39, 17, 'Dump Trucks', '2026-04-04 08:28:16'),
(40, 17, 'Bulldozers', '2026-04-04 08:28:16'),
(41, 18, 'Excavators', '2026-04-04 08:28:16'),
(42, 18, 'Wheel Loaders', '2026-04-04 08:28:16'),
(43, 19, 'Diesel Engines', '2026-04-04 08:28:16'),
(44, 19, 'Power Generators', '2026-04-04 08:28:16'),
(45, 20, 'Auto Lubrication', '2026-04-04 08:28:16'),
(46, 20, 'Welding Gear', '2026-04-04 08:28:16');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `brands`
--
ALTER TABLE `brands`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_brands_category` (`category_id`);

--
-- Indeks untuk tabel `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uq_category_name` (`name`);

--
-- Indeks untuk tabel `photos`
--
ALTER TABLE `photos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_photos_brand` (`brand_id`),
  ADD KEY `idx_photos_category` (`category_id`);

--
-- Indeks untuk tabel `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_products_brand` (`brand_id`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `brands`
--
ALTER TABLE `brands`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT untuk tabel `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT untuk tabel `photos`
--
ALTER TABLE `photos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT untuk tabel `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=47;

--
-- Ketidakleluasaan untuk tabel pelimpahan (Dumped Tables)
--

--
-- Ketidakleluasaan untuk tabel `brands`
--
ALTER TABLE `brands`
  ADD CONSTRAINT `fk_brand_category` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `photos`
--
ALTER TABLE `photos`
  ADD CONSTRAINT `fk_photo_brand` FOREIGN KEY (`brand_id`) REFERENCES `brands` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_photo_category` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `fk_product_brand` FOREIGN KEY (`brand_id`) REFERENCES `brands` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
