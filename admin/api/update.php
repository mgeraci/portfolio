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
    $tags = mysql_real_escape_string(urldecode($_POST['tags']));
    $visible = mysql_real_escape_string(urldecode($_POST['visible']));
    
    // remove current tag relationships
    $query = "DELETE FROM tag_relationships WHERE photo_id='$id'";
  
    $result = mysql_query($query) or die(mysql_error());
    
    
    // ======================================
    // = Add the new tags/tag relationships =
    // ======================================
    
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