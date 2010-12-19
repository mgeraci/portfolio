<?php
  include('../../includes/connect.php');

  // get the information from the form
  $number = mysql_real_escape_string(urldecode($_POST['number']));
  $id = mysql_real_escape_string(urldecode($_POST['id']));
  $title = mysql_real_escape_string(urldecode($_POST['title']));
  $year = mysql_real_escape_string(urldecode($_POST['year']));
  $width = mysql_real_escape_string(urldecode($_POST['width']));
  $height = mysql_real_escape_string(urldecode($_POST['height']));
  $table = mysql_real_escape_string(urldecode($_POST['table']));

  if (($table == 'graphic') || ($table == 'graphicTest')){
    $info = mysql_real_escape_string(urldecode($_POST['info']));
  }

  if (($table == 'blog') || ($table == 'photoTest')){
    $visible = mysql_real_escape_string(urldecode($_POST['visible']));
  }

  // construct and run the query
  if ($table == 'blog'){
    $query = "UPDATE $table SET `id` = '$id', `title` = '$title', `year` = '$year', `width` = '$width', `height` = '$height', `visible` = $visible WHERE `number` = $number LIMIT 1";
  } else {
    $query = "UPDATE $table SET `id` = '$id', `title` = '$title', `info` = '$info', `year` = '$year', `width` = '$width', `height` = '$height' WHERE `number` = $number LIMIT 1";
  }

  $result = mysql_query($query);

  if (!$result) {
    echo 'Could not run query: ' . mysql_error();
    exit;
  } else {
    header("Location: /admin/index.php?adminTable=$table");
  }
?>