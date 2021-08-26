<?php
  session_start();
  require_once('dao/comments.php');
  require_once('dao/user.php');

  if (empty($_POST['content'])) {
    header('Location: update_comment.php?errCode=1&id=' . $_POST['id']);
    die('資料不齊全˙');
  }
  
  $id = $_POST['id'];
  $content = $_POST['content'];
  $user = getUserByUsername($_SESSION['username']);

  updateComment($id, $content, $user);
  header('Location: index.php');
?>