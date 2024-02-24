CREATE TABLE IF NOT EXISTS `users` (
  `id` integer(4) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE IF NOT EXISTS `tasks` (
  `$key` varchar(36) NOT NULL PRIMARY KEY,
  `$deleted` int(1) NOT NULL DEFAULT 0,
  `$updated` bigint(14) NOT NULL DEFAULT 0,
  `$synchronized` bigint(14) NOT NULL DEFAULT 0,
  `title` varchar(255) NOT NULL,
  `done` integer(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;