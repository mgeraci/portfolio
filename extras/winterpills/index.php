<?php
  // // H E A D // //
  $title = 'Winterpills in Westchester';

  // gets the location of the page and assigns it to $location
  // format is /page.php
  $location = $_SERVER['PHP_SELF'];

  include("../../includes/head.php");
?>
  <style type='text/css'>
    #audio a, #audio img, #audio span{
      float: left;
    }

    #audio img{
      width: 100px;
    }

    #audio a{
      text-decoration: none;
      margin-left: 90px;
    }

    #audio a:hover, #audio a:active{
      text-decoration: none !important;
    }

    #audio span{
      text-align: left;
      font-size: 25px;
      position: relative;
      top: 25px;
    }

  </style>
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
        <div id='audio'>
          <a href='./winterpillz_flac.zip' onClick='_gaq.push(["_trackEvent", "Winterpills Audio", "flac"])'>
            <img src='./zip.png'>
            <span>
              Audio from the concert
              <br>flac - 456mb
            </span>
          </a>
          <a href='./winterpillz_mp3.zip' onClick='_gaq.push(["_trackEvent", "Winterpills Audio", "mp3"])'>
            <img src='./zip.png'>
            <span>
              Audio from the concert
              <br>192kbps mp3 - 122mb
            </span>
          </a>
        </div>
        <br>
        <br>
        <br>
        <br>
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
