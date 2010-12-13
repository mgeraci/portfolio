<?php
  // if no error, redirect home
  if (!$_GET['error']) {
    header('Location: http://' . $_SERVER['SERVER_NAME']);
  } else {
    $error = $_GET['error'];
  }
  
  // set the info
  switch ($error) {
    case '404':
      $title = '404 Page Not Found';
      $subtitle = '404 - Page Not Found';
      $content = "
        Sorry, but the page that you are trying to access doesn't seem to exist. It may have moved, in which case you may want to try <a href='/'>going to the home page</a> and trying to find it from there.
        <br>
        <br>It could be my fault too! If you think that's the case, please <a href='mailto: mgeraci@gmail.com'>tell me what went wrong</a>!
      ";
      break;
    case '403':
      $title = '403 Directories Cannot Be Listed';
      $subtitle = '403 - Directories Cannot Be Listed';
      $content = "
        You are not allowed to browse the contents of directories. If you're looking for something in particular, try <a href='/'>going to the home page</a> and trying to find it from there.
      ";
      break;
    case '401':
      $title = '401 Authorization Required';
      $subtitle = '401 - Authorization Required';
      $content = "
        You are trying to access a page that requires authorization. You probably shouldn't be, but if this is an unexpected error, <a href='mailto: mgeraci@gmail.com'>let me know about it</a>.
      ";
      break;
    case '400':
      $title = '400 Bad Request';
      $subtitle = '400 - Bad Request';
      $content = "
        Your browser sent something weird. It could be your computer, but I'd love to know what's going on. Please <a href='mailto: mgeraci@gmail.com'>let me know what happened</a>.
      ";
      break;
    case '500':
      $title = '500 Internal Server Error';
      $subtitle = '500 - Internal Server Error';
      $content = "
        Oh no! Something went wrong. You should try what you were doing again, and if it doesn't work, <a href='mailto: mgeraci@gmail.com'>tell me what happened and what you were doing when it broke</a>.
      ";
      break;
  }
?>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html>
  <?php
    // // H E A D // //
    $title = 'Michael P. Geraci - ' . $title;
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
      <div class="linksText">
        <h1><?php echo $subtitle; ?></h1>
        <br><?php echo $content; ?>
      </div>
      <script type="text/javascript">
      var gaJsHost = (("https:" == document.location.protocol) ? "https://ssl." : "http://www.");
      document.write(unescape("%3Cscript src='" + gaJsHost + "google-analytics.com/ga.js' type='text/javascript'%3E%3C/script%3E"));
      </script>
      <script type="text/javascript">
      try {
      var pageTracker = _gat._getTracker("UA-8480724-2");
      pageTracker._trackPageview();
      } catch(err) {}</script>
  </body>
</html>