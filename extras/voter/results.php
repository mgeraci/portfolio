<?php
	include('api/connect.php');
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
	<head>
		<title>vote-o-matic</title>

		<script type="text/javascript" src="./js/jquery.js"></script>
		<script type="text/javascript" src="./js/javascript.js"></script>
		
		<style>
			img{border: 0;}
		</style>
	</head>
	<body>
		<h1>results</h1>
		<a href="./">back</a>
		<br>
		<br><a href="./results.php">cumulative</a> |
		<?php
			$query = "SELECT DISTINCT name FROM votes";
			$result = mysql_query($query);

			while ($row = mysql_fetch_assoc($result)) {
					echo '<a href="./results.php?viewing=' . $row['name'] . '">' . $row['name'] . '</a> | ';
			}
			
			if ($_GET['viewing']) {
				$name = $_GET['viewing'];
				
				$query = "SELECT * FROM votes WHERE name='$name'";
				$result = mysql_query($query);

				$votes = mysql_num_rows($result);
				
				echo "<br><br>$name's results ($votes votes):";
				
				// get all the elements in
				$query = "SELECT * FROM elements";
				$result = mysql_query($query);

				$elements = array();

				while ($row = mysql_fetch_assoc($result)) {
					$item = $row['name'];
					
					// for each element, stick the count in an array
					$query2 = "SELECT count(*) FROM votes WHERE item='$item' && name='$name'";
					// echo $query . '<br>';
					$result2 = mysql_query($query2);
					while ($row2 = mysql_fetch_row($result2)){
						$count = $row2[0];
					}
					// 					
					$elements[$item] = $count;
				}
				
				// sort the array
				asort($elements);
				$elements = array_reverse($elements);
				
				// loop through the array and display
				echo '<ol>';
					foreach ($elements as $key=>$value) {
					    echo "<li>$key ($value)</li>";
					}
				echo '</ol>';
			} else {
				$query = "SELECT * FROM votes";
				$result = mysql_query($query);
				
				$votes = mysql_num_rows($result);
				
				echo "<br><br>cumulative results ($votes votes)";
				
				// get all the elements in
				$query = "SELECT * FROM elements";
				$result = mysql_query($query);

				$elements = array();

				while ($row = mysql_fetch_assoc($result)) {
					$item = $row['name'];
					
					// for each element, stick the count in an array
					$query2 = "SELECT count(*) FROM votes WHERE item='$item'";
					// echo $query . '<br>';
					$result2 = mysql_query($query2);
					while ($row2 = mysql_fetch_row($result2)){
						$count = $row2[0];
					}
					// 					
					$elements[$item] = $count;
				}
				
				// sort the array
				asort($elements);
				$elements = array_reverse($elements);
				
				// loop through the array and display
				echo '<ol>';
					foreach ($elements as $key=>$value) {
					    echo "<li>$key ($value)</li>";
					}
				echo '</ol>';
			}
		?>		
	</body>
</html>
