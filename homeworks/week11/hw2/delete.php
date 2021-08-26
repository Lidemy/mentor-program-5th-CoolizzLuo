<?php
  session_start();
  require_once('check_permission.php');
  require_once('dao/article.php');
  
  $id = $_GET['id'];

  deleteArticle($id);
  header('Location: admin.php');
?>