<?php
	session_start();
	require_once('dao/comments.php');
	
	$username = NULL;
	if (!empty($_SESSION['username'])) {
		$username = $_SESSION['username'];
	}
?>

<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>留言板</title>
	<link rel="stylesheet" href="./style.css">
</head>
<body>
	<header class="warning">
		注意！本站為練習用網站，因教學用途刻意忽略資安的實作，註冊時請勿使用任何真實的帳號或密碼。
	</header>
	<main class="board">
		<div>
			<?php if ($username) { ?>
			<a class="board__btn" href="logout.php">登出</a>
			<h3>你好！ <?= $username ?></h3>
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
		<form class="board__new-comment-form" action="handle_add_comment.php" method="POST">
			<textarea name="content" cols="30" rows="5"></textarea>
			<?php if ($username) { ?>
			<input class="board__submit-btn" type="submit">
			<?php } else { ?>
			<h3>請登入發布留言</h3>
			<?php } ?>
		</form>
		<div class="board__hr"></div>
		<section>
			<?php
				$result = getAllComments();
				while ($row = $result->fetch_assoc()) {
			?>
			<div class="card">
				<div class="card__avatar"></div>
				<div class="card__body">
					<div class="card__info">
						<span class="card__author"><?= $row['nickname'] ?></span>
						<span class="card__time"><?= $row['created_at'] ?></span>
					</div>
					<p class="card__content"><?= $row['content'] ?></p>
				</div>
			</div>
			<?php } ?>
		</section>
	</main>
</body>
</html>