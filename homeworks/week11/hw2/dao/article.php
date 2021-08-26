<?php
  require_once('dao/_conn.php');

  function getAllArticle() {
    global $conn;

    $sql = 'SELECT * FROM enzo_blog_article WHERE is_deleted is NULL ORDER BY id DESC';
    $stmt = $conn->prepare($sql);

    $result = $stmt->execute();
    if (!$result) {
      die('Error: ' . $conn->error);
    }

    $result = $stmt->get_result();
    return $result;
  }

  function getAllArticleTop() {
    global $conn;

    $sql = 'SELECT * FROM enzo_blog_article WHERE is_deleted is NULL ORDER BY id DESC LIMIT 5';
    $stmt = $conn->prepare($sql);

    $result = $stmt->execute();
    if (!$result) {
      die('Error: ' . $conn->error);
    }

    $result = $stmt->get_result();
    return $result;
  }

  function getArticleCount() {
    global $conn;

    $sql = 'SELECT COUNT(id) as count FROM enzo_blog_article WHERE is_deleted IS NULL';
    $stmt = $conn->prepare($sql);

    $result = $stmt->execute();
    if (!$result) {
      die($conn->error);
    }
    $result = $stmt->get_result();
    $row = $result->fetch_assoc();

    return $row['count'];
  }

  function getArticle($id) {
    global $conn;

    $sql = 'SELECT * FROM enzo_blog_article where id = ?';
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('i', $id);

    $result = $stmt->execute();
    if (!$result) {
      die('Error: ' . $conn->error);
    }

    $result = $stmt->get_result();
    $row = $result->fetch_assoc();
    return $row;
  }

  function addArticle($author, $title, $content) {
    global $conn;
    
    $sql = 'INSERT INTO enzo_blog_article(author, title, content) values(?, ?, ?)';
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('sss', $author, $title, $content);

    $result = $stmt->execute();
    return $result ? TRUE : FALSE;
  }

  function updateArticle($title, $content, $id) {
    global $conn;
    
    $sql = 'UPDATE enzo_blog_article SET title=?, content=? WHERE id=?';
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('ssi', $title, $content, $id);

    $result = $stmt->execute();
    return TRUE;
  }

  function deleteArticle($id) {
    global $conn;

    $sql = 'UPDATE enzo_blog_article SET is_deleted=1 WHERE id=?';
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('i', $id);

    $result = $stmt->execute();
    if (!$result) {
      die($conn->error);
    }
  }
?>