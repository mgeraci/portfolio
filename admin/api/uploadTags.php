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
        $tagID = '';

        // see if the tag is in the database already
        $query = "SELECT id FROM `tags` WHERE tag='$currentTag'";

        if ($query) {
          $result = mysql_query($query);
          if (!$result) {
            echo 'Could not run query 1: ' . mysql_error();
            exit;
          }
        }

        while ($row = mysql_fetch_array($result)) {
          $tagID = $row[0];
        }

        if ($tagID != '') {
          // if the tag is in the database already
          // get the pictures associated with it
          // append the new photo id (if it isn't in there already)
          $query = "SELECT pictures, count FROM `tags` WHERE id='$tagID'";
          
          if ($query) {
            $result = mysql_query($query);
            if (!$result) {
              echo 'Could not run query 2: ' . mysql_error();
              exit;
            }
          }

          while ($row = mysql_fetch_array($result)) {
            $pictures = $row[0];
            $count = $row[1];
          }
          
          $currentPictureRegex = '/' . $currentPicture . '/';
          
          if (preg_match($currentPictureRegex, $pictures)) {
            // if the picture is already in this row, then don't do anything
          } else {
            // append the current picture to the list
            $pictures .= ',' . $currentPicture;
            
            // increment the count
            $count++;
            
            // update the row with the new list of pictures
            $query = "UPDATE `tags` SET pictures='$pictures', count='$count' WHERE id='$tagID'";
            
            if ($query) {
              $result = mysql_query($query);
              if (!$result) {
                echo 'Could not run query 3: ' . mysql_error();
                exit;
              }
            }
          }
        } else {
          // the tag isn't in the database, so add it
          // along with the photo id
          $query = "INSERT INTO `tags` (tag, pictures, count) VALUES ('$currentTag', '$currentPicture', 1)";
          
          if ($query) {
            $result = mysql_query($query);
            if (!$result) {
              echo 'Could not run query 4: ' . mysql_error();
              exit;
            }
          }
        }
      }
    }
    header('Location: /admin/index.php?adminTable=blog');
  } else {
    echo "There was an error uploading the file, please try again!";
  }
?>