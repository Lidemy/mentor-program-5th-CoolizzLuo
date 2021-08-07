<?php
  require_once('conn.php');

  function getAllComments() {
    global $conn;

    $sql = 'SELECT * FROM comments ORDER BY id DESC';
    $result = $conn->query($sql);
    if (!$result) {
      die('Error: ' . $conn->error);
    }
    return $result;
  }

  function addComment($nickname, $content) {
    global $conn;
    
    $sql = sprintf(
      'INSERT INTO comments(nickname, content) values("%s", "%s")',
      $nickname,
      $content
    );
    $result = $conn->query($sql);
    return $result ? TRUE : FALSE;
  }

?>