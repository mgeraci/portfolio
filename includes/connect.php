<?php
  // // // Connect to database // // //

  if (preg_match('/michaelgeraci\.com/', $_SERVER['SERVER_NAME'])){
    // online variabls
    $username = "mgeraci";
    $password = "3dN7hNejLLUeoqVLermf";
    $host = "mysql.michaelgeraci.dreamhosters.com";
    $database = "michaelgeraci_production";
  } else if (preg_match('/localhost/', $_SERVER['SERVER_NAME'])) {
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