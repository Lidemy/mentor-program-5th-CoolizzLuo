<?php
  session_start();
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
    <div class="posts">
      <?php
        $articles = getAllArticle();
        while ($row = $articles->fetch_assoc()) {
      ?>
      <article class="post">
        <div class="post__header">
          <div><?= escape($row['title']) ?></div>
          <?php if (!empty($_SESSION['username'])) { ?>
          <div class="post__actions">
            <a class="post__action" href="edit.php?id=<?= $row['id'] ?>">編輯</a>
          </div>
          <?php } ?>
        </div>
        <div class="post__info"><?= escape($row['created_at']) ?></div>
        <div class="post__content"><?= substr(escape($row['content']), 0, 200); ?></div>
        <a class="btn-read-more" href="blog.php?id=<?= $row['id'] ?>">READ MORE</a>
      </article>
      <?php } ?>
    </div>
  </div>
  <?php include_once("_footer.php") ?>
</body>
</html>