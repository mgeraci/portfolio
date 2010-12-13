<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html>
  <?php
    $piece = $_GET['piece'];

    // // H E A D // //
    $title = 'Michael P. Geraci - Web Design';

    switch ($piece) {
      case 'ahmady':
        $title .= ' - Ahmady Arts';
        break;
      case 'petrus':
        $title .= ' - Paul D. Petrus, Jr.';
        break;
      case 'gotham':
        $title .= ' - Gotham Energy App';
        break;
      case 'vegan':
        $title .= ' - What the Heck do Vegans Eat?';
        break;
      case 'almanac':
        $title .= ' - The Almanac';
        break;
      case 'foxNSox':
        $title .= ' - FoxNSox';
        break;
      case 'roadkill':
        $title .= ' - Roadkill Across America';
        break;
      case 'doctoroff':
        $title .= ' - Julia Doctoroff';
        break;
      case 'vogl':
        $title .= ' - Julia Vogl';
        break;
    }

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
      <div id="pageWeb">
        <div id="pieceList">
          <ul>
            <li>
              <a <?php if ($piece == 'ahmady') echo 'class="on"'?> href="/web/ahmady">
                <h1>AhmadyArts, 2010</h1>
                <br>An arts organization and curator specializing in Central Asian art. Image galleries, slideshows, and blog</span>
              </a>
            </li>
            <li>
              <a <?php if ($piece == 'petrus') echo 'class="on"'?> href="/web/petrus">
                <h1>The Law Office of Paul D. Petrus Jr., 2010</h1>
                <br>A New York based criminal defense lawyer.</span>
              </a>
            </li>
            <li><a <?php if ($piece == 'gotham') echo 'class="on"'?> href="/web/gotham">
              <h1>Gotham Energy App, 2010</h1>
              <br>A site that helps New Yorkers track their electricity consumption. JSON and Google charts, custom jQuery table sorting</span>
              </a>
            </li>
            <li>
              <a <?php if ($piece == 'vegan') echo 'class="on"'?> href="/web/vegan">
                <h1>What The Heck Do Vegans Eat?, 2010</h1>
                <br>Custom WordPress theme and PHP plugins, jQuery popups and auto-complete</span>
               </a>
            </li>
            <li>
              <a <?php if ($piece == 'almanac') echo 'class="on"'?> href="/web/almanac">
                <h1>The Almanac, 2009</h1>
                <br>A web app which helps you take control of your role in climate change</span>
              </a>
            </li>
            <li>
              <a <?php if ($piece == 'foxNSox') echo 'class="on"'?> href="/web/foxNSox">
                <h1>FoxNSox.com, 2009</h1>
                <br>A site for a San Francisco based computer and iPhone developer</span>
               </a>
              </li>
            <li>
              <a <?php if ($piece == 'roadkill') echo 'class="on"'?> href="/web/roadkill">
                <h1>Roadkill Across America, 2009</h1>
                <br>An art project tracking roadkill across the Southern United States</span>
              </a>
            </li>
            <li>
              <a <?php if ($piece == 'doctoroff') echo 'class="on"'?> href="/web/doctoroff">
                <h1>Julia Doctoroff's Portfolio, 2008</h1>
                <br>The work of a contemporary New York writer</span>
              </a>
            </li>
            <li>
              <a <?php if ($piece == 'vogl') echo 'class="on"'?> href="/web/vogl">
                <h1>Julia Vogl's Portfolio, 2007</h1>
                <br>The work of a New York based public artist</span>
              </a>
            </li>
            <li>
              <h1>And of course, this website, 2006-<?php echo date("Y") ?></h1>
              <br>100% valid hand-coded php and jQuery</span>
              </li>
          </ul>
        </div>
          <?php if ($piece == 'ahmady') { ?>
            <div id="pieceContent">
              <a class="new-window webTitle" href="http://www.petruslaw.com">AhmadyArts, 2010</a>
              <br>&nbsp;
              <br>
              <a class="new-window" href="http://www.ahmadyarts.com"><img src="/media/web/ahmady/ahmady5.jpg" alt="AhmadyArts Screenshot 5"></a>
              <a class="new-window" href="http://www.ahmadyarts.com"><img src="/media/web/ahmady/ahmady3.jpg" alt="AhmadyArts Screenshot 3"></a>
              <a class="new-window" href="http://www.ahmadyarts.com"><img src="/media/web/ahmady/ahmady2.jpg" alt="AhmadyArts Screenshot 2"></a>
              <a class="new-window" href="http://www.ahmadyarts.com"><img src="/media/web/ahmady/ahmady4.jpg" alt="AhmadyArts Screenshot 4"></a>
              <br>
              <br><a class="new-window" href="http://www.gothamenergyapp.com">Visit the site</a>
            </div>            
          <?php } else if ($piece == 'petrus') { ?>
            <div id="pieceContent">
              <a class="new-window webTitle" href="http://www.petruslaw.com">The Law Offices of Paul D. Petrus Jr., 2010</a>
              <br>&nbsp;
              <br>
              <a class="new-window" href="http://www.petruslaw.com"><img src="/media/web/petrus/petrus1.jpg" alt="Petrus Screenshot 1"></a>
              <a class="new-window" href="http://www.petruslaw.com"><img src="/media/web/petrus/petrus2.jpg" alt="Petrus Screenshot 2"></a>
              <a class="new-window" href="http://www.petruslaw.com"><img src="/media/web/petrus/petrus3.jpg" alt="Petrus Screenshot 3"></a>
              <br>
              <br><a class="new-window" href="http://www.gothamenergyapp.com">Visit the site</a>
            </div>
          <?php } else if ($piece == 'gotham') { ?>
          <div id="pieceContent">
            <a class="new-window webTitle" href="http://www.gothamenergyapp.com">Gotham Energy App, 2010</a>
            <br>&nbsp;
            <br>
            <a class="new-window" href="http://www.gothamenergyapp.com"><img src="/media/web/gotham/gotham1.jpg" alt="Gotham Energy App"></a>
            <a class="new-window" href="http://www.gothamenergyapp.com"><img src="/media/web/gotham/gotham2.jpg" alt="Gotham Energy App"></a>
            <br>
            <br><a class="new-window" href="http://www.gothamenergyapp.com">Visit the site</a>
          </div>
        <?php } else if ($piece == 'vegan') { ?>
          <div id="pieceContent">
            <a class="new-window webTitle" href="http://vegan.katherineerickson.com">What The Heck Do Vegans Eat?, 2010</a>
            <br>&nbsp;
            <br>
            <a class="new-window" href="http://vegan.katherineerickson.com"><img src="/media/web/vegan/vegan1.jpg" alt="WTHDVE"></a>
            <a class="new-window" href="http://vegan.katherineerickson.com"><img src="/media/web/vegan/vegan2.gif" alt="WTHDVE"></a>
            <a class="new-window" href="http://vegan.katherineerickson.com"><img src="/media/web/vegan/vegan3.jpg" alt="WTHDVE"></a>
            <br>
            <br><a class="new-window" href="http://vegan.katherineerickson.com">Visit the site</a>
          </div>
        <?php } else if ($piece == 'almanac') { ?>
          <div id="pieceContent">
            <a class="new-window webTitle" href="http://www.thealmanac.org">The Almanac, 2009</a>
            <br>&nbsp;
            <br>
            <a class="new-window" href="http://www.thealmanac.org"><img src="/media/web/almanac/almanac1.jpg" alt="Fox N Sox"></a>
            <a class="new-window" href="http://www.thealmanac.org"><img src="/media/web/almanac/almanac2.jpg" alt="Fox N Sox"></a>
            <br>
            <br><a class="new-window" href="http://www.thealmanac.org">Visit the site</a>
          </div>
        <?php } elseif ($piece == 'foxNSox') { ?>
          <div id="pieceContent">
            <a class="new-window webTitle" href="http://www.foxnsox.com">FoxNSox.com, 2009</a>
            <br>&nbsp;
            <br>
            <a class="new-window" href="http://www.foxnsox.com"><img src="/media/web/foxnsox/fox1.jpg" alt="Fox N Sox"></a>
            <a class="new-window" href="http://www.foxnsox.com"><img src="/media/web/foxnsox/fox2.jpg" alt="Fox N Sox"></a>
            <br>
            <br><a class="new-window" href="http://www.foxnsox.com">Visit the site</a>
          </div>
        <?php } elseif ($piece == 'roadkill') { ?>
            <div id="pieceContent">
              <a class="new-window webTitle" href="http://roadkill.michaelgeraci.com">Roadkill Across America, 2009</a>
              <br>Created with Katherine Erickson
              <br>&nbsp;
              <br>
              <a class="new-window" href="http://roadkill.michaelgeraci.com"><img src="/media/web/roadkill/roadkill1.jpg" alt="Roadkill Across America"></a>
              <a class="new-window" href="http://roadkill.michaelgeraci.com"><img src="/media/web/roadkill/roadkill2.jpg" alt="Roadkill Across America"></a>
              <a class="new-window" href="http://roadkill.michaelgeraci.com"><img src="/media/web/roadkill/roadkill3.jpg" alt="Roadkill Across America"></a>
              <br>
              <br><a class="new-window" href="http://roadkill.michaelgeraci.com">Visit the site</a>
            </div>
        <?php } elseif ($piece == 'doctoroff') { ?>
            <div id="pieceContent">
              <h1>Julia Doctoroff's Portfolio, 2007</h1>
              <br>&nbsp;
              <br>
              <img class="new-window" src="/media/web/doctoroff/doctoroff1.jpg" alt="Julia Doctoroff">
              <img class="new-window" src="/media/web/doctoroff/doctoroff2.jpg" alt="Julia Doctoroff">
              <br>
              <br>juliadoctoroff.com is temporarily offline.
            </div>
        <?php } elseif ($piece == 'vogl') { ?>
          <div id="pieceContent">
            <a class="new-window webTitle" href="http://www.creativejulia.com">Julia Vogl's Portfolio, 2007</a>
            <br>&nbsp;
            <br>
            <a class="new-window" href="http://www.creativejulia.com"><img src="/media/web/vogl/vogl1.jpg" alt="Julia Vogl"></a>
            <a class="new-window" href="http://www.creativejulia.com"><img src="/media/web/vogl/vogl2.jpg" alt="Julia Vogl"></a>
            <br>
            <br><a class="new-window" href="http://www.creativejulia.com">Visit the site</a>
          </div>
        <?php } ?>
        <br>
        <br>
        <br>
      </div>
      <div class='pieceBottomSpacer'>&nbsp;</div>
    </div>
    <?php include('includes/googleAnalytics.php'); ?>
  </body>
</html>