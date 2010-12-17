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
        <br>Michael P. Geraci is a multimedia artist, graphic designer, and photographer whose work at once conceptualizes the physical and makes tangible the conceptual. Playing on notions of the body, its possibilities and its constraints, his work traverses and transforms physical and conceptual space through music, video, and dance.
        <br>
        <br>Geraci holds a Bachelors in Music from Oberlin Conservatory, and is the co-founder of <a class="new-window" href="http://www.reducify.com">Reducify</a>, a New York based startup.
        <br>
        <br><a href="/media/documents/GeraciResume.pdf">Resume (PDF)</a>
        <br>I can be reached at <a href="mailto:mgeraci@gmail.com">&#109;&#103;&#101;&#114;&#97;&#99;&#105;&#64;&#103;&#109;&#97;&#105;&#108;&#46;&#99;&#111;&#109;.</a>
      </div>
      <div class="text">
        <h1>Last Updated: 11.13.10</h1>
        <br><a href="/photography/blog">New Photos</a>
        <br>New Web Designs: <a href="/web/ahmady">AhmadyArts.com</a> &amp; <a href="/web/petrus">PetrusLaw.com</a>
        <br>New Photography Project: <a href="/photography/vegan">What the Heck do Vegans Eat?</a>
        <br>
        <br><h1>Recent Updates:</h1>
        <br>New Photos: New York Hall of Science
        <br>New Web Design: <a href="/web/vegan">What The Heck Do Vegans Eat?</a>
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
