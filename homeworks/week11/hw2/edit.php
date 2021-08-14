<?php
	session_start();
  require_once('check_permission.php');
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
    <div class="container">
      <div class="edit-post">
        <form action="handle_edit.php" method="POST">
          <input type="hidden" name="id" value="<?= $article['id'] ?>" />
          <input type="hidden" name="page" value="<?= $_SERVER['HTTP_REFERER'] ?>" /> 
          <div class="edit-post__title">
            發表文章：
          </div>
          <div class="edit-post__input-wrapper">
            <input class="edit-post__input" placeholder="請輸入文章標題" name="title" value="<?= escape($article['title']) ?>" />
          </div>
          <div class="edit-post__input-wrapper">
            <textarea rows="20" class="edit-post__content" name="content"><?= escape($article['content']) ?></textarea>
          </div>
          <div class="edit-post__btn-wrapper">
              <button class="edit-post__btn">送出</button>
          </div>
        </form>
      </div>
    </div>
  </div>
  <?php include_once("_footer.php") ?>
</body>
</html>