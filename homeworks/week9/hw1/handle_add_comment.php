<?php
  session_start();
  require_once('dao/comments.php');
  require_once('dao/user.php');
  
  $user = getUserByUsername($_SESSION['username']);
  $nickname = $user['nickname'];
  $content = $_POST['content'];

  if ($nickname || $content ) {
    header('Location: index.php?errCode=1');
  }

  addComment($nickname, $content) ? header('Location: index.php') : die($conn->error);
?>