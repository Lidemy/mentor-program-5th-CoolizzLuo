<?php
  session_start();
  require_once('dao/user.php');

  
  $role = $_POST['role'];
  $id = $_POST['id'];

  updateRoleById($role, $id);
  header('Location: admin.php');
?>