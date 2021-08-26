<?php
  session_start();
  require_once('dao/user.php');

  
  $role = $_POST['role'];
  $id = $_POST['id'];

  if (empty($_SESSION['username'])) {
    header('Location: index.php');
    die();
	}
  updateRoleById($role, $id);
  header('Location: admin.php');
?>