<?php
	include('api/connect.php');

	if (preg_match('/michaelgeraci\.com/', $_SERVER['SERVER_NAME'] )){
		session_save_path('/home/users/web/b2877/ipw.michaelg/public_html/cgi-bin/tmp');
	}
	
	session_start();

	// if name form submitted
	if ($_POST['person']) {
		// set the session var for name
		if (!isset($_SESSION['name'])) {
			$_SESSION['name'] = $_POST['person'];
		}
	}

	// if vote form submitted
	if ($_POST['element']) {
		$element = $_POST['element'];
		$person = $_POST['person'];
		
		$query = "INSERT INTO votes VALUES ('', '$element', '$person')";
		$result = mysql_query($query);
	}
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
	<head>
		<title>vote-o-matic</title>

		<script type="text/javascript" src="./js/jquery.js"></script>
		<script type="text/javascript" src="./js/javascript.js"></script>
		
		<style>
			img{border: 0;}
			
			h1{display: inline;}
		</style>
	</head>
	<body>
		<h1>vote-o-matic</h1>
		<?php
			if (!$_SESSION['name']) { ?>
				<br><br>
				<form action="./" method="post">
					name: <input type="text" name="person"></input>
					<br><input type="submit" value='do it'></input>
				</form>
			<?php } else { ?>
				<?php
					$name = $_SESSION['name'];
					$query = "SELECT * FROM votes WHERE name='$name'";
					$result = mysql_query($query);

					$votes = mysql_num_rows($result);
				?>
				&nbsp;&nbsp;&nbsp;&nbsp;<a href="./results.php">results</a> | logged in as <?php echo $_SESSION['name']; ?> (<?php echo $votes; ?> votes) | <a href="./api/logout.php">log out</a>
				<br>
				<br>
				<form id="voteForm" method='post' action='./'>
					<input type="hidden" id="votePerson" name="person" value="<?php echo $name; ?>"></input>
					<input type="hidden" id="voteElement" name="element" value=""></input>
					<?php
						// pick two elements
						$query = "SELECT * FROM elements ORDER BY rand() LIMIT 2";
						$result = mysql_query($query);

						while ($row = mysql_fetch_assoc($result)){ ?>
								<a class="voter" id="<?php echo $row['name']; ?>" href="#"><img src='./images/reducify_1_inside_palette1-<?php echo $row['name']; ?>.jpg'></a>
								&nbsp;
						<?php }
					?>
				</form>
			<?php }
		?>
	</body>
</html>
