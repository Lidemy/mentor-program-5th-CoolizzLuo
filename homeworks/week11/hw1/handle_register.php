<?php
  session_start();
  require_once('dao/user.php');

  if (empty($_POST['nickname']) || empty($_POST['username']) || empty($_POST['password'])) {
    header('Location: register.php?errCode=1');
    die('資料不齊全˙');
  }

  // $password = password_hash($_POST['password'], PASSWORD_DEFAULT);
  if (addUser($_POST['nickname'], $_POST['username'], $_POST['password'])) {
    $_SESSION['username'] = $_POST['username'];
    header('Location: index.php');
  } else {
    header('Location: register.php?errCode=2');
  }
?>