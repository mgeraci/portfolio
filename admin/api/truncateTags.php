<?php
  include('../../includes/connect.php');

  $result = mysql_query("TRUNCATE TABLE `tags`");
  $result = mysql_query("TRUNCATE TABLE `tag_relationships`");
?>