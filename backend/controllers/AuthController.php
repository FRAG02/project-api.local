<?php

require_once __DIR__ . '/../config/db.php';



class AuthController
{
    private $pdo;

    public function __construct()
    {
        require_once __DIR__ . '/../config/db.php';
        global $pdo; // Объявляем переменную как глобальную
        $this->pdo = $pdo; // Теперь $pdo доступен внутри класса
    }

    public function login($data)
    {
        $stmt = $this->pdo->prepare("SELECT * FROM Пользователи WHERE username = ?");
        $stmt->execute([$data['username']]);
        $user = $stmt->fetch(PDO::FETCH_ASSOC);
        if ($user && password_verify($data['password'], $user['password'])) {
            unset($user['password']); // Убираем пароль из ответа

            return [
                'success' => true,
                'message' => 'Успешный вход',
                'user' => $user
            ];
        }
        http_response_code(401);
        return ['message' => 'Неверные учетные данные'];
    }

    public function register($data)
    {
        try {
            // Ищем пользователя в базе
            $stmt = $this->pdo->prepare('SELECT id FROM Пользователи WHERE username = ?');
            $stmt->execute([$data['username']]);
            $user = $stmt->fetch();

            if ($user) {
                return ['success' => false, 'message' => 'Пользователь с таким логином уже существует'];
            }

            // Хэшируем пароль
            $hashedPassword = password_hash($data['password'], PASSWORD_BCRYPT);

            // Добавляем пользователя в базу данных
            $stmt = $this->pdo->prepare('INSERT INTO Пользователи (username, password) VALUES (?, ?)');
            $stmt->execute([$data['username'], $hashedPassword]);

            return ['success' => true, 'message' => 'Пользователь успешно зарегистрирован'];
        } catch (Exception $e) {
            error_log("Registration error: " . $e->getMessage()); // Логируем исключение
            return ['success' => false, 'message' => 'Ошибка при регистрации'];
        }

    }
}

