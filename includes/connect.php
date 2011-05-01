<?php
  // // // Connect to database // // //

  if (preg_match('/localhost/', $_SERVER['SERVER_NAME'])) {
    // local variables
    $username = "root";
    $password = "";
    $host = "";
    $database = "michaelgeraci.com_development";
  } else {
    // online variables
    $username = "mgeraci";
    $password = "3dN7hNejLLUeoqVLermf";
    $host = "mysql.michaelgeraci.com";
    $database = "michaelgeraci_production";
  }

  $conn = mysql_connect($host, $username, $password);
  mysql_select_db($database, $conn);

  if (!$conn) {
    echo "Could Not Connect to the michaelgeraci.com Database";
  }
?>