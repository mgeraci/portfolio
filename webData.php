<?php
  include 'includes/connect.php';

  $shortname = mysql_real_escape_string($_GET['shortname']);
  
  $query = "SELECT * FROM web WHERE shortname='$shortname'";
  $result = mysql_query($query);
  if (!$result) {
    echo 'Could not run query: ' . mysql_error();
    exit;
  }
  
  while ($row = mysql_fetch_assoc($result)) {
    $name = $row['name'];
    $subtitle = $row['subtitle'];
    $tech = $row['tech'];
    $year = $row['year'];
    $images = $row['images'];
    $url = $row['url'];
  }

  echo '{"name": "' . $name . '", "subtitle": "' . $subtitle . '", "tech": "' . $tech . '", "year": "' . $year . '", "images": ' . $images . ', "url": "' . $url . '"}';
?>