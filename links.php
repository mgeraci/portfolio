<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html>
  <?php
    // // H E A D // //
    $title = 'Michael P. Geraci - Links';

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
      <div class="linksText" style="width: 300px;">
        <h1>Institutions and Affiliations:</h1>
        <br>
        <br><a class="new-window" href="http://timara.con.oberlin.edu/">Oberlin Conservatory: TIMARA</a>
        <br><a class="new-window" href="http://www.oberlin.edu">Oberlin College/Conservatory</a>
        <br><a class="new-window" href="http://www.horacemann.org/">Horace Mann</a>
      </div>
      <div class="linksText" style="width: 550px;">
        <h1>Steel Drum Performances that Michael has taken part in:</h1>
        <br>
        <br><a class="new-window" href="http://vimeo.com/16149060">Pan Sonatas, New York - Battle Zone (2010)</a>
        <br><a class="new-window" href="http://vimeo.com/6826668">Pan Sonatas, New York - Bandoleros (2009)</a>
        <br><a class="new-window" href="http://www.youtube.com/watch?v=CsayTC-V8VU">Pan Sonatas, New York - The Ten Commandments of Pan (2008)</a>
        <br><a class="new-window" href="http://www.youtube.com/watch?v=qWFmbXErjpA">Pan Sonatas, New York - Pan Lamentation (2007)</a>
        <br><a class="new-window" href="http://vimeo.com/23268333">Pan Sonatas, New York - This One's for You, Bradley (2006)</a>
        <br>Pan Sonatas, New York - From Beyond (2005)
        <br><a class="new-window" href ="http://vimeo.com/7625432">Trinidad All-Stars, Trinidad &amp; Tobago - Free Up (2005)</a>
        <br><a class="new-window" href="http://www.youtube.com/watch?v=aTUMlF9Zt3E">Sforzata Steel Orchestra, Trinidad &amp; Tobago - Dingolay (2005)</a>
        <br><a class="new-window" href="http://www.youtube.com/watch?v=FXB0WFiBom0">Pan Sonatas, New York - War 2004 (2004)</a>
      </div>
    </div>
    <?php include('includes/googleAnalytics.php'); ?>
  </body>
</html>