<?php
header("Content-Type: application/json; charset=UTF-8");

require_once __DIR__ . '/config/db.php';
require_once __DIR__ . '/controllers/AuthController.php';
require_once __DIR__ . '/controllers/DepartmentController.php';
require_once __DIR__ . '/controllers/MOLController.php';
require_once __DIR__ . '/controllers/EquipmentController.php';


$requestMethod = $_SERVER['REQUEST_METHOD'];

$requestUri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$requestUri = trim($requestUri, '/');
$requestUriParts = explode('/', $requestUri);

$endpoint = $requestUriParts[0] ?? '';
$sharedID = isset($requestUriParts[1]) ? $requestUriParts[1] : null;

$authController = new AuthController();
$departmentController = new DepartmentController();
$molController = new MOLController();
$equipmentController = new EquipmentController();

switch ($endpoint) {
    case 'login':
        echo json_encode($authController->login(json_decode(file_get_contents('php://input'), true)));
        break;
    case 'register':
        $username = $_POST['username'] ?? '';
        $password = $_POST['password'] ?? '';
        echo json_encode($authController->register(json_decode(file_get_contents('php://input'), true)));
        break;


    case 'mols':
        if ($requestMethod == 'POST') {
            echo json_encode($molController->createUpdateMol(json_decode(file_get_contents('php://input'), true), $sharedID));
            break;
        }
        if ($sharedID) {
            echo json_encode($molController->getByIdMOL($sharedID));
            break;
        } else {
            echo json_encode($molController->getMOLs());
            break;
        }

    case 'departments':
        if ($requestMethod == 'POST') {
            echo json_encode($departmentController->createUpdateDepartment(json_decode(file_get_contents('php://input'), true), $sharedID));
            break;
        }
        if ($sharedID) {
            echo json_encode($departmentController->getByIdDepartments($sharedID));
            break;
        } else {
            echo json_encode($departmentController->getDepartments());
            break;
        }

    case 'equipment':
        if ($requestMethod == 'POST') {
            echo json_encode($equipmentController->createUpdateEquipment(json_decode(file_get_contents('php://input'), true), $sharedID));
            break;
        }
        if ($sharedID) {
            echo json_encode($equipmentController->getByIdEquipment($sharedID));
            break;
        } else {
            echo json_encode($equipmentController->getEquipment());
            break;
        }

    case 'remove-mols':
        echo json_encode($molController->removeMOLs($sharedID));
        break;
    case 'remove-departments':
        echo json_encode($departmentController->removeDepartments($sharedID));
        break;
    case 'remove-equipment':
        echo json_encode($equipmentController->removeEquipment($sharedID));
        break;
    default:
        echo json_encode(['error' => 'Invalid action']);
        break;
}
