<?php
  session_start();
  require_once('dao/user.php');

  if (empty($_POST['username']) || empty($_POST['password'])) {
    header('Location: login.php?errCode=1');
    die('資料不齊全˙');
  }

  if (getUser($_POST['username'], $_POST['password']) ) {
    $_SESSION['username'] = $_POST['username'];
    header('Location: index.php');
  } else {
    header('Location: login.php?errCode=2');
  }
?>