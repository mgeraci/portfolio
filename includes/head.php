<?php
  // grab the title of the page from the outer scope: $title
  // grab the location (i.e., /bio.php) of the page from the outer scope: $location
  echo '
    <head>
      <title>' . $title . '</title>
      <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon">
      <meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1">
      <meta name="verify-v1" content="c3G4kM74qA6ztpDl/bE6D/t9pgqANYt17h1Xjs/b0q8=">';
      
      // page descriptions
      switch ($location) {
        case '/photography.php':
          echo '<meta name="description" content="Michael P. Geraci\'s photography portfolio - a photoblog and professional projects.">';
          break;
        case '/photobrowse.php':
          echo '<meta name="description" content="Michael P. Geraci\'s photography portfolio - a photoblog and professional projects.">';
          break;
        case '/grapic.php':
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
          echo '<meta name="description" content="Michael P. Geraci is a web designer and graphic designer working in New York, NY.">';
          break;
      }

      echo '<meta name="keywords" content="michael, geraci, michael geraci, michael p. geraci, oberlin, silkscreen, graphic design, recording, photography, web design, web, user experience, reducify">';

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

      // javascript
      if (preg_match('/michaelgeraci\.com/', $_SERVER['SERVER_NAME'] )){
        echo '<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.5/jquery.min.js"></script>
        <script type="text/javascript" src="/js/pack.js"></script>';
      } else {
        echo '<script type="text/javascript" src="/js/jquery1.5.min.js"></script>
        <script type="text/javascript" src="/js/unminified/jquery.hotkeys-0.8.js"></script>
        <script type="text/javascript" src="/js/unminified/audio_player.js"></script>
        <script type="text/javascript" src="/js/unminified/json.js"></script>
        <script type="text/javascript" src="/js/unminified/javascript.js"></script>';
      }

    echo '</head>
  ';

  // set the default timezone to handle places that use the date
  date_default_timezone_set('America/New_York');
?>