<?php
  include('../../includes/connect.php');

  // get the information from the form
  $id = mysql_real_escape_string(preg_replace('/\.jpg/', '', $_FILES['photo']['name']));
  $title = mysql_real_escape_string($_POST['title']);
  $year = mysql_real_escape_string($_POST['year']);
  $table = mysql_real_escape_string($_POST['table']);

  if (($table == 'graphic') || ($table == 'graphicTest')){
    $info = mysql_real_escape_string($_POST['info']);
  }

  // the directory where images will be saved
  if (($table == 'graphic') || ($table == 'graphicTest')){
    $photoTarget = "../../media/graphic/";
    $photoTarget = $photoTarget . basename($_FILES['photo']['name']);

    $thumbTarget = "../../media/graphic/thumbs";
    $thumbTarget = $thumbTarget . basename($_FILES['thumbnail']['name']);
  } else {
    $photoTarget = "../../media/photography/$table/";
    $photoTarget = $photoTarget . basename($_FILES['photo']['name']);

    $thumbTarget = "../../media/photography/$table/thumbs/";
    $thumbTarget = $thumbTarget . basename($_FILES['thumbnail']['name']);
  }

  // get dimensions of photo
  list($width, $height) = getimagesize($_FILES['photo']['tmp_name']);

  // writes the information to the database
  if (($table == 'graphic') || ($table == 'graphicTest')){
    $query = "INSERT INTO $table (`id`, `title`, `info`, `year`, `width`, `height`, `number`) VALUES ('$id', '$title', '$info', '$year', '$width', '$height', NULL)";
  } else {
    $query = "INSERT INTO $table (`id`, `title`, `year`, `width`, `height`, `number`) VALUES ('$id', '$title', '$year', '$width', '$height', NULL)";
  }

  if ($query) {
    $result = mysql_query($query);
    if (!$result) {
      echo 'Could not run query: ' . mysql_error();
      exit;
    }
  }

  // writes the photo to the server
  move_uploaded_file($_FILES['photo']['tmp_name'], $photoTarget);
  move_uploaded_file($_FILES['thumbnail']['tmp_name'], $thumbTarget);

  // redirect back to admin
  header('Location: /admin?adminTable=' . $table);
?>