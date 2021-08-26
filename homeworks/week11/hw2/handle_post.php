<?php
  session_start();
  require_once('check_permission.php');
  require_once('dao/article.php');

  if (empty($_POST['content'])) {
    header('Location: admin.php?errCode=1');
    die('資料不齊全˙');
  }
  
  $username = $_SESSION['username'];
  $title = $_POST['title'];
  $content = $_POST['content'];

  addArticle($username, $title, $content) ? header('Location: admin.php') : die($conn->error);
?>