<?php
  function escape($str) {
    return htmlspecialchars($str, ENT_QUOTES);
  }


  // ADMIN can add, update, delete any
  // NORMAL can add, update, delete self
  // BANNED can't add, can update, delete self
  function addPermission($user) {
    if ($user === NULL) return FALSE;
    return $user['role'] !== 'BANNED';
  }
  function editPermission($user, $comment) {
    if ($user === NULL) {
      return FALSE;
    } else if ($user['role'] === 'ADMIN') {
      return TRUE;
    } else if ($user['role'] === 'NORMAL' || $user['role'] === 'BANNED') {
      return $user['username'] === $comment['username'];
    } else {
      return FALSE;
    }
  }
?>