<?php
	session_start();
	require_once('./utils.php');
	require_once('dao/comments.php');
	require_once('dao/user.php');
	
	$username = NULL;
	$user = NULL;
	if (!empty($_SESSION['username'])) {
		$username = $_SESSION['username'];
		$user = getUserByUsername($username);
	}
?>

<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>留言板</title>
	<link rel="stylesheet" href="./style.css">
	<link href="https://fonts.googleapis.com/css?family=Noto+Sans+TC:100,300,500,700,900&display=swap" rel="stylesheet">
</head>
<body>
	<header class="warning">
		注意！本站為練習用網站，因教學用途刻意忽略資安的實作，註冊時請勿使用任何真實的帳號或密碼。
	</header>
	<main class="board">
		<div>
			<?php if ($username) { ?>
			<a class="board__btn" href="logout.php">登出</a>
			<span class="board__btn update-nickname">編輯暱稱</span>
			<?php if ($user['role'] === 'ADMIN') { ?> 
				<a class="board__btn" href="admin.php">會員管理</a>
			<?php } ?>
			<form action="update_user.php" method="POST" class="hide board__nickname-form board__new-comment-form">
				<div class="board__nickname">
					<span>新的暱稱：</span>
					<input type="text" name="nickname"/>
				</div>
				<input class="board__submit-btn" type="submit">
			</form>
			<h3>你好！ <?= escape($user['nickname']) ?></h3>
			<?php } else  { ?>
			<a class="board__btn" href="register.php">註冊</a>
			<a class="board__btn" href="login.php">登入</a>
			<?php } ?>
		</div>
		<h1 class="board__title">Comments</h1>
		<?php
			if (!empty($_GET['errCode'])) {
				$code = $_GET['errCode'];
				$msg = 'Error';
				if($code === '1') {
					$msg = '資料不齊全';
				}
				echo '<h2 class="error">錯誤: '. $msg .'</h2>';
			}
		?>
		<?php if (addPermission($user)) { ?>
		<form class="board__new-comment-form" action="handle_add_comment.php" method="POST">
			<textarea name="content" cols="30" rows="5"></textarea>
			<?php if ($username) { ?>
			<input class="board__submit-btn" type="submit">
			<?php } else { ?>
			<h3>請登入發布留言</h3>
			<?php } ?>
		</form>
		<?php } ?>
		<div class="board__hr"></div>
		<section>
			<?php
				$page = empty($_GET['page']) ? 1 : intval($_GET['page']);
				$comments = getAllComments($page);
				$count = getCommentCount();
				$total_page = ceil($count / 5);

				while ($row = $comments->fetch_assoc()) {
			?>
			<div class="card">
				<div class="card__avatar"></div>
				<div class="card__body">
					<div class="card__info">
						<span class="card__author"><?= escape($row['nickname']) ?> (@<?= escape($row['username']) ?>)</span>
						<span class="card__time"><?= $row['created_at'] ?></span>
						<?php if (editPermission($user, $row)) { ?>
						<a href="update_comment.php?id=<?= $row['id'] ?>">編輯</a>
						<a href="delete_comment.php?id=<?= $row['id'] ?>">刪除</a>
						<?php } ?>
					</div>
					<p class="card__content"><?= escape($row['content']) ?></p>
				</div>
			</div>
			<?php } ?>
		</section>
		<div class="board__hr"></div>
		<div class="page-info">
			<span>總共有 <?= $count ?> 筆留言，頁數：</span>
			<span> <?= $page ?> / <?= $total_page ?></span>
		</div>
		<div class="paginator">
			<?php if ($page != 1) { ?>
				<a href="index.php?page=1">首頁</a>
				<a href="index.php?page=<?= $page - 1 ?>">上一頁</a>
			<?php } ?>
			<?php if ($page != $total_page) { ?>
				<a href="index.php?page=<?= $page + 1 ?>">下一頁</a>
				<a href="index.php?page=<?= $total_page ?>">最後一頁</a>
			<?php } ?>
		</div>
	</main>
	<script>
		const btn = document.querySelector('.update-nickname')
    btn.addEventListener('click', function() {
      const form = document.querySelector('.board__nickname-form')
      form.classList.toggle('hide')
    })
	</script>
</body>
</html>