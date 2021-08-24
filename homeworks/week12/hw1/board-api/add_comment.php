<?php
  require_once('dao/comments.php');
  header('Content-type:application/json;charset=utf-8');
  header('Access-Control-Allow-Origin: *');

  if (empty($_POST['nickname']) || empty($_POST['content']) || empty($_POST['site_key'])) {
    $json = array(
        "ok" => "false",
        "message" => "Please input missing fields",
    );

    $response = json_encode($json);
    echo $response;
    die();
  }

  $nickname = $_POST['nickname'];
  $content = $_POST['content'];
  $site_key = $_POST['site_key'];

  $bool = addComment($site_key, $nickname, $content);

  $json = array(
      "ok" => $bool,
      "message" => $bool ? "success" : "add fail"
  );
  $response = json_encode($json);
  echo $response;

?>