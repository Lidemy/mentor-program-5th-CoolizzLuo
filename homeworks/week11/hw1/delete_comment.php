<?php
  session_start();
  require_once('dao/comments.php');
  require_once('dao/user.php');
  
  $id = $_GET['id'];
  $user = getUserByUsername($_SESSION['username']);

  deleteComment($id, $user);
  header('Location: index.php');
?>