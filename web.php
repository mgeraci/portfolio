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
      $description = $row['description'];
      $subtitle = $row['subtitle'];
      $year = $row['year'];
      $link = $row['link'];
      $url = $row['url'];
    }

    // set the base title
    $title = "Michael P. Geraci - Web Design";

    // append the title if there's a piece selected
    if ($piece) {
      $title .= " - $name";
    }

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
      ?>
      <div id="pageWeb">
        <div id="pieceList">
          <ul>
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
                <?php
                  // add highlight class if current page
                  $class = $listRow['shortname'] == $piece ? 'on' : '';
                ?>
                <?php if ($listRow['link']) { // link to an internal page ?>
                  <a href="/web/<?php echo $listRow['shortname']; ?>" class="<?php echo $class; ?>">
                <?php } elseif (!$listRow['link'] && $listRow['url']) { // link to an external page ?>
                  <a href="<?php echo $listRow['url']; ?>" class="new-window">
                <?php } ?>
                  <h1><?php echo $listRow['name']; ?>, <?php echo $listRow['year']; ?></h1>
                  <br><?php echo $listRow['description']; ?>
                <?php if ($listRow['link']) { ?>
                  </a>
                <?php } ?>
              </li>
            <?php } ?>
          </ul>
        </div>
        <div id="pieceContent">
          <?php if ($piece) { ?>
            <?php
              // title
              if ($url) {
                echo "<a class='new-window webTitle' href='$url'>";
              } else {
                echo "<h1>";
              }

              echo "$name, $year";
            
              if ($url) {
                echo "</a>";
              } else {
                echo "</h1>";
              }
              
              // subtitle, if it exists
              if ($subtitle) {
                echo "<br>$subtitle";
              }

              echo "<br><br>";
              
              $dirname = getenv("DOCUMENT_ROOT") . "/media/web/$piece";

              // content
              $i = 1;
              if ($handle = opendir($dirname)) {
                // the correct way to loop over the directory
                while (false !== ($file = readdir($handle))) {
                  // skip . files
                  if ($file != "." && $file != ".." && $file != '.DS_Store') {
                    // print the image
                    if ($url) {
                      echo "<a class='new-window' href='$url'>";
                    }
                    $name = htmlspecialchars($name, ENT_QUOTES);
                    echo "<img src='/media/web/$piece/$file' alt='$name Screenshot $i'>";
                    if ($url) {
                      echo "</a>";
                    }
                    
                    // increment the counter
                    $i++;
                  }
                }

                closedir($handle);
              }

              // visit link, if there's a url
              if ($url) {
                echo "<br><a class='new-window' href='$url'>Visit the site</a>";
              }
            ?>
          <?php } ?>
        </div>
        <br>
        <br>
        <br>
      </div>
      <div class='pieceBottomSpacer'>&nbsp;</div>
    </div>
    <?php include('includes/googleAnalytics.php'); ?>
  </body>
</html>