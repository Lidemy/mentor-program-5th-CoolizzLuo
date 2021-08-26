<?php
  session_start();
  require_once('dao/comments.php');
  require_once('dao/user.php');

  if (empty($_POST['content'])) {
    header('Location: index.php?errCode=1');
    die('資料不齊全˙');
  }

  if (!empty($_SESSION['username'])) {
		$user = getUserByUsername($_SESSION['username']);
    if ($user['role'] === 'BANNED') {
      header('Location: index.php');
      die('無法新增');
    }
	}
  
  $username = $_SESSION['username'];
  $content = $_POST['content'];

  addComment($username, $content) ? header('Location: index.php') : die($conn->error);
?>