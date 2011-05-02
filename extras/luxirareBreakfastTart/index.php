<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html>
  <?php
    // // H E A D // //
    $title = 'Luxirare Breakfast Tart - Michael P. Geraci';

    // gets the location of the page and assigns it to $location
    // format is /page.php
    $location = $_SERVER['PHP_SELF'];

    include("../../includes/head.php");
  ?>
  <body>
    <div id="content">
      <?php
        // // M E N U // //
        include("../../includes/menu.php");
      ?>
      <div style="text-align: center">
        <img src="./1.jpg">
        <br>
        <br><img src="./2.jpg">
      </div>
    </div>
  </body>
</html>