<?php
  session_start();
  require_once('dao/user.php');

  if (empty($_POST['nickname'])) {
    header('Location: index.php?errCode=1');
    die('資料不齊全');
  }

  $username = $_SESSION['username'];
  $nickname = $_POST['nickname'];
  updateUser($nickname, $username);
  header("Location: index.php");
?>