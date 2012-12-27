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
            // artist, title, image, rambling, link, mp3 file, song name
            array('alt-J', 'An Awesome Wave', "altj", "Description", '#', 'altj', 'Tesselate'),
            array('Anaïs Mitchell', 'Young Man in America', "anaismitchell", "Description", '#', 'altj', 'Tesselate'),
            array('Beach House', 'Bloom', "beachhouse", "Description", '#', 'altj', 'Tesselate'),
            array('Bear in Heaven', "I Love You, It's Cool", "bearinheaven", "Description", '#', 'altj', 'Tesselate'),
            array("Dinosaur Feathers", "Whistle Tips", "dinosaurfeathers", "Description", '#', 'altj', 'Tesselate'),
            array("Grace Woodroofe", "Always Want", "gracewoodroofe", "Description", '#', 'altj', 'Tesselate'),
            array("Here We Go Magic", "A Different Ship", "herewegomagic", "Description", '#', 'altj', 'Tesselate'),
            array("Lemolo", "The Kaleidoscope", "lemolo", "Description", '#', 'altj', 'Tesselate'),
            array("Lower Dens", "Nootropics", "lowerdens", "Description", '#', 'altj', 'Tesselate'),
            array("Opossum", "Electric Hawaii", "opossum", "Description", '#', 'altj', 'Tesselate'),
            array("WhoMadeWho", "Brighter", "whomadewho", "Description", '#', 'altj', 'Tesselate'),
            array("Winterpills", "All My Lovely Goners", "winterpills", "Description", '#', 'altj', 'Tesselate')
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
              $code = $album[5];
              $song = $album[6];
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
                    <a class='link' href='$link' target='_blank'>buy it</a>
                  </div>
                </li>
              ";
              $o = "
                    <object type='application/x-shockwave-flash' data='../../js/player.swf' id='audioplayer$i' height='24' width='290'>
                      <param name='movie' value='../../js/player.swf'>
                      <param name='FlashVars' value='playerID=$i&amp;bg=0xbbd199&amp;leftbg=0xf3f4d3&amp;lefticon=0x444444&amp;rightbg=0xf3f4d3&amp;rightbghover=0xdedfb5&amp;righticon=0x444444&amp;righticonhover=0x444444&amp;text=0x666666&amp;slider=0x666666&amp;track=0xFFFFFF&amp;border=0x666666&amp;loader=0xf3f4d3&amp;loop=no&amp;autostart=no&amp;soundFile=$root/music/$code.mp3'>
                      <param name='quality' value='high'>
                      <param name='menu' value='false'>
                      <param name='wmode' value='transparent'>
                    </object>
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
