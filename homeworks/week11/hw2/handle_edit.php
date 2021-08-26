<?php
  session_start();
  require_once('check_permission.php');
  require_once('dao/article.php');

  $id = $_POST['id'];
  $page = $_POST['page'];

  if (empty($_POST['title']) || empty($_POST['content'])) {
    header('Location: edit.php?id='. $id .'&errCode=1');
    die('資料不齊全˙');
  }
  
  $title = $_POST['title'];
  $content = $_POST['content'];

  updateArticle($title, $content, $id) ? header("Location: " . $page) : die($conn->error);
?>