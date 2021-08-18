<?php
  require_once('dao/todos.php');
  header('Content-type:application/json;charset=utf-8');
  header('Access-Control-Allow-Origin: *');

  if (empty($_GET['id'])) {
    $json = array(
        "ok" => false,
        "message" => "Please input id",
    );

    $response = json_encode($json);
    echo $response;
    die();
  }

  $id = intval($_GET['id']);

  $todo = getTodoById($id);
  $json = array(
    "ok" => !is_null($todo),
    "todo" => $todo,
  );

  $response = json_encode($json);
  echo $response;
?>