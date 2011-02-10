<?php
  function thumbnailPages($type, $page, $max, $section) {
    // section isn't used in graphic, so if it's full, prepend a slash for the directory structure
    if ($section != '') {
      $section = "/$section";
    }
    
    echo '<div id="pageNav">';
      // number of pages
      $pages = ($max/12)-1;

      $pagesround = (ceil($pages));
      $from = $limit+1;
      $to = $from+11;
      $start = 0;  
      $thelimit = $limit+12;
      $themax = $max-1;
    
      if ($pagesround <= 11 && $pagesround > 0){  // // Page navigation when there are between 1 and 11 (inclusive) pages

        // Make Previous Page Link

        if ($page != 0) {
          $previousPage = $max - ( ($page - 1) * 12);
          echo "<a href='/$type$section/$previousPage'><< </a> ";
        } else {
          echo '<span class="gray"><< </span>';
        }

        // Make the Number Links

        while ($start <= $pagesround) {
          $pieceLink = $max - ($start * 12);
          echo '<a ';
          if($page == $start){
            echo 'class="on" ';
          }
          echo "href='/$type$section/$pieceLink'>";
          $start +=1;
          echo $start;
          echo '</a> ';
        }

        // Make Next Page Link

        if ($page != $pagesround) {
          $nextPage = $max - ( ($page + 1) * 12);
          echo "<a href='/$type$section/$nextPage'> >></a>";
        } else {
          echo '<span class="gray"> >></span>';
        }
      } elseif ($pagesround == 0) {  // // Page navigation when there is only one page
        echo '<span class="gray"><< 1 >></span>';
      } else {  // // Page navigation when there are more than 11 pages

        // Make Previous Page Link

        if ($page != 0) {
          $previousPage = $max - ( ($page - 1) * 12);
          echo "<a href='/$type$section/$previousPage'><< </a> ";
        } else {
          echo '<span class="gray"><< </span>';
        }


        // Make the Number Links

        // page one always displays

        echo '<a ';
        if($page == 0){
          echo 'class="on" ';
        }
        echo "href='/$type$section/$max'>1</a> ";

        if ($page >= 0 && $page < 6) {  // if you are on pages 0-4 (inclusive)
          $start = 1;
          while ($start <= 8) {
            $pieceLink = $max - ($start * 12);
            echo '<a ';
            if($page == $start){
              echo 'class="on" ';
            }
            echo "href='/$type$section/$pieceLink'>";
            $start += 1;
            echo $start;
            echo '</a> ';
          }
          echo '&hellip; ';
        } elseif ($page >= 6 && $page < ($pagesround - 4)) { // pages 5 to (max-5)
          echo '&hellip; ';
          $start = $page - 2;
          while ($start <= $page + 2) {
            $pieceLink = $max - ($start * 12);
            echo '<a ';
            if ($page == $start) {
              echo 'class="on" ';
            }
            echo "href='/$type$section/$pieceLink'>";
            $start +=1;
            echo $start;
            echo '</a> ';
          }
          echo '&hellip; ';
        } elseif ($page >= ($pagesround - 4)) {  // pages (max-4) to (max-1)
          echo '&hellip; ';
          $start = $pagesround - 7;
          while ($start <= $pagesround - 1) {
            $pieceLink = $max - ($start * 12);
            echo '<a ';
            if ($page == $start) {
              echo 'class="on" ';
            }
            echo "href='/photography$section/$pieceLink'>";
            $start +=1;
            echo $start;
            echo '</a> ';
          }
        }

        // the last page always displays

        echo '<a ';
        if($page == $pagesround){
          echo 'class="on" ';
        }
        echo "href='/$type$section/" . ($max - ($pagesround * 12)) . "'>" . ($pagesround + 1) . "</a> ";

        // Make Next Page Link

        if ($page != $pagesround) {
          $nextPage = $max - ( ($page + 1) * 12);
          echo "<a href='/$type$section/$nextPage'> >></a>";
        } else {
          echo '<span class="gray"> >></span>';
        }
      }
    echo '</div>';
  }

  // loop through the results of the query for thumnails per page
  function displayThumbs($type, $piece, $result, $section) {
    // section isn't used in graphic, so if it exists, prepend a slash for the directory structure
    if ($section != '') {
      $section = "/$section";
    }

    echo '<ul>';
      while ($row = mysql_fetch_row($result)){
        echo "<li><a href='/$type$section/$row[1]'><img";
        if ($piece == $row[1]) {
          echo ' class="on" ';
        }
        echo " src='/media/$type$section/thumbs/$row[0].jpg' alt='$row[0]' height='75' width='75'></a></li>";
      }
    echo '</ul>';
  }

  // left and right arrows for navigating through pictures
  function pictureArrows($type, $piece, $max, $section) {
    // section isn't used in graphic, so if it's full, prepend a slash for the directory structure
    if ($section != '') {
      $section = "/$section";
    }
    
    $piecePrev = $piece-1;
    $pieceNext = $piece+1;
    $pieceInverse = $max-$piece+1;
    
    echo '<div id="pictureArrows">';
      // Left Arrow
      if ($piece != $max) {
        echo "<a id='previous' class='arrow previous' href='/$type$section/$pieceNext'>previous image</a>";
        echo '<span style="float: left;">&nbsp;|&nbsp;</span>';
      } else {
        echo '<div class="arrow previousGray">no previous page</div><span style="float: left;">&nbsp;|&nbsp;</span>';
      }

      // Right Arrow
      if ($piece != 1) {
        echo "<a id='next' class='arrow next' href='/$type$section/$piecePrev'>next image</a>";
      } else {
        echo '<div class="arrow nextGray">no next page</div>';
      }
    echo '</div>';  
  }
  
  function imageLoader($type, $theId, $theWidth, $theHeight, $theTitle, $section){
    // hidden div to pass variables to the jQuery image loader
    echo "
      <div id='photoLoaderInfo' style='display: none;'>
        <span id='photoLoaderSiteSection'>$type</span>
        <span id='photoLoaderSection'>$section</span>
        <span id='photoLoaderID'>$theId</span>
        <span id='photoLoaderWidth'>$theWidth</span>
        <span id='photoLoaderHeight'>$theHeight</span>
        <span id='photoLoaderTitle'>$theTitle</span>
      </div>
    ";

    // the picture div, starts with class 'loading', jQuery adds the image
    echo "<div id='pictureDiv' class='loading' style='width: $theWidth" . "px; height: $theHeight" . "px;'></div>";
  }
?>