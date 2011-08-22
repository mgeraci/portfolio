<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html>
  <?php
    // Connect to database
    include('includes/connect.php');
    
    // get and clean the input
    $piece = mysql_real_escape_string($_GET['piece']);
    
    $query = "SELECT * FROM web WHERE shortname='$piece'";
    $result = mysql_query($query);
    if (!$result) {
      echo 'Could not run query: ' . mysql_error();
      exit;
    }
    
    while ($row = mysql_fetch_assoc($result)) {
      $name = $row['name'];
      $tech = $row['tech'];
      $subtitle = $row['subtitle'];
      $year = $row['year'];
      $images = $row['images'];
      $url = $row['url'];
    }
    
    // if there's a piece and there's a name, then the sql query was successful - set a flag to show piece stuff
    $viewing = ($piece && $name) ? true : false;
    
    // set the base title
    $title = "Michael P. Geraci - Web Design";
    
    // append the title if there's a piece selected
    if ($viewing) {
      $title .= " - $name";
    }
    
    // gets the location of the page and assigns it to $location
    // format is /page.php
    $location = $_SERVER['PHP_SELF'];
    
    include("includes/head.php");
  ?>
  <script type="text/javascript">
    // set the opacity of the list to 1 if you're not viewing a piece explicitly for firefox
    firefoxWeb = function(){
      if ($('#piece').html() == '') {
        // set the opacity
        $('#pieceList ul').css('opacity', 1);
        
        // set the container width
        $('#pieceListContainer').css('width', 330)
      }
    }
  </script>
  <body onpageshow="firefoxWeb();">
    <div id="content">
      <?php
        // // M E N U // //
        // gets the location of the page and assigns it to $location
        // format is /page.php
        $location = $_SERVER['PHP_SELF'];
        include("includes/menu.php");
      ?>
      <span id="piece" style="display: none;"><?php echo $piece; ?></span>
      <span id="name" style="display: none;"><?php echo $name; ?></span>
      <div id="pageWeb">
        <div id="pieceContent"><?php // content comes before list on this page to set stacking order correctly ?>
          <?php if ($viewing) { ?>
            <?php
              // title
              if ($url) {
                echo "<a class='new-window webTitle' href='$url'>$name, $year</a>";
              } else {
                echo "<h1>$name, $year</h1>";
              }

              // subtitle, if it exists
              if ($tech) {
                echo "<br>$tech";
              }

              // subtitle, if it exists
              if ($subtitle) {
                echo "<br>$subtitle";
              }

              echo "<br><br>";

              // append the navigation if more than one image
              if ($images > 1) {
                echo "<a class='arrow previous' href='#' id='previous'>previous</a><span id='webCountWrapper'><span id='current'>1</span>/<span id='images'>$images</span></span><a class='arrow next' href='#' id='next'>next</a><br>";
              }

              // append the image container
              echo "<div id='webImage' class='loading'></div>";

              // visit link, if there's a url
              if ($url) {
                echo "<br><a class='new-window' href='$url'>Visit the site</a>";
              }
            ?>
          <?php } ?>
        </div>
        <div id="pieceListContainer" <?php if ($viewing) {echo 'class="collapsed"';} ?>>
          <div id="pieceList">
            <ul <?php if ($viewing) {echo 'class="listLoad"';} ?>>
              <?php
                // query to get all the pieces
                $listQuery = "SELECT * FROM web ORDER BY sort DESC";
                $listResult = mysql_query($listQuery);
                if (!$listResult) {
                  echo 'Could not run query: ' . mysql_error();
                  exit;
                }
              ?>
              <?php while ($listRow = mysql_fetch_assoc($listResult)) { ?>
                <li>
                  <a href="/web/<?php echo $listRow['shortname']; ?>" class="<?php echo $class; ?>">
                    <h1><?php echo $listRow['name']; ?>, <?php echo $listRow['year']; ?></h1>
                    <br><?php echo $listRow['description']; ?>
                  </a>
                </li>
              <?php } ?>
              <li>
                <h1>This Website, 2006-Present</h1>
                <br>100% valid hand-coded PHP and jQuery
              </li>
            </ul>
          </div>
          <div id="webFade" <?php if ($viewing) {echo 'class="collapsed" style="background: url(/images/webFade.png) 0 0 repeat-y;"';} ?>></div>
          <a href="#" id="webToggle" <?php if ($viewing) {echo 'style="display: block;"'; } ?>>
            <div id="webOverlay">
              <div class="outer">
                <div class="inner <?php echo ($viewing) ? 'expand off' : 'contract off' ?>">click</div>
              </div>
            </div>
          </a>
        </div>
      </div>
      <div class='pieceBottomSpacer'>&nbsp;</div>
    </div>
    <?php include('includes/googleAnalytics.php'); ?>
  </body>
</html>