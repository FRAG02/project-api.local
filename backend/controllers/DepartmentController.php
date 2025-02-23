<?php

include_once __DIR__ . '/../config/db.php';

class DepartmentController
{
    private $pdo;

    public function __construct()
    {
        global $pdo;
        $this->pdo = $pdo;
    }

    public function getDepartments()
    {
        $stmt = $this->pdo->query('SELECT Подразделения.*, МОЛ.фио_мол FROM Подразделения INNER JOIN МОЛ ON Подразделения.мол_id = МОЛ.id');
        return $stmt->fetchAll();
    }

    public function getByIdDepartments($id)
    {
        try {
            $sql = "
            SELECT 
                `Подразделения`.*, 
                `МОЛ`.`фио_мол`
            FROM 
                `Подразделения`
            INNER JOIN 
                `МОЛ` ON `Подразделения`.`мол_id` = `МОЛ`.`id`
            WHERE 
                `Подразделения`.`id` = :id
        ";
            $stmt = $this->pdo->prepare($sql);
            $stmt->execute(['id' => $id]);
            return $stmt->fetchAll();
        } catch (PDOException $e) {
            error_log("Error in getByIdDepartments: " . $e->getMessage()); // Логируем ошибку
            return ['error' => 'Ошибка при выполнении запроса'];
        }
    }

    public function removeDepartments($id)
    {
        $stmt = $this->pdo->prepare("DELETE FROM Подразделения WHERE id = ?");
        $stmt->execute([$id]);
        return ['message' => 'Подразделение удалено', 'success' => true];
    }

    public function createUpdateDepartment($data, $id)
    {
        try {
            // Подготовка данных для SQL-запроса
            $params = [
                'name' => $data['название_подразделения'],
                'block' => $data['блок'],
                'building' => $data['корпус'],
                'floor' => $data['этаж'],
                'room_number' => $data['номер_кабинета'],
                'room_name' => $data['название_кабинета'],
                'mol_id' => $data['мол_id']
            ];

            if ($id) {
                // Обновляем существующее подразделение
                $sql = "
                UPDATE `Подразделения`
                SET 
                    `название_подразделения` = :name,
                    `блок` = :block,
                    `корпус` = :building,
                    `этаж` = :floor,
                    `номер_кабинета` = :room_number,
                    `название_кабинета` = :room_name,
                    `мол_id` = :mol_id
                WHERE 
                    `id` = :id
            ";
                $params['id'] = $data['id'];
                $stmt = $this->pdo->prepare($sql);
                $stmt->execute($params);
                return ['success' => true, 'message' => 'Подразделение успешно обновлено'];
            } else {
                // Добавляем новое подразделение
                $sql = "
                INSERT INTO `Подразделения` (
                    `название_подразделения`,
                    `блок`,
                    `корпус`,
                    `этаж`,
                    `номер_кабинета`,
                    `название_кабинета`,
                    `мол_id`
                ) VALUES (
                    :name,
                    :block,
                    :building,
                    :floor,
                    :room_number,
                    :room_name,
                    :mol_id
                )
            ";
                $stmt = $this->pdo->prepare($sql);
                $stmt->execute($params);
                return ['success' => true, 'message' => 'Подразделение успешно добавлено'];
            }
        } catch (PDOException $e) {
            error_log("Error in createUpdateDepartment: " . $e->getMessage()); // Логируем ошибку
            return ['success' => false, 'message' => 'Ошибка при сохранении подразделения'];
        }
    }
}