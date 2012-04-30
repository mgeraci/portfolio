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
      <div class="wrapIn" style='text-align:center;width:960px;'>
        <h1>Winterpills in Westchester</h1>
        <br>
        <br>
        <img src='/extras/winterpills/winterpills_geraci_1.jpg'>
        <br>
        <br>
        <img src='/extras/winterpills/winterpills_geraci_2.jpg'>
        <br>
        <br>
        <img src='/extras/winterpills/winterpills_geraci_3.jpg'>
        <br>
        <br>
        <img src='/extras/winterpills/winterpills_geraci_4.jpg'>
        <br>
        <br>
        <img src='/extras/winterpills/winterpills_geraci_5.jpg'>
        <br>
        <br>
        <img src='/extras/winterpills/winterpills_geraci_6.jpg'>
      </div>
    </div>
    <?php include('../../includes/googleAnalytics.php'); ?>
  </body>
</html>
