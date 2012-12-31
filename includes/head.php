<?php
  // grab the title of the page from the outer scope: $title
  // grab the location (i.e., /bio.php) of the page from the outer scope: $location
?>
<!DOCTYPE html>
  <html lang="en">
    <head>
      <title><?php echo $title; ?></title>
      <meta charset="utf-8">
      <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon">
      <meta name="verify-v1" content="c3G4kM74qA6ztpDl/bE6D/t9pgqANYt17h1Xjs/b0q8=">
      <?php
        // page descriptions
        switch ($location) {
          case '/photography.php':
            echo '<meta name="description" content="Michael P. Geraci\'s photography portfolio - a photoblog and professional projects.">';
            break;
          case '/photobrowse.php':
            echo '<meta name="description" content="Michael P. Geraci\'s photography portfolio - a photoblog and professional projects.">';
            break;
          case '/graphic.php':
            echo '<meta name="description" content="Michael P. Geraci\'s graphic design portfolio - silkscreen design and printing, logo design.">';
            break;
          case '/recordings.php':
            echo '<meta name="description" content="Michael P. Geraci\'s recording portfolio - digital recording in Pro Tools.">';
            break;
          case '/web.php':
            echo '<meta name="description" content="Michael P. Geraci\'s web design portfolio - web apps, user experience.">';
            break;
          case '/composition.php':
            echo '<meta name="description" content="Michael P. Geraci\'s composition portfolio - electronic composition and multimedia performance.">';
            break;
          default:
            echo '<meta name="description" content="Michael P. Geraci is a web and user experience designer working in New York, NY.">';
            break;
        }

        // meta keywords
        echo '<meta name="keywords" content="michael, geraci, michael geraci, michael p. geraci, web design, web, user experience, ux design, photography, graphic design, recording">';

        // css
        if (preg_match('/michaelgeraci\.com/', $_SERVER['SERVER_NAME'] )) {
          echo '<link rel="stylesheet" type="text/css" href="/style/style.css">
          <!--[if lt IE 7]><link rel="stylesheet" type="text/css" href="/style/ielt7.css"><![endif]-->
          <!--[if IE 7]><link rel="stylesheet" type="text/css" href="/style/ie7.css"><![endif]-->
          <!--[if IE 8]><link rel="stylesheet" type="text/css" href="/style/ie8.css"><![endif]-->';
        } else {
          echo '<link rel="stylesheet" type="text/css" href="/style/style.css">
          <!--[if lt IE 7]><link rel="stylesheet" type="text/css" href="/style/unminified/ielt7.css"><![endif]-->
          <!--[if IE 7]><link rel="stylesheet" type="text/css" href="/style/unminified/ie7.css"><![endif]-->
          <!--[if IE 8]><link rel="stylesheet" type="text/css" href="/style/unminified/ie8.css"><![endif]-->';
        }


        // extra stylesheets
        if ($location == '/extras/favoriteAlbums2011/index.php') {
          echo '<link type="text/css" rel="stylesheet" href="extras/favoriteAlbums2011/stylesheets/style.css">';
        }

        if ($location == '/extras/favoriteAlbums2012/index.php') {
          echo '<link type="text/css" rel="stylesheet" href="extras/favoriteAlbums2012/stylesheets/style.css">';
        }

        // javascript
        if (preg_match('/michaelgeraci\.com/', $_SERVER['SERVER_NAME'] )){
          echo '<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.5/jquery.min.js"></script>';
          if ($location != '/extras/favoriteAlbums2011/index.php' && $location != '/extras/favoriteAlbums2012/index.php') {
            echo '<script type="text/javascript" src="/js/pack.js"></script>';
          }
        } else {
          echo '<script type="text/javascript" src="/js/jquery1.5.min.js"></script>
          <script type="text/javascript" src="/js/unminified/jquery.hotkeys-0.8.js"></script>';
          if ($location != '/extras/favoriteAlbums2011/index.php' && $location != '/extras/favoriteAlbums2012/index.php') {
            echo '<script type="text/javascript" src="/js/unminified/audio_player.js"></script>';
          }
          echo '<script type="text/javascript" src="/js/unminified/json.js"></script>
          <script type="text/javascript" src="/js/unminified/javascript.js"></script>';
        }

        // extras javascripts
        if ($location == '/extras/favoriteAlbums2011/index.php') {
          echo '<script type="text/javascript" src="/extras/favoriteAlbums2011/javascripts/audioplayer.js"></script>';
          echo '<script type="text/javascript" src="/extras/favoriteAlbums2011/javascripts/application.js"></script>';
        }

        if ($location == '/extras/favoriteAlbums2012/index.php') {
          echo '<script type="text/javascript" src="/extras/favoriteAlbums2012/javascripts/audioplayer.js"></script>';
          echo '<script type="text/javascript" src="/extras/favoriteAlbums2012/javascripts/application.js"></script>';
        }

        // set the default timezone to handle places that use the date
        date_default_timezone_set('America/New_York');
      ?>
    </head>
