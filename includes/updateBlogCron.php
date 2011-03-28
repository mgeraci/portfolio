#!/usr/local/php5/bin/php -q

<?php
  // connect to db
  include('/home/michaelgeraci/michaelgeraci.com/includes/connect.php');

  // get the number of rows with visible == zero
  $query = "SELECT count(id) as count FROM blog WHERE visible=0";
  $result = mysql_query($query);

  if (!$result) {
    echo 'Could not run query: ' . mysql_error();
    exit;
  }

  while ($row = mysql_fetch_assoc($result)) {
    $count = $row['count'];
  }

  // if there are some with invisible, publish the lowest numbered one
  if ($count > 0) {
    $query = "UPDATE blog SET visible=1 WHERE visible=0 ORDER BY number ASC LIMIT 1";
    $result = mysql_query($query);
    if (!$result) {
      echo 'Could not run query: ' . mysql_error();
      exit;
    }
  }
?>