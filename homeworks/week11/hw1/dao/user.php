<?php
  require_once('conn.php');

  function getUserByUsername($username) {
    global $conn;
    $sql = 'SELECT * FROM users WHERE username = ?';
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('s', $username);

    $stmt->execute();
    $result = $stmt->get_result();
    if (!$result) {
      die('Error: ' . $conn->error);
    }
    
    $row = $result->fetch_assoc();
    return $row; // username, id, nickname, role
  }

  function getAllUser() {
    global $conn;

    $stmt = $conn->prepare('SELECT * FROM users');
    $result = $stmt->execute();
    if (!$result) {
      die('Error: ' . $conn->error);
    }

    $result = $stmt->get_result();
    return $result;
  }

  function addUser($nickname, $username, $password) {
    global $conn;
    
    $sql = 'INSERT INTO users(nickname, username, password) values(?, ?, ?)';
    $stmt = $conn->prepare($sql);
    $hash_password = password_hash($password, PASSWORD_DEFAULT);
    $stmt->bind_param('sss', $nickname, $username, $hash_password);
    
    $result = $stmt->execute();
    if ($conn->errno === 1062) return FALSE;
    return $result ? TRUE : FALSE;
  }

  function updateUser($nickname, $username) {
    global $conn;

    $sql = 'UPDATE users SET nickname=? WHERE username=?';
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('ss', $nickname, $username);

    $result = $stmt->execute();
    if (!$result) {
      die($conn->error);
    }
    $result = $stmt->get_result();
  }

  function updateRoleById($role, $id) {
    global $conn;

    $sql = 'UPDATE users SET role=? WHERE id=?';
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('ss', $role, $id);

    $result = $stmt->execute();
    if (!$result) {
      die($conn->error);
    }
    $result = $stmt->get_result();
  }

  function isUser($username, $password) {
    $row = getUserByUsername($username);
    if (!$row) return FALSE;
    return password_verify($password, $row['password']) ? TRUE : FALSE;
  }
?>