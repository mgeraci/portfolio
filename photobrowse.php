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
            
            $query = "SELECT * FROM `tags` ORDER BY tag ASC";
            
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

            echo "<div id='allTags'>";
              // Display Tag Names
              while ($row = mysql_fetch_row($result)){
                // put the pictures tagged with this tag in an array
                $pictures = explode(',', $row[2]);

                $i = 0;

                // for each picture <= max, increment i
                foreach ($pictures as $key => $value) {
                  if ($value <= $maxId) {
                    $i++;
                  }
                }

                // don't show tags with a zero count
                if ($i > 0) {
                  echo "<a class='tagCount$i' href='/photography/blog/browse/$row[1]'>" . preg_replace('/_/', ' ', $row[1]) . '<a> ';
                }
              }

            echo "</div>";

          // ==================
          // = A specific tag =
          // ==================
          } else {
            $tag = mysql_real_escape_string($section);
            
            $query = "SELECT pictures FROM `tags` WHERE tag='$tag'";
            
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
            
            // if there are no matching tags
            if (mysql_num_rows($result) == 0) {
              echo "no pictures matched $section<br><a style='line-height: 25px;' href='/photography/blog/browse/tags'>back to tags</a> | <a style='line-height: 25px;' href='/photography/blog/$max'>back to photoblog</a>";
            } else {
              // if it's not all, and it's not numeric, than it's a tag
              echo "pictures tagged " . preg_replace('/_/', ' ', $section);

              // link to the current picture
              echo "<br><a style='line-height: 25px;' href='/photography/blog/browse/tags'>back to tags</a> | <a style='line-height: 25px;' href='/photography/blog/$max'>back to photoblog</a><br>&nbsp;";

              // Display Thumbnails
              while ($row = mysql_fetch_row($result)){
                // assign the results to a variable
                $pictures = $row[0];
              }
              
              // remove a trailing comma from $pictures
              $pictures = preg_replace('/,$/', '', $pictures);
              
              // make the variable into an array
              $pictures = explode(',', $pictures);
              
              // open the ul
              echo '<ul>';
                // for each picture
                foreach ($pictures as $key => $value) {
                  $current = $pictures[$key];
                  
                  $query = "SELECT `number` FROM `blog` WHERE id=$current";
                  
                  $result = mysql_query($query) or die(mysql_error());
                  
                  while ($row = mysql_fetch_assoc($result)) {
                    $number = $row[0];
                  }
                  
                  // only show the thumbnail if the id is <= the current photo's id
                  if ($current <= $maxId) {
                    echo "<li><a href='/photography/blog/$number'><img class='photoAllIMG' src='/media/photography/blog/thumbs/$current.jpg' alt='$current' height='75' width='75'></a></li>";
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