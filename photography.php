<?php
  $section = $_GET['section'];

  // // H E A D // //
  $title = 'Michael P. Geraci';

  switch ($section) {
    case 'blog':
      // get the variables from the url
      if (is_numeric($_GET["piece"])) {
        $piece = $_GET["piece"];
      }
      
      $title .= " - Photoblog $piece";

      // echo the rss link
      echo '<link rel="alternate" type="application/rss+xml" title="Michael P. Geraci - Photoblog RSS" href="http://feeds.feedburner.com/mpgPhotoblog" />';
      break;
    case 'vegan':
      $title .= ' - Photography - What the Heck do Vegans Eat?';
      break;
    case 'dantes':
      $title .= ' - Photography - Dante\'s Southern Cuisine';
      break;
    case 'ksklookbook08':
      $title .= ' - Photography - KillShopKill 2008 Lookbook';
      break;
  }

  // gets the location of the page and assigns it to $location
  // format is /page.php
  $location = $_SERVER['PHP_SELF'];

  include("includes/head.php");
  
  include('includes/galleryFunctions.php');
?>
  <body>
    <div id="content">
      <?php
        // // M E N U // //
        // gets the location of the page and assigns it to $location
        // format is /page.php
        $location = $_SERVER['PHP_SELF'];
        include("includes/menu.php");
      ?>
      <div id="pagePhotography">
        <?php
          // // // Connect to database // // //
          include('includes/connect.php');

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

          // // // Display list of sections if no piece is selected // // //
          if (!$section) {
        ?>
          <div id="pieceList">
            <ul>
              <li>
                <a href="/photography/blog/<?php echo $max ?>">
                  <h1>Photoblog, 2007-<?php echo date("Y"); ?></h1>
                  <br>A camera by my side at all times.
                </a>
              </li>
              <li>
                <a href="/photography/vegan/13">
                  <h1>What the Heck do Vegans Eat?, 2010</h1>
                  <br>Delicious food shots for a daily vegan blog.
                </a>
                <br>&nbsp;&nbsp;&nbsp;&nbsp;<a class="new-window" href="http://vegan.katherineerickson.com">Visit <i>What the Heck do Vegans Eat?</i></a>
              </li>
              <li>
                <a href="/photography/dantes/12">
                  <h1>Dante's Southern Cuisine, 2008</h1>
                  <br>Publicity photos for a new restaurant in Williamsburg, Brooklyn. The owners requested a variety of shots of their multifaceted space as well as exterior and food shots.
                </a>
                <br>&nbsp;&nbsp;&nbsp;&nbsp;<a class="new-window" href="http://www.dantesonehope.com">Visit Dante's Southern Cuisine</a>
              </li>
              <li>
                <a href="/photography/ksklookbook08/13">
                  <h1>Kill Shop Kill Lookbook, 2008</h1>
                  <br><span>Promotional photographs to be used in clothing brand Kill Shop Kill's summer 2008 lookbook. Shooting on site at a brand party in downtown NYC provided a challenge, and resulted in some interesting situations.</span>
                </a>
                <br>&nbsp;&nbsp;&nbsp;&nbsp;<a class="new-window" href="http://www.killshopkill.com/wordpress">Visit Kill Shop Kill</a>
              </li>
            </ul>
          </div>
        <?php
          } else if ($section && $section == 'blog' || $section == 'ksklookbook08' || $section == 'vegan' || $section == 'dantes') {
            // get the variables from the url
            $piece = $_GET["piece"];

            // set the maximum pictures for the static sections
            if ($section == 'dantes'){
              $max = 12;
            } else if ($section == 'ksklookbook08') {
              $max = 13;
            } else if ($section == 'vegan'){
              $max = 13;
            } else {
              $max = $max;
            }

            // if there's no piece, set it to max
            if (!$piece) {
              $piece = $max;
            }

            // get the page number based on the piece number, subtract 1 because they start with 0
            $page = ceil(($max + 1 - $piece)/12) - 1;
            $limit = $page*12;

            // // // Thumbnail Section // // //

            echo '<div id="galleryThumbs">';
              // validate input
              if (is_numeric($page) && $page >= 0 && $page < ($max/12)) {
                $query = "SELECT id, number FROM $section WHERE visible=1 ORDER BY number DESC LIMIT $limit, 12";  // retrieve thumbnails based on section and page

                if ($query) {
                  $result = mysql_query($query);
                  if (!$result) {
                    echo 'Could not run query: ' . mysql_error();
                    exit;
                  }
                }

              } else {
                echo 'Please click <a href="/photography">here</a> to return to Photography';
                exit;
              }

              // Thumbnail Page Navigation
              thumbnailPages('photography', $page, $max, $section);

              // Display Thumbnails
              displayThumbs('photography', $piece, $result, $section);

            echo '</div>';

            // // // Content // // //

            if (is_numeric($piece) && $piece > 0 && $piece <= $max) {  // validate input

              // Get picture info and assign to variables
              $query = "SELECT id, title, year, width, height FROM $section WHERE number=$piece";

              if ($query) {
                $result = mysql_query($query);
                if (!$result) {
                  echo 'Could not run query: ' . mysql_error();
                  exit;
                }
              }

              while ($row = mysql_fetch_assoc($result)){
                $theId = $row["id"];
                $theTitle = $row["title"];
                $theYear = $row["year"];
                $theWidth = $row["width"];
                $theHeight = $row["height"];
              }

              echo '<div id="galleryContent" style="width: ' . $theWidth . 'px;">';
                // left and right arrows
                pictureArrows('photography', $piece, $max, $section);

                // Photoblog Navigation

                if ($section == blog) {
                  echo '<div id="photoblogNav">';
                    echo '
                      <a class="rss" href="http://feeds.feedburner.com/mpgPhotoblog">subscribe via rss</a>
                      <span>
                        <a ';
                        if ($piece == $max) {
                          echo 'class="on" ';
                        }
                        echo "href='/photography/blog/$max'>current</a> | <a href='/photography/blog/browse'>browse</a>
                      </span>
                    ";
                  echo '</div>';
                }

                // The picture
                imageLoader('photography', $theId, $theWidth, $theHeight, $theTitle, $section);

                // tags section, only if photoblog
                if ($section == 'blog') {
                  // get the tag ids associated with this photo
                  $query = "SELECT tag_id FROM tag_relationships WHERE photo_id=$theId";
                  $result = mysql_query($query) or die(mysql_error());
                  
                  $tag_array = array();
                  
                  while ($row = mysql_fetch_assoc($result)) {
                    array_push($tag_array, $row['tag_id']);
                  }
                  
                  $tag_name_array = array();
                  
                  foreach ($tag_array as $tag_id) {
                    // get the tag's name
                    $query = "SELECT tag FROM tags WHERE id=$tag_id";
                    $result = mysql_query($query) or die(mysql_error());
                    
                    while ($row = mysql_fetch_assoc($result)) {
                      $link = "<a href='/photography/blog/browse/" . $row['tag'] . "'>" . preg_replace('/_/', ' ', $row['tag']) . "</a>";
                      
                      array_push($tag_name_array, $link);
                    }
                  }

                  // the info for the picture
                  echo '<div id="pictureInfo">';
                    echo $theTitle . '<br><i>' . $theYear . '</i><br><span id="tags">tags: ' . implode(', ', $tag_name_array) . '</span>';
                  echo '</div>';
                } else {
                  // the info for the picture
                  echo '<div id="pictureInfo">';
                    echo $theTitle . '<br><i>' . $theYear . '</i>';
                  echo '</div>';
                }

              echo '</div>';

            } else {
              echo '
                <div id="pieceContent">
                  <br><br><span id="clickThumbnail">Please Click a Thumbnail to the Left</span>
                </div>
              ';
            }
          } else {
            echo 'Please click <a href="/photography">here</a> to return to Photography';
            exit;
          }
        ?>
        <br>
        <br>
        <br>
      </div>
    </div>
    <?php include('includes/googleAnalytics.php'); ?>
  </body>
</html>