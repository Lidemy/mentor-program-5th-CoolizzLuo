<?php
  require_once('dao/todos.php');
  header('Content-type:application/json;charset=utf-8');
  header('Access-Control-Allow-Origin: *');

  if (empty($_POST['todo']) || empty($_POST['id'])) {
    $json = array(
        "ok" => "false",
        "message" => "Please input missing fields",
    );

    $response = json_encode($json);
    echo $response;
    die();
  }

  $todo = $_POST['todo'];
  $id = $_POST['id'];

  $bool = updateTodos($todo, $id);

  $json = array(
    "ok" => $bool,
    "message" => $bool ? "update success" : "update fail"
  );

  $response = json_encode($json);
  echo $response;

?>