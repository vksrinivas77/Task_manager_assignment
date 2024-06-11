<?php
header('Content-Type: application/json');
require 'db.php';

$request_method = $_SERVER['REQUEST_METHOD'];

switch ($request_method) {
    case 'GET':
        if (!empty($_GET["id"])) {
            $id = intval($_GET["id"]);
            getTask($id);
        } else {
            getTasks();
        }
        break;
    case 'POST':
        addTask();
        break;
    case 'PUT':
        $id = intval($_GET["id"]);
        updateTask($id);
        break;
    case 'DELETE':
        $id = intval($_GET["id"]);
        deleteTask($id);
        break;
    default:
        header("HTTP/1.0 405 Method Not Allowed");
        break;
}

function getTasks() {
    global $pdo;
    $query = "SELECT * FROM tasks";
    $stmt = $pdo->prepare($query);
    $stmt->execute();
    $tasks = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($tasks);
}

function getTask($id) {
    global $pdo;
    $query = "SELECT * FROM tasks WHERE id = :id";
    $stmt = $pdo->prepare($query);
    $stmt->bindParam(':id', $id);
    $stmt->execute();
    $task = $stmt->fetch(PDO::FETCH_ASSOC);
    echo json_encode($task);
}

function addTask() {
    global $pdo;
    $data = json_decode(file_get_contents('php://input'), true);
    $query = "INSERT INTO tasks (title, description, due_date) VALUES (:title, :description, :due_date)";
    $stmt = $pdo->prepare($query);
    $stmt->bindParam(':title', $data['title']);
    $stmt->bindParam(':description', $data['description']);
    $stmt->bindParam(':due_date', $data['due_date']);
    $stmt->execute();
    echo json_encode(array('message' => 'Task added'));
}

function updateTask($id) {
    global $pdo;
    $data = json_decode(file_get_contents('php://input'), true);
    $query = "UPDATE tasks SET title = :title, description = :description, due_date = :due_date WHERE id = :id";
    $stmt = $pdo->prepare($query);
    $stmt->bindParam(':title', $data['title']);
    $stmt->bindParam(':description', $data['description']);
    $stmt->bindParam(':due_date', $data['due_date']);
    $stmt->bindParam(':id', $id);
    $stmt->execute();
    echo json_encode(array('message' => 'Task updated'));
}


function deleteTask($id) {
    global $pdo;
    $query = "DELETE FROM tasks WHERE id = :id";
    $stmt = $pdo->prepare($query);
    $stmt->bindParam(':id', $id);
    $stmt->execute();
    echo json_encode(array('message' => 'Task deleted'));
}
?>
