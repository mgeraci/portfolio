<?php
  include('../../includes/connect.php');

  // ================
  // = What it does =
  // ================
  // for each tag
  //   if the tag exists
  //     get the id's associated with that tag
  //     append the id of the current keywords document row
  //   else
  //     add a new row
  //     insert the id of the current keywords document row
  
  
  // set the file path
  $target_path = basename($_FILES['uploadedfile']['name']);
  
  // this script's directory
  $script_directory = substr($_SERVER['SCRIPT_FILENAME'], 0, strrpos($_SERVER['SCRIPT_FILENAME'], '/'));
  
  // set the target path to the script's directory plus the file name
  $target_path = $script_directory . '/' . $target_path;
  
  // move it to the admin directory
  if (move_uploaded_file($_FILES['uploadedfile']['tmp_name'], $target_path)) {
    // rename the file tags.txt
    rename(basename( $_FILES['uploadedfile']['name']), "tags.txt");
    
    // assign the tags file to an array
    $fileLines = file('tags.txt');
    
    // for each item (a line in the original file) in the array
    foreach($fileLines as $key => $value) {
      // get the current row's id
      $currentPicture = preg_replace('/(\d+?),.+/', '$1', $value);
      
      // strip whitespace off the end
      $currentPicture = preg_replace('/\s$/', '', $currentPicture);
      
      // get the tags
      $tags = preg_replace('/\d+?,/', '', $value);
      
      // put them into an array
      $tags = explode(',', $tags);
      
      // for each tag
      foreach($tags as $key => $value) {
        // get the current tag
        $currentTag = $tags[$key];
        
        // strip whitespace off the end
        $currentTag = preg_replace('/\s$/', '', $currentTag);
        
        // set tagID flag to false;
        $tagID = false;
        
        // see if the tag is in the database already
        $query = "SELECT id FROM tags WHERE tag='$currentTag'";
        $result = mysql_query($query) or die(mysql_error());
        
        while ($row = mysql_fetch_assoc($result)) {
          // set tagID if there's a result
          $tagID = $row['id'];
        }
        
        // echo "$currentPicture: ";
        
        // there was a tagID result
        if ($tagID) {
          // echo "tag exists";
          // The tag is in the database already
          
          // does this photo and tag relationship exist?
          $query = "SELECT id FROM tag_relationships WHERE tag_id='$tagID' AND photo_id='$currentPicture'";
          $result = mysql_query($query) or die(mysql_error());
          
          if (mysql_num_rows($result) == 0) {
            // and add a relationship for the current picture along with the photo id
            $query = "INSERT INTO `tag_relationships` VALUES ('', '$tagID', '$currentPicture')";
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
          $query = "INSERT INTO tag_relationships VALUES ('', $tagID, $currentPicture)";
          $result = mysql_query($query) or die(mysql_error());
        }
        // echo '<br>';
      }
    }
    header('Location: /admin/index.php?adminTable=blog');
  } else {
    echo "There was an error uploading the file, please try again!";
  }
?>