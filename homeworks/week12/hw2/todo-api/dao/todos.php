<?php
  require_once('_conn.php');

  function getAllTodos() {
    global $conn;
    global $tb_name;

    $sql = "SELECT * FROM $tb_name";
    
    $stmt = $conn->prepare($sql);

    $result = $stmt->execute();
    $result = $stmt->get_result();

    $todos = array();

    while($row = $result->fetch_assoc()) {
      array_push($todos, array(
        "id" => $row['id'],
        "todo" => $row['todo'],
        "created_at" => $row['created_at'],
      ));
    }
    return $todos;
  }

  function getTodoById($id) {
    global $conn;
    global $tb_name;

    $sql = "SELECT * FROM $tb_name WHERE id = ?";
    
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('i', $id);

    $result = $stmt->execute();
    $result = $stmt->get_result();
    $row = $result->fetch_assoc();

    return is_null($row) ? NULL : $row['todo'];
  }

  function addTodos($todo) {
    global $conn;
    global $tb_name;
    
    $sql = "INSERT INTO $tb_name(todo) VALUES(?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('s', $todo);

    $result = $stmt->execute();

    return $result ? $conn->insert_id : NULL;
  }

  function updateTodos($todo, $id) {
    global $conn;
    global $tb_name;
    
    $sql = "UPDATE $tb_name SET todo=? WHERE id=?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('si', $todo, $id);

    $result = $stmt->execute();

    return $result ? TRUE : FALSE;
  }
?>