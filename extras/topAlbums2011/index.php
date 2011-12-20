<?php
  // // H E A D // //
  $title = 'Michael P. Geraci - My Top Albums of 2011';
  
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
        <h1>My Top Records of 2011</h1>
        <ul id='albums'>
          <li>
            <span class='count'>1</span>
            <img src=''>
            <div class='content'></div>
          </li>
          <li>
            <span class='count'>2</span>
            <img src=''>
            <div class='content'></div>
          </li>
          <li>
            <span class='count'>3</span>
            <img src=''>
            <div class='content'></div>
          </li>
          <li>
            <span class='count'>4</span>
            <img src=''>
            <div class='content'></div>
          </li>
          <li>
            <span class='count'>5</span>
            <img src=''>
            <div class='content'></div>
          </li>
          <li>
            <span class='count'>6</span>
            <img src=''>
            <div class='content'></div>
          </li>
          <li>
            <span class='count'>7</span>
            <img src=''>
            <div class='content'></div>
          </li>
        </ul>
        <div id='thanks'>
          that's it. thanks for reading.
          <br>complain via <a href='mailto:mgeraci@gmail.com'>email</a> or <a href='http://twitter.com/mgeraci' target='_blank'>twitter</a>.
          <br>
          <br>made with some love, but mostly spite and snobbery, by michael p. geraci
        </div>
      </div>
    </div>
    <?php include('../../includes/googleAnalytics.php'); ?>
  </body>
</html>