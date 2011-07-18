<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html>
  <?php
    $section = $_GET["section"];

    if (!$section) {
      $section = 'all';
    }

    // // H E A D // //
    $title = "Michael P. Geraci - Photography - Browse " . ucwords($section);

    // gets the location of the page and assigns it to $location
    // format is /page.php
    $location = $_SERVER['PHP_SELF'];

    include("includes/head.php");
  ?>
  <body>
    <div id="content">
      <?php
        // // M E N U // //
        // gets the location of the page and assigns it to $location
        // format is /page.php
        $location = $_SERVER['PHP_SELF'];
        include("includes/menu.php");

        // Connect to DB
        include('includes/connect.php');

        // Get max year and assign to $maxYear

        $query = "SELECT max(year) as max FROM `blog` WHERE visible=1";

        if ($query) {
          $result = mysql_query($query);
          if (!$result) {
            echo 'Could not run query: ' . mysql_error();
            exit;
          }
        }

        while ($row = mysql_fetch_assoc($result)){
          $maxYear = $row["max"];
        }

        // Get min year and assign to $minYear

        $query = "SELECT min(year) as max FROM `blog` WHERE visible=1";

        if ($query) {
          $result = mysql_query($query);
          if (!$result) {
            echo 'Could not run query: ' . mysql_error();
            exit;
          }
        }

        while ($row = mysql_fetch_assoc($result)){
          $minYear = $row["max"];
        }

        // // // Get the piece number of the most current photo (assigned to $max) // // //

        $query = "SELECT max(number) as max, max(id) as maxId FROM `blog` WHERE visible=1";

        if ($query) {
          $result = mysql_query($query);
          if (!$result) {
            echo 'Could not run query: ' . mysql_error();
            exit;
          }
        }

        while ($row = mysql_fetch_assoc($result)){
          $max = $row["max"];
          $maxId = $row["maxId"];
        }

        // get the number of pages (rounded up)
        $pagesRound = ceil($max/12);

        // open the centered container
        echo '<div id="photoAll">';

          // ================
          // = all pictures =
          // ================
          if ($section == 'all') {
            echo browseNavigation($minYear, $maxYear, $section);
            
            // link to the current picture
            echo '<br><a style="line-height: 25px;" href="/photography/blog/' . $max . '">back to photoblog</a><br>&nbsp;';
            
            $query = "SELECT id, number FROM `blog` WHERE visible=1 ORDER BY number DESC";
            if ($query) {
              $result = mysql_query($query);
              if (!$result) {
                echo 'Could not run query: ' . mysql_error();
                exit;
              }
            } else {
              echo 'Please click <a href="/photography/blog">here</a> to return to Photography';
              exit;
            }

            // Display Thumbnails

            echo '<ul>';
              while ($row = mysql_fetch_row($result)){
                echo '<li><a href="/photography/blog/' . $row[1] . '"><img class="photoAllIMG" src="/media/photography/blog/thumbs/' . $row[0] . '.jpg" alt="' . $row[0] . '" height="75" width="75"></a></li>';
              } 
            echo '</ul>';

          // ========================
          // = Pictures from a year =
          // ========================
          } else if (is_numeric($section)) {
            echo browseNavigation($minYear, $maxYear, $section);
            
            // link to the current picture
            echo '<br><a style="line-height: 25px;" href="/photography/blog/' . $max . '">back to photoblog</a><br>&nbsp;';
            
            $section = mysql_real_escape_string($section);

            // get all the pictures from a specific year
            $query = "SELECT id, number FROM `blog` WHERE year='$section' AND visible=1 ORDER BY number DESC";
            if ($query) {
              $result = mysql_query($query);
              if (!$result) {
                echo 'Could not run query: ' . mysql_error();
                exit;
              }
            } else {
              echo 'Please click <a href="/photography">here</a> to return to Photography';
              exit;
            }

            // Display Thumbnails

            echo '<ul>';
              while ($row = mysql_fetch_row($result)){
                echo '<li><a href="/photography/blog/' . $row[1] . '"><img class="photoAllIMG" src="/media/photography/blog/thumbs/' . $row[0] . '.jpg" alt="' . $row[0] . '" height="75" width="75"></a></li>';
              }  
            echo '</ul>';

          // =========================
          // = List all tags in text =
          // =========================
          } else if ($section == 'tags') {
            echo browseNavigation($minYear, $maxYear, $section);
            
            // link to the current picture
            echo "<br><a style='line-height: 25px;' href='/photography/blog/$max'>back to photoblog</a><br>&nbsp;";
            
            $query = "SELECT id, tag FROM `tags` ORDER BY tag ASC";
            $result = mysql_query($query) or die(mysql_error());
            
            echo "<div id='allTags'>";
              // Display Tag Names
              while ($row = mysql_fetch_row($result)){
                // put the pictures tagged with this tag in an array
                $tagID = $row[0];
                $tag = $row[1];
                
                // how many relationships with this tag exist?
                $query = "SELECT id FROM tag_relationships WHERE tag_id='$tagID'";
                $tagResults = mysql_query($query) or die(mysql_error());
                
                $numTags = mysql_num_rows($tagResults);
                
                // echo "$tag, $tagID, $numTags<br>";
                
                // only display the tag if it's being used
                if ($numTags > 0) {
                  echo "<a class='tagCount$numTags' href='/photography/blog/browse/$tag'>" . preg_replace('/_/', ' ', $tag) . '<a> ';
                }
              }

            echo "</div>";

          // ==================
          // = A specific tag =
          // ==================
          } else {
            $tag = mysql_real_escape_string($section);
            
            // get the tag's id
            $query = "SELECT id FROM tags WHERE tag='$tag'";
            $result = mysql_query($query) or die(mysql_error());
            
            while ($row = mysql_fetch_assoc($result)) {
              $tagID = $row['id'];
            }
            
            // if there are no matching tags
            if (mysql_num_rows($result) == 0) {
              echo "no pictures matched $section<br><a style='line-height: 25px;' href='/photography/blog/browse/tags'>back to tags</a> | <a style='line-height: 25px;' href='/photography/blog/$max'>back to photoblog</a>";
            } else {
              echo "pictures tagged " . preg_replace('/_/', ' ', $section);
              
              // links to tags and photoblog
              echo "<br><a style='line-height: 25px;' href='/photography/blog/browse/tags'>back to tags</a> | <a style='line-height: 25px;' href='/photography/blog/$max'>back to photoblog</a><br>&nbsp;";
              
              // retrieve the photo ids associated with this tag
              $query = "SELECT photo_id FROM tag_relationships WHERE tag_id='$tagID' ORDER BY photo_id DESC";
              $result = mysql_query($query) or die(mysql_error());
              
              // open the ul
              echo '<ul>';
                while ($row = mysql_fetch_assoc($result)) {
                  $photo_id = $row['photo_id'];
                  
                  // add padding zeros to photo_id
                  switch (strlen($photo_id)) {
                    case 1:
                      $photo_id = '000' . $photo_id;
                      break;
                    case 2:
                      $photo_id = '00' . $photo_id;
                      break;
                    case 3;
                      $photo_id = '0' . $photo_id;
                      break;
                  }
                  
                  // get the photo's number
                  $numberQuery = "SELECT number FROM blog WHERE id='$photo_id' AND visible=1";
                  $numberResult = mysql_query($numberQuery) or die(mysql_error());
                  
                  // if there were no rows returned, the picture may not have been published
                  if (mysql_num_rows($numberResult) > 0) {
                    while ($numberRow = mysql_fetch_assoc($numberResult)) {
                      $photo_number = $numberRow['number'];
                    }
                    
                    // display the thumbnail
                    echo "<li><a href='/photography/blog/$photo_number'><img class='photoAllIMG' src='/media/photography/blog/thumbs/$photo_id.jpg' alt='$photo_number' height='75' width='75'></a></li>";
                  }
                }
              echo '</ul>';
            }
          }
          
        // close the centered content div
        echo '</div>';
        
        
        
        // =========================
        // = Navigation for Browse =
        // =========================
        function browseNavigation($minYear, $maxYear, $section){
          $outputString = '';

          // all pictures
          $outputString .= '<a ';
          if ($section == all) {
            $outputString .= 'class="on" ';
          }
          $outputString .= 'href="/photography/blog/browse">all</a> ';

          // link to each year
          while ($minYear <= $maxYear) {
            $outputString .= ' <a ';
            if ($section == $minYear) {
              $outputString .= 'class="on" ';
            }
            $outputString .= "href='/photography/blog/browse/$minYear'>$minYear</a> ";
            $minYear += 1;
          }
          
          // link to tags
          $outputString .= '<a ';
          if ($section == tags) {
            $outputString .= 'class="on" ';
          }
          $outputString .= 'href="/photography/blog/browse/tags">tags</a> ';

          return $outputString;
        }
      ?>
      <br>
      <br>
      <br>
    </div>
    <?php include('includes/googleAnalytics.php'); ?>
  </body>
</html>