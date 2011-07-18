<?php
  include('../../includes/connect.php');

  // get the information from the form
  $id = mysql_real_escape_string(preg_replace('/\.jpg/', '', $_FILES['photo']['name']));
  $title = mysql_real_escape_string($_POST['title']);
  $year = mysql_real_escape_string($_POST['year']);
  $tags = mysql_real_escape_string($_POST['tags']);
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
  
  // ========
  // = Tags =
  // ========
  
  // put the tags into an array
  $tags = explode(', ', $tags);
  
  // for each tag
  foreach($tags as $key => $value) {
    // get the current tag
    $currentTag = $tags[$key];
    
    // make lowercase
    $currentTag = strtolower($currentTag);
    
    // replace " " with "_"
    $currentTag = preg_replace('/ /', '_', $currentTag);
    
    // set tagID flag to false;
    $tagID = false;
    
    // see if the tag is in the database already
    $query = "SELECT id FROM tags WHERE tag='$currentTag'";
    $result = mysql_query($query) or die(mysql_error());
    
    while ($row = mysql_fetch_assoc($result)) {
      // set tagID if there's a result
      $tagID = $row['id'];
    }
    
    // there was a tagID result
    if ($tagID) {
      // echo "tag exists";
      // The tag is in the database already
      
      // does this photo and tag relationship exist?
      $query = "SELECT id FROM tag_relationships WHERE tag_id='$tagID' AND photo_id='$id'";
      $result = mysql_query($query) or die(mysql_error());
      
      if (mysql_num_rows($result) == 0) {
        // and add a relationship for the current picture along with the photo id
        $query = "INSERT INTO `tag_relationships` VALUES ('', '$tagID', '$id')";
        $result = mysql_query($query) or die(mysql_error());
        // echo ' added relationship';
      } else {
        // echo ' relationship exists';
      }
    } else {
      // echo "tag doesn't exist";
      // the tag isn't in the database, so add it
      $query = "INSERT INTO tags VALUES ('', '$currentTag')";
      $result = mysql_query($query) or die(mysql_error());
      
      $tagID = mysql_insert_id();
      
      // Add a relationship between the current photo and the current tag
      $query = "INSERT INTO tag_relationships VALUES ('', $tagID, $id)";
      $result = mysql_query($query) or die(mysql_error());
    }
  }

  // writes the photo to the server
  move_uploaded_file($_FILES['photo']['tmp_name'], $photoTarget);
  move_uploaded_file($_FILES['thumbnail']['tmp_name'], $thumbTarget);

  // redirect back to admin
  header("Location: /admin?adminTable=$table");
?>