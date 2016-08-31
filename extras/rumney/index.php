<?php
	$root = "http://dropbox.michaelgeraci.com/rumney";
	$zip_prefix = "/rumney.z";
?>

<!DOCTYPE html>
<html>
	<head>
		<title>Rumney</title>
		<style type="text/css">
			html,
			body {
				width: 100%;
				height: 100%;
				margin: 0;
				padding: 0;
				font-family: helvetica, arial, sans-serif;
			}

			body {
				padding-top: 37%;
				background: url(./cover.jpg) 0 0 no-repeat;
				background-size: cover;
			}

			a {
				float: left;
				margin: 30px;
				width: 50px;
				color: #fff;
				text-decoration: none;
			}

			a img {
				float: left;
				width: 100%;
				height: auto;
			}

			a span {
				float: left;
				margin-top: 5px;
				width: 100%;
				text-align: center;
			}
		</style>
	</head>
	<body>
		<?php
			for ($i = 0; $i < 24; $i++) {
				$cur = $i;

				// pad single-digit numbers with a leading zero
				if ($cur < 10) {
					$cur = "0" . $cur;
				}

				// if we are on 0, it's not actually a zNN ending, just zip
				if ($i == 0) {
					$cur = "ip";
				}

				echo "<a href='$root$zip_prefix$cur' target='_blank'>";
					echo "<img src='./zip.png' />";
					echo "<span>$i</span>";
				echo "</a>";
			}
		?>
	</body>
</html>
