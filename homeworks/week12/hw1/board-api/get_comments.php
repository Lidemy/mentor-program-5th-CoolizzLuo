<?php
  require_once('dao/comments.php');
  header('Content-type:application/json;charset=utf-8');
  header('Access-Control-Allow-Origin: *');


  if (empty($_GET['site_key'])) {
    $json = array(
        "ok" => false,
        "message" => "Please input site_key",
    );

    $response = json_encode($json);
    echo $response;
    die();
  }
  $page = 1;
  if (!empty($_GET['page'])) {
    $page = intval($_GET['page']);
  }
  $site_key = $_GET['site_key'];

  $comments = getPageComments($site_key, $page);
  $totalPage = getTotalPage($site_key);
  $json = array(
    "ok" => true,
    "discussions" => $comments,
    "currentPage" => $page,
    "totalPage" => $totalPage
  );

  $response = json_encode($json);
  echo $response;
?>