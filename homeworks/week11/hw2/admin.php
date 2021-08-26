<?php
	session_start();
  require_once('check_permission.php');
  require_once('dao/article.php');
  require_once('utils.php');
?>
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">

  <title>部落格</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="normalize.css" />
  <link rel="stylesheet" href="style.css" />
</head>

<body>
  <?php include_once("_header.php") ?>  
  <section class="banner">
    <div class="banner__wrapper">
      <h1>存放技術之地</h1>
      <div>Welcome to my blog</div>
    </div>
  </section>
  <div class="container-wrapper">
    <div class="container">
      <div class="admin-posts">
        <?php
          $articles = getAllArticle();
          while ($row = $articles->fetch_assoc()) {
        ?>
        <div class="admin-post">
          <div class="admin-post__title"><?= escape($row['title']) ?></div>
          <div class="admin-post__info">
            <div class="admin-post__created-at"><?= escape($row['created_at']) ?></div>
            <a class="admin-post__btn" href="edit.php?id=<?= $row['id'] ?>">編輯</a>
            <a class="admin-post__btn" href="delete.php?id=<?= $row['id'] ?>">刪除</a>
          </div>
        </div>
        <?php } ?>
      </div>
    </div>
  </div>
  <footer>Copyright © 2020 Who's Blog All Rights Reserved.</footer>
</body>
</html>