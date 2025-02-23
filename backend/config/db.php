<?php

$host = 'MariaDB-11.2'; // Если в твоем OpenServer так настроено, оставляем
$db_name = 'company';
$username = 'root';
$password = ''; // Убедись, что пароль правильный
$charset = 'utf8mb4';

$dsn = "mysql:host=$host;dbname=$db_name;charset=$charset";
$options = [
    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION, // Включает исключения при ошибках
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC, // Ассоциативный массив
    PDO::ATTR_EMULATE_PREPARES => false, // Отключает эмуляцию запросов
];

try {
    $pdo = new PDO($dsn, $username, $password, $options);
} catch (PDOException $e) {
    die("❌ Ошибка подключения: " . $e->getMessage());
}
