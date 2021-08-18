<?php
  $host = 'localhost';
  $db_user = 'enzo';
  $db_password = '561010';
  $db_name = 'enzo';
  $tb_name = 'todos';

  $conn = new mysqli($host, $db_user, $db_password, $db_name);

  if ($conn->connect_error) {
    die('資料庫連線錯誤:' . $conn->connect_error);
  }
  
  $conn->query('SET NAMES UTF8');
  $conn->query('SET time_zone = "+8:00"');
?>