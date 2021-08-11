<?php
  require_once('dao/user.php');

  if (empty($_POST['nickname']) || empty($_POST['username']) || empty($_POST['password'])) {
    header('Location: register.php?errCode=1');
    die('資料不齊全˙');
  }

  addUser($_POST['nickname'], $_POST['username'], $_POST['password']) ?
  header('Location: register.php') : 
  header('Location: register.php?errCode=2');
?>