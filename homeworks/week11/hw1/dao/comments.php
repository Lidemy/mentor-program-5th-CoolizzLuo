<?php
  require_once('conn.php');

  function getAllComments($page) {
    global $conn;

    $item_per_page = 5;
    $offset = ($page - 1) * $item_per_page;

    $stmt = $conn->prepare(
      'SELECT C.id as id, C.content as content, C.created_at as created_at, U.nickname as nickname, U.username as username ' . 
      'FROM comments AS C LEFT JOIN users AS U ON C.username = U.username ' . 
      'WHERE C.is_deleted is NULL ' .
      'ORDER BY C.id DESC LIMIT ? OFFSET ?');

    $stmt->bind_param('ii', $item_per_page, $offset);
    $result = $stmt->execute();
    if (!$result) {
      die('Error: ' . $conn->error);
    }

    $result = $stmt->get_result();
    return $result;
  }

  function getCommentCount() {
    global $conn;

    $sql = 'SELECT COUNT(id) as count FROM comments WHERE is_deleted IS NULL';
    $stmt = $conn->prepare($sql);

    $result = $stmt->execute();
    if (!$result) {
      die($conn->error);
    }
    $result = $stmt->get_result();
    $row = $result->fetch_assoc();

    return $row['count'];
  }

  function getComment($id) {
    global $conn;

    $sql = 'SELECT * FROM comments where id = ?';
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('i', $id);

    $result = $stmt->execute();
    if (!$result) {
      die('Error: ' . $conn->error);
    }

    $result = $stmt->get_result();
    $row = $result->fetch_assoc();
    return $row['content'];
  }

  function addComment($username, $content) {
    global $conn;
    
    $sql = 'INSERT INTO comments(username, content) values(?, ?)';
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('ss', $username, $content);

    $result = $stmt->execute();
    return $result ? TRUE : FALSE;
  }

  function updateComment($id, $content, $user) {
    global $conn;
    
    $sql = '';
    $stmt = NULL;
    if ($user['role'] === 'ADMIN') {
      $sql = 'UPDATE comments SET content=? WHERE id=?';
      $stmt = $conn->prepare($sql);
      $stmt->bind_param('si', $content, $id);
    } else {
      $sql = 'UPDATE comments SET content=? WHERE id=? AND username=?';
      $stmt = $conn->prepare($sql);
      $stmt->bind_param('sis', $content, $id, $user['username']);
    }
    

    $result = $stmt->execute();
    if (!$result) {
      die($conn->error);
    }
  }

  function deleteComment($id, $user) {
    global $conn;

    $sql = '';
    $stmt = NULL;
    if ($user['role'] === 'ADMIN') {
      $sql = 'UPDATE comments SET is_deleted=1 WHERE id=?';
      $stmt = $conn->prepare($sql);
      $stmt->bind_param('i', $id);
    } else {
      $sql = 'UPDATE comments SET is_deleted=1 WHERE id=? AND username=?';
      $stmt = $conn->prepare($sql);
      $stmt->bind_param('is', $id, $user['username']);
    }

    $result = $stmt->execute();
    if (!$result) {
      die($conn->error);
    }
  }
?>