<?php
  require_once('conn.php');

  function getUser($username, $password) {
    global $conn;

    $sql = sprintf(
      'SELECT * FROM users WHERE username="%s" AND password="%s"',
      $username,
      $password
    );
    $result = $conn->query($sql);
    if (!$result) {
      die($conn->error);
    }
    return $result->num_rows ? TRUE : FALSE;
  }

  function getUserByUsername($username) {
    global $conn;
    $sql = sprintf(
      'SELECT * FROM users WHERE username = "%s"',
      $username
    );
    $result = $conn->query($sql);
    $row = $result->fetch_assoc();
    return $row; // username, id, nickname
  }

  function addUser($nickname, $username, $password) {
    global $conn;
    
    $sql = sprintf(
      "INSERT INTO users(nickname, username, password) values('%s', '%s', '%s')",
      $nickname,
      $username,
      $password
    );
    $result = $conn->query($sql);
    if ($conn->errno === 1062) return FALSE;
    return $result ? TRUE : FALSE;
  }

?>