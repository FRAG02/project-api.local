<?php

include_once __DIR__ . '/../config/db.php';

class MOLController
{
    private $pdo;

    public function __construct()
    {
        global $pdo;
        $this->pdo = $pdo;
    }

    public function getMOLs()
    {
        $stmt = $this->pdo->query('SELECT * FROM МОЛ');
        return $stmt->fetchAll();
    }

    public function getByIdMOL($id)
    {
        $sql = "SELECT * FROM МОЛ WHERE id = :id";
        $stmt = $this->pdo->prepare($sql); // Подготавливаем запрос
        $stmt->execute(['id' => $id]); // Передаем параметры
        return $stmt->fetchAll();
    }

    public function removeMOLs($id)
    {
        $stmt = $this->pdo->prepare("DELETE FROM МОЛ WHERE id = ?");
        $stmt->execute([$id]);
        return ['message' => 'МОЛ удален', 'success' => true];
    }

    public function createUpdateMol($data, $id)
    {
        try {
            // Подготовка данных для SQL-запроса
            $params = [
                'full_name' => $data['фио_мол'],
                'position' => $data['должность'],
                'department_name' => $data['название_подразделения']
            ];

            if ($id) {
                // Обновляем существующего МОЛ
                $sql = "
                UPDATE `МОЛ`
                SET 
                    `фио_мол` = :full_name,
                    `должность` = :position,
                    `название_подразделения` = :department_name
                WHERE 
                    `id` = :id
            ";
                $params['id'] = $data['id'];
                $stmt = $this->pdo->prepare($sql);
                $stmt->execute($params);
                return ['success' => true, 'message' => 'МОЛ успешно обновлен'];
            } else {
                // Добавляем нового МОЛ
                $sql = "
                INSERT INTO `МОЛ` (
                    `фио_мол`,
                    `должность`,
                    `название_подразделения`
                ) VALUES (
                    :full_name,
                    :position,
                    :department_name
                )
            ";
                $stmt = $this->pdo->prepare($sql);
                $stmt->execute($params);
                return ['success' => true, 'message' => 'МОЛ успешно добавлен'];
            }
        } catch (PDOException $e) {
            error_log("Error in createUpdateMol: " . $e->getMessage()); // Логируем ошибку
            return ['success' => false, 'message' => 'Ошибка при сохранении МОЛ'];
        }
    }
}