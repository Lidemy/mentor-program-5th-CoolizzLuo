<?php
  require_once('dao/todos.php');
  header('Content-type:application/json;charset=utf-8');
  header('Access-Control-Allow-Origin: *');

  if (empty($_POST['todo'])) {
    $json = array(
        "ok" => "false",
        "message" => "Please input todo data",
    );

    $response = json_encode($json);
    echo $response;
    die();
  }

  $todo = $_POST['todo'];

  $id = addTodos($todo);

  if (!$id) {
    $json = array(
      "ok" => false,
      "message" => "add fail"
    );
    $response = json_encode($json);
    echo $response;
    die();
  }

  $json = array(
    "ok" => true,
    "message" => "success",
    "id" => $id
  );

  $response = json_encode($json);
  echo $response;

?>