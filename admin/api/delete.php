<?php
  include('../../includes/connect.php');

  $number = mysql_real_escape_string($_POST['number']);
  $table = mysql_real_escape_string($_POST['table']);
  
  // construct and run the query
  $query = "DELETE FROM $table WHERE `number` = $number LIMIT 1";

  if ($query) {
    $result = mysql_query($query);
    if ($result) {
      // reset the auto increment number
      $query = "ALTER TABLE $table AUTO_INCREMENT = 1";
      mysql_query($query);
    } else {
      echo 'Could not run query: ' . mysql_error();
      exit;
    }
  }
?>