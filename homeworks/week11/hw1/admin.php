<?php
	session_start();
	require_once('./utils.php');
	require_once('dao/user.php');
	
	$username = NULL;
	$user = NULL;
	if (!empty($_SESSION['username'])) {
		$username = $_SESSION['username'];
		$user = getUserByUsername($username);
  }
  
  if ($user['role'] !== 'ADMIN') {
    header('Location: index.php');
  }
?>

<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>後台管理</title>
  <link href="https://fonts.googleapis.com/css?family=Noto+Sans+TC:100,300,500,700,900&display=swap" rel="stylesheet">
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
			<a class="board__btn" href="index.php">回首頁</a>
			<h3>你好！ <?= $user['nickname'] ?></h3>
			<?php } else  { ?>
			<a class="board__btn" href="register.php">註冊</a>
			<a class="board__btn" href="login.php">登入</a>
			<?php } ?>
		</div>
		<h1 class="board__title">User List</h1>
      <table class="board__user-table">
        <tr>
          <th>id</th>
          <th>username</th>
          <th>nickname</th>
          <th>role</th>
          <th>created_at</th>
          <th>action</th>
        </tr>
        <?php 
          $users = getAllUser();
          while ($row = $users->fetch_assoc()) {
        ?>
        <tr>
          <form action="handle_update_role.php" method="POST">
            <td><?= escape($row['id']) ?></td>
            <td><?= escape($row['username']) ?></td>
            <td><?= escape($row['nickname']) ?></td>
            <td>
              <select name="role" id="">
              <?php if ($row['username'] === 'admin') { ?> 
                <option value="ADMIN" selected disabled>ADMIN</option>
              <?php } else { ?> 
                <option value="ADMIN" <?= $row['role'] === 'ADMIN' ? 'selected' : '' ?>>ADMIN</option>
                <option value="NORMAL" <?= $row['role'] === 'NORMAL' ? 'selected' : '' ?>>NORMAL</option>
                <option value="BANNED" <?= $row['role'] === 'BANNED' ? 'selected' : '' ?>>BANNED</option>
              </select>
              <?php } ?>
            </td>
            <td><?= $row['created_at'] ?></td>
            <td><button>更新</button></td>
            <input type="hidden" name="id" value=<?= $row['id'] ?>>
          </form>
        </tr>
        <?php } ?>
      </table>
		<div class="board__hr"></div>
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