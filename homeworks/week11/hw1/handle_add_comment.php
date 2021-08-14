<?php
  session_start();
  require_once('dao/comments.php');

  if (empty($_POST['content'])) {
    header('Location: index.php?errCode=1');
    die('資料不齊全˙');
  }
  
  $username = $_SESSION['username'];
  $content = $_POST['content'];

  addComment($username, $content) ? header('Location: index.php') : die($conn->error);
?>