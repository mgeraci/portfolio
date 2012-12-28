<?php
  // // H E A D // //
  $title = 'Michael P. Geraci - My Favorite Albums of 2011';

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
        <h1>My Favorite Albums of 2012</h1>
        <?php
          $albums = array(
            // artist, title, image, rambling, link, song name
            array('alt-J', 'An Awesome Wave', "altj", "Description", '#', 'Tesselate'),
            array('Anaïs Mitchell', 'Young Man in America', "anaismitchell", "Description", '#', 'Dyin Day'),
            array('Beach House', 'Bloom', "beachhouse", "Description", '#', 'Tesselate'),
            array('Bear in Heaven', "I Love You, It's Cool", "bearinheaven", "Description", '#', 'Tesselate'),
            array("Dinosaur Feathers", "Whistle Tips", "dinosaurfeathers", "Description", '#', 'Tesselate'),
            array("Grace Woodroofe", "Always Want", "gracewoodroofe", "Description", '#', 'Tesselate'),
            array("Here We Go Magic", "A Different Ship", "herewegomagic", "Description", '#', 'Tesselate'),
            array("Lemolo", "The Kaleidoscope", "lemolo", "Description", '#', 'Tesselate'),
            array("Lower Dens", "Nootropics", "lowerdens", "Description", '#', 'Tesselate'),
            array("Opossum", "Electric Hawaii", "opossum", "Description", '#', 'Tesselate'),
            array("WhoMadeWho", "Brighter", "whomadewho", "Description", '#', 'Tesselate'),
            array("Winterpills", "All My Lovely Goners", "winterpills", "Description", '#', 'Tesselate')
          );
        ?>
        <ul id='albums'>
          <?php
            $i = 1;

            foreach($albums as $album) {
              $artist = $album[0];
              $title = $album[1];
              $image = $album[2];
              $text = $album[3];
              $link = $album[4];
              $song = $album[5];
              $root = preg_replace('/\/index.php\/?/', '', $_SERVER['PHP_SELF']);

              echo "
                <li>
                  <span class='count count$i'>$i</span>
                  <img src='$root/images/$image.jpg'>
                  <div class='content'>
                    <h1>$title</h1>
                    <h2>by <span>$artist</span></h2>
                    <div class='text'>$text</div>
                    <div class='song'>$song</div>
                    <div class='audio-wrapper'>
                      <audio controls>
                        <source src='$root/music/$image.ogg'></source>
                        <source src='$root/music/$image.mp3'></source>
                        <p>Your browser does not support html5 audio, <a href='$root/music/$artist.mp3'>download the file</a>.</p>
                      </audio>
                      <a class='play' href='#'>play</a>
                    </div>
                    <a class='link' href='$link' target='_blank'>buy it</a>
                  </div>
                </li>
              ";

              $i += 1;
            }
          ?>
        </ul>
        <div id='thanks'>
          that's it. thanks for reading.
          <br>complain via <a href='mailto:mgeraci@gmail.com'>email</a> or <a href='http://twitter.com/mgeraci' target='_blank'>twitter</a>.
        </div>
      </div>
    </div>
    <?php include('../../includes/googleAnalytics.php'); ?>
  </body>
</html>
