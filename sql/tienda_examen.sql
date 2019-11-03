-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 08-08-2019 a las 20:22:15
-- Versión del servidor: 10.3.16-MariaDB
-- Versión de PHP: 7.3.7

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `tienda_examen`
--
CREATE DATABASE IF NOT EXISTS `tienda_examen` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `tienda_examen`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `marca`
--

DROP TABLE IF EXISTS `marca`;
CREATE TABLE `marca` (
  `idmarca` int(11) NOT NULL,
  `nombre` varchar(80) DEFAULT NULL,
  `foto` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `marca`
--

INSERT INTO `marca` (`idmarca`, `nombre`, `foto`) VALUES
(1, 'henrys', 'henrys.jpg'),
(2, 'babache', 'babache.jpg');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pelota`
--

DROP TABLE IF EXISTS `pelota`;
CREATE TABLE `pelota` (
  `idpelota` int(11) NOT NULL,
  `nombre` varchar(60) DEFAULT NULL,
  `descripcion` varchar(300) DEFAULT NULL,
  `stock` int(11) DEFAULT NULL,
  `marca` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `pelota`
--

INSERT INTO `pelota` (`idpelota`, `nombre`, `descripcion`, `stock`, `marca`) VALUES
(10, 'pelota acero', 'para actuaciones MUY contundentes y especiales', 5, 1),
(12, 'pelota madera', 'para niveles avanzados', 34, 2),
(13, 'pelota plástico', 'para los más pequeños', 21, 1),
(14, 'pelota uranio', 'ideal para actuaciones enérgicas', 4, 2),
(16, 'pelota criptonita', 'para Clark Kent', 10, 1),
(17, 'pelota titanio', 'la irrompible', 1, 1),
(18, 'pelota dodecaedrica', 'para actuaciones al cuadrado', 5, 1),
(19, 'pelota hielo', 'para paises frios exclusivamente', 6, 2),
(23, 'pelota redonda', 'para iniciarse', 2, 1),
(24, 'balon', 'plastico', 11, 2),
(25, 'bolas de fuego', 'cuidado con quemarse', 100, 2),
(26, 'pelota vasca', 'durisima', 200, 1),
(29, 'bola de cristal', 'decorativa', 56, 1),
(30, 'a', 'aaaaaaaaaaaaaaaaaaaaaaaaa', 10, 2),
(32, 'a', 'aaa', 1, 1),
(33, 'b', 'bbb', 2, 2),
(34, 'c', 'ccc', 3, 1),
(35, 'd', 'ddd', 4, 2),
(36, 'e', 'eee', 5, 1),
(37, 'f', 'fff', 6, 2),
(38, 'pelota griego', 'chasco de pelota', 12, 1),
(39, 'pelota galesa', 'una piedra simplemente', 20, 2);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `marca`
--
ALTER TABLE `marca`
  ADD PRIMARY KEY (`idmarca`);

--
-- Indices de la tabla `pelota`
--
ALTER TABLE `pelota`
  ADD PRIMARY KEY (`idpelota`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `marca`
--
ALTER TABLE `marca`
  MODIFY `idmarca` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `pelota`
--
ALTER TABLE `pelota`
  MODIFY `idpelota` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=40;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
