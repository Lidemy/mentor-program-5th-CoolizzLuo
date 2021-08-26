<?php
	session_start();
  require_once('dao/article.php');
  require_once('utils.php');

  if (empty($_GET['id'])) {
    header('Location: admin.php');
  }
  $id = $_GET['id'];
  $article = getArticle($id);
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
      <article class="post">
        <div class="post__header">
          <div><?= escape($article['title']) ?></div>
          <?php if (!empty($_SESSION['username'])) { ?>
          <div class="post__actions">
            <a class="post__action" href="edit.php?id=<?= $article['id'] ?>">編輯</a>
          </div>
          <?php } ?>
        </div>
        <div class="post__info"><?= escape($article['created_at']) ?></div>
        <div class="post__content"><?= escape($article['content']) ?></div>
      </article>
    </div>
  </div>
  <?php include_once("_footer.php") ?>
</body>
</html>