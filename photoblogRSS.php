<?php
  include('includes/connect.php');

  $query = "SELECT * FROM blog WHERE visible=1 ORDER BY number DESC";
  $result = mysql_query($query);
  if (!$result) {
    echo 'Could not run query: ' . mysql_error();
    exit;
  }

  while ($line = mysql_fetch_assoc($result)) {
    $return[] = $line;
  }

  $output = "<?xml version=\"1.0\"?>
              <rss version=\"2.0\">
                  <channel>
                      <title>Michael P. Geraci - Photoblog</title>
                      <link>http://www.michaelgeraci.com/photoRSS.php</link>
                      <description>Photos from my life.</description>
                      <language>en-us</language>";

  foreach ($return as $line) {
    $output .= "
      <item>
        <title>" . htmlentities($line['title']) . "</title>
        <link>http://www.michaelgeraci.com/photography/blog/" . htmlentities($line['number']) . "</link>
        <description>&lt;img src='http://www.michaelgeraci.com/media/photography/blog/" . htmlentities($line['id']) . ".jpg' alt='Photo " . htmlentities($line['number']) . "' /&gt;</description>
        <author>Michael P. Geraci</author>
      </item>
    ";
  }

  $output .= "</channel></rss>";
  header("Content-Type: application/rss+xml");
  echo $output;
?>