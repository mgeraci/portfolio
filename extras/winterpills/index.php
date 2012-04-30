<?php
  // // H E A D // //
  $title = 'Winterpills in Westchester';

  // gets the location of the page and assigns it to $location
  // format is /page.php
  $location = $_SERVER['PHP_SELF'];

  include("../../includes/head.php");
?>
  <body>
    <div id="menuWrapper" class="wrapOut">
      <div class="wrapIn">
        <?php
          // // M E N U // //
          include("../../includes/menu.php");
        ?>
      </div>
    </div>
    <div id="contentWrapper" class="wrapOut">
      <div class="wrapIn">
        <h2>I know you don't care, but here are</h2>
        <h1>My Favorite Albums of 2011</h1>
        <div id='thanks'>
          that's it. thanks for reading.
          <br>complain via <a href='mailto:mgeraci@gmail.com'>email</a> or <a href='http://twitter.com/mgeraci' target='_blank'>twitter</a>.
        </div>
      </div>
    </div>
    <?php include('../../includes/googleAnalytics.php'); ?>
  </body>
</html>
