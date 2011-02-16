<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html>
  <?php
    // // H E A D // //
    $title = 'Michael P. Geraci - Bio/Resume';

    // gets the location of the page and assigns it to $location
    // format is /page.php
    $location = $_SERVER['PHP_SELF'];

    include("includes/head.php");
  ?>
  <body>
    <div id="content">
      <?php
        // // M E N U // //
        include("includes/menu.php");
      ?>
      <div class="text">
        <h1>Bio</h1>
        <br>I'm Michael P. Geraci, a web designer, user experience guy, and entrepreneur based in New York, NY. I have worked with a number of New York startups, and am the co-founder of <a href="http://www.reducify.com" class="new-window">Reducify</a>, a site that helps consumers find local appliances.
        <br>
        <br><a href="/media/documents/GeraciResume.pdf">Resume (PDF)</a>
        <br><a href="mailto:mgeraci@gmail.com">&#109;&#103;&#101;&#114;&#97;&#99;&#105;&#64;&#103;&#109;&#97;&#105;&#108;&#46;&#99;&#111;&#109;</a>
      </div>
      <div class="text">
        <h1>Last Updated: 2.13.11</h1>
        <br><a href="/web/life">New Web Design: Conway's Game of Life in jQuery/Canvas</a>
        <br><a href="/web/shoelaces">New Web Design: Shoelaces for Everything</a>
        <br><a href="/photography/blog">New Photos</a>
        <br>
        <br><h1>Recent Updates:</h1>
        <br>New Photography Project: <a href="/photography/vegan">What the Heck do Vegans Eat?</a>
        <br>New Graphic Design: YouWeb Logo
        <br>New Composition: Ascension, For Organ and Tape
        <br>
        <br>
        <br>This website and its contents are &copy; Michael P. Geraci, 2006-<?php echo date("Y") ?>
      </div>
    </div>
    <?php include('includes/googleAnalytics.php'); ?>
  </body>
</html>
