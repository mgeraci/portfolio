<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html>
  <head>
    <title>Mg Admin</title>
    <link rel="stylesheet" type="text/css" href="../style/style.css">
    <link rel="stylesheet" type="text/css" href="style/adminStyle.css">

    <script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js"></script>
    <script type="text/javascript" src="../js/jquery.hotkeys-0.8.min.js"></script>
    <script type="text/javascript" src="adminJs/javascript.js"></script>
  </head>
  <body>
    <div id="adminContent">
      <br><h1 id="adminPage" style="display: inline;">All Your Pictures Are Belong To You</h1>
      <br><a href='/admin?adminTable=blog'>photoblog</a> | <a href='/admin?adminTable=graphic'>graphic design</a>
      <br>
      <br>
      <?php
        if ($_GET["adminTable"]){
          $adminTable = $_GET["adminTable"];
        } else {
          $adminTable = 'blog';
        }

        echo '<a id="adminAdd" href="#">Add A Picture</a>';
        echo "<div id='adminTable' style='display: none;'>$adminTable</div>";
      ?>
      <div id="adminAddDiv">
        <form enctype="multipart/form-data" onsubmit="return validateAddPicture();" action="api/add.php" method="POST">
          <table>
            <tr id="adminTopRow">
              <td>title</td>
              <td>year</td>
              <td></td>
              <td></td>
            </tr>
            <tr id="admin">
              <td><input id="adminAddTitle" name="title" style="width: 225px;"></input></td>
              <td><input id="adminAddYear" name="year"></input></td>
              <td></td>
              <td></td>
            </tr>
            <?php
              if (($adminTable == 'graphic') || ($adminTable == 'graphicTest')) {
                echo '
                  <tr>
                    <td colspan="5" style="padding-top: 10px;">
                      <b>info:</b>
                      <br><input id="adminAddInfo" type="text" name="info" size="55">
                    </td>
                  </tr>
                ';
              }
            ?>
            <tr>
              <td colspan="5" style="padding-top: 10px;">
                <b>picture:</b>
                <br><input id="adminAddPhoto" type="file" name="photo" size="50">
              </td>
            </tr>
            <tr>
              <td colspan="5" style="padding-top: 10px;">
                <b>thumbnail:</b>
                <br><input id="adminAddThumbnail" type="file" name="thumbnail" size="50">
              </td>
            </tr>
            <?php if ($adminTable == 'blog') { ?>
              <tr>
                <td colspan="5">
                  <b>tags:</b>
                  <br><textarea id="adminAddTags" name="tags"></textarea>
                </td>
              </tr>
            <?php } ?>
            <tr>
              <td><input id="adminAddSubmit" type="submit" value="submit"></input></td>
              <td><input id="adminAddCancel" type="button" value="cancel"></input></td>
            </tr>
          </table>
          <div style="display: none;"><input type="text" name="table" value="<?php echo $adminTable; ?>"></input></div>
        </form>
      </div>
      <br>
      <br>
      <?php
        // ======================
        // = SQL Database Stuff =
        // ======================

        include('../includes/connect.php');

        // construct and run the query
        if ($adminTable) {
          if (($adminTable == 'blog') || ($adminTable == 'photoTest')) {
            $query = "SELECT number, id, title, year, width, height, visible FROM $adminTable ORDER BY number DESC";
          } else {
            $query = "SELECT number, id, title, info, year, width, height FROM $adminTable ORDER BY number DESC";
          }
          $result = mysql_query($query);

          if (!$result) {
            echo 'Could not run query: ' . mysql_error();
            exit;
          }

          // show the results
          echo '<table id="adminPictureTable"';
          if (($adminTable == "graphic") || ($adminTable == "graphicTest")) {
            echo 'style="margin-left: -150px; width: 1200px;"';
          }
          echo '>
              <tr id="adminTopRow">
                <td>#</td>
                <td>id</td>
                <td>title</td>
              ';

              if (($adminTable == 'graphic') || ($adminTable == 'graphicTest')) {
                echo '<td>info</td>';
              }

              echo '
                <td>year</td>
                <td>width</td>
                <td>height</td>
                <td>image</td>
              ';

              if (($adminTable == 'blog') || ($adminTable == 'photoTest')) {
                echo '
                  <td>tags</td>
                  <td>visible</td>
                ';
              }

              echo '
                <td></td>
                <td></td>
              </tr>
          ';
            while ($row = mysql_fetch_row($result)){
              // if we're on the photoblog, get the tags associated with this photo
              if ($adminTable == 'blog') {
                // get the tag ids associated with this photo
                $tag_id_query = "SELECT tag_id FROM tag_relationships WHERE photo_id=$row[1]";
                $tag_id_result = mysql_query($tag_id_query) or die(mysql_error());
                
                $tag_array = array();
                
                while ($tag_id_row = mysql_fetch_assoc($tag_id_result)) {
                  array_push($tag_array, $tag_id_row['tag_id']);
                }
                
                $tag_name_array = array();
                
                foreach ($tag_array as $tag_id) {
                  // get the tag's name
                  $tag_name_query = "SELECT tag FROM tags WHERE id=$tag_id";
                  $tag_name_result = mysql_query($tag_name_query) or die(mysql_error());
                  
                  while ($tag_name_row = mysql_fetch_assoc($tag_name_result)) {
                    array_push($tag_name_array, $tag_name_row['tag']);
                  }
                }
              }
              
              if (($adminTable == 'blog') || ($adminTable == 'photoTest')){
                echo "<tr class='adminPictureRow";
                if ($row[6] == 0) {
                  echo " inQueue";
                }
                echo "'>
                    <td class='number'>$row[0]</td>
                    <td class='id'>$row[1]</td>
                    <td class='title'>$row[2]</td>
                    <td class='year'>$row[3]</td>
                    <td class='width'>$row[4]</td>
                    <td class='height'>$row[5]</td>
                    <td class='anImage'>hover</td>
                    <td class='tags'>" . join(', ', $tag_name_array) . "</td>
                    <td class='visible'>$row[6]</td>
                    <td class='adminDelete'><a class='delete' href='#'>delete</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
                    <td class='adminEdit'><a class='edit' href='#'>edit</a></td>
                  </tr>
                ";
              } else {
                echo "
                  <tr class='adminPictureRow'>
                    <td class='number'>$row[0]</td>
                    <td class='id'>$row[1]</td>
                    <td class='title'>$row[2]</td>
                    <td class='info'>$row[3]</td>
                    <td class='year'>$row[4]</td>
                    <td class='width'>$row[5]</td>
                    <td class='height'>$row[6]</td>
                    <td class='anImage'>hover</td>
                    <td class='adminDelete'><a class='delete' href='#'>delete</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
                    <td class='adminEdit'><a class='edit' href='#'>edit</a></td>
                  </tr>
                ";
              }
            }
          echo '</table>';
        }
      ?>
      <div id="picturePreview"></div>
    </div>
  </body>
</html>