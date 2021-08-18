<?php
  require_once('dao/todos.php');
  header('Content-type:application/json;charset=utf-8');
  header('Access-Control-Allow-Origin: *');


  $todos = getAllTodos();
  $json = array(
    "ok" => true,
    "todos" => $todos,
  );

  $response = json_encode($json);
  echo $response;
?>