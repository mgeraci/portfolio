<?php
	// // // Connect to database // // //

	if (preg_match('/michaelgeraci\.com/', $_SERVER['SERVER_NAME'] )){
		// online variabls
		$username = "mgeraci";
		$password = 'XdPfnS2N3@_N4rOl';
		$host = "michaelg.ipowermysql.com";
		$database = "mg";
	} else {
		// local variables
		$username = "root";
		$password = "";
		$host = "";
		$database = "michaelgeraci.com_development";
	}

	$conn = mysql_connect($host, $username, $password);
	mysql_select_db($database, $conn);

	if (!$conn) {
		echo "Could Not Connect to the Graphic Design Database";
	}	
?>