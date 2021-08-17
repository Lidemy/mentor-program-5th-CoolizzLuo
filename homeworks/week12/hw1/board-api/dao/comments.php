<?php
  require_once('_conn.php');

  function getAllComments($site_key) {
    global $conn;

    $sql = "SELECT * FROM discussions WHERE site_key=?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('s', $site_key);

    $result = $stmt->execute();
    $result = $stmt->get_result();

    $comments = array();

    while($row = $result->fetch_assoc()) {
      array_push($comments, array(
        "nickname" => $row['nickname'],
        "content" => $row['content'],
        "created_at" => $row['created_at'],
      ));
    }
    return $comments;
  }

  function getPageComments($site_key, $page) {
    global $conn;

    $item_per_page = 5;
    $offset = ($page - 1) * $item_per_page;

    $sql = "SELECT * FROM discussions WHERE site_key=? ORDER BY id DESC LIMIT ? OFFSET ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('sii', $site_key, $item_per_page, $offset);

    $result = $stmt->execute();
    $result = $stmt->get_result();

    $comments = array();

    while($row = $result->fetch_assoc()) {
      array_push($comments, array(
        "nickname" => $row['nickname'],
        "content" => $row['content'],
        "created_at" => $row['created_at'],
      ));
    }
    return $comments;
  }


  function addComment($site_key, $nickname, $content) {
    global $conn;
    
    $sql = "INSERT INTO discussions(site_key, nickname, content) VALUES(?, ?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('sss', $site_key, $nickname, $content);

    $result = $stmt->execute();
    return $result ? TRUE : FALSE;
  }

  function getTotalPage($site_key) {
    global $conn;

    $sql = 'SELECT COUNT(id) as count FROM discussions WHERE site_key=?';
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('s', $site_key);

    $result = $stmt->execute();
    if (!$result) {
      die($conn->error);
    }
    $result = $stmt->get_result();
    $row = $result->fetch_assoc();

    return ceil($row['count']/5);
  }

?>