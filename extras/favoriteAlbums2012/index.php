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
        <div class="links">
          see also: <a href='/my-favorite-albums-of-2011'>2011</a>
        </div>
        <?php
          $albums = array(
            // artist, title, image, rambling, link, song name
            array("Lower Dens", "Nootropics", "lowerdens", "Brains", "Lana Hunter's haunting voice floats above beguilingly simple guitars. This record is close to art music; there are a few longer songs and an experimental piece which punctuate the catchy but surreal pop.", "http://www.amazon.com/gp/product/B007IMOWX4/ref=as_li_ss_tl?ie=UTF8&tag=micpgerpor-20&linkCode=as2&camp=1789&creative=390957&creativeASIN=B007IMOWX4", "http://click.linksynergy.com/fs-bin/click?id=aRh8RAw5tY0&subid=&offerid=146261.1&type=10&tmpid=3909&RD_PARM1=https%3A%2F%2Fitunes.apple.com%2Fus%2Falbum%2Fnootropics-bonus-track-version%2Fid512265377%3Fign-mpt%3Duo%253D4"),
            array('Anaïs Mitchell', 'Young Man in America', "anaismitchell", "Dyin Day", "Anaïs has the most amazing voice, and her folk music is sparse and beautifully arranged. Stories about love, loss, and forgiveness.", 'http://www.amazon.com/gp/product/B006X08FEO/ref=as_li_ss_tl?ie=UTF8&tag=micpgerpor-20&linkCode=as2&camp=1789&creative=390957&creativeASIN=B006X08FEO', "http://click.linksynergy.com/fs-bin/click?id=aRh8RAw5tY0&subid=&offerid=146261.1&type=10&tmpid=3909&RD_PARM1=https%3A%2F%2Fitunes.apple.com%2Fus%2Falbum%2Fyoung-man-in-america%2Fid498739583%3Fuo%3D4", "http://anaismitchell.com/store/"),
            array("Here We Go Magic", "A Different Ship", "herewegomagic", "Over the Ocean", "Quiet, contemplative pop. Drenched in reverb and echoing guitars, the songs are meticulously assembled. This plays in nice contrast to the nature of the lyrics, which often describe uncertainty.", 'http://www.amazon.com/gp/product/B007A4Y1HC/ref=as_li_ss_tl?ie=UTF8&tag=micpgerpor-20&linkCode=as2&camp=1789&creative=390957&creativeASIN=B007A4Y1HC', "http://click.linksynergy.com/fs-bin/click?id=aRh8RAw5tY0&subid=&offerid=146261.1&type=10&tmpid=3909&RD_PARM1=https%3A%2F%2Fitunes.apple.com%2Fus%2Falbum%2Fa-different-ship%2Fid506448914%3Fuo%3D4"),
            array("Grace Woodroofe", "Always Want", "gracewoodroofe", "I've Handled Myself Wrong", "Grace Woodroofe has a beautiful voice, and her record is filled with a pervasive melancholy that is very affecting. She's a great storyteller and some songs draw from very personal experiences. Hers was my favorite live show of the year; her backing band is fantastic.", 'http://www.amazon.com/gp/product/B004FS2772/ref=as_li_ss_tl?ie=UTF8&tag=micpgerpor-20&linkCode=as2&camp=1789&creative=390957&creativeASIN=B004FS2772', "http://click.linksynergy.com/fs-bin/click?id=aRh8RAw5tY0&subid=&offerid=146261.1&type=10&tmpid=3909&RD_PARM1=https%3A%2F%2Fitunes.apple.com%2Fus%2Falbum%2Falways-want%2Fid464991870%3Fuo%3D4"),
            array('alt-J', 'An Awesome Wave', "altj", "Tesselate", "This is some of the greatest weird pop I've heard recently. The production is clean and tight and the voices are just odd enough. The album has great flow and doesn't shy away from interesting interludes and experimentation.", 'http://www.amazon.com/gp/product/B008OW1S3O/ref=as_li_ss_tl?ie=UTF8&tag=micpgerpor-20&linkCode=as2&camp=1789&creative=390957&creativeASIN=B008OW1S3O', "http://click.linksynergy.com/fs-bin/click?id=aRh8RAw5tY0&subid=&offerid=146261.1&type=10&tmpid=3909&RD_PARM1=https%3A%2F%2Fitunes.apple.com%2Fus%2Falbum%2Fan-awesome-wave%2Fid558262493%3Fuo%3D4"),
            array('Bear in Heaven', "I Love You, It's Cool", "bearinheaven", "Kiss Me Crazy", "This is self referential electronic pop. It's filled with an almost overwhelming sense of cool. The live show was great; the singer exudes a boyish charm as he seems to sing about you and him, in the present tense.", 'http://www.amazon.com/gp/product/B0074LIQAO/ref=as_li_ss_tl?ie=UTF8&tag=micpgerpor-20&linkCode=as2&camp=1789&creative=390957&creativeASIN=B0074LIQAO', "http://click.linksynergy.com/fs-bin/click?id=aRh8RAw5tY0&subid=&offerid=146261.1&type=10&tmpid=3909&RD_PARM1=https%3A%2F%2Fitunes.apple.com%2Fus%2Falbum%2Fi-love-you-its-cool%2Fid510442121%3Fuo%3D4"),
            array("Dinosaur Feathers", "Whistle Tips", "dinosaurfeathers", "Young Bucks", "Dinosaur Feathers is intricate, upbeat pop. It's complex, well arranged, well performed, and full of edgy guitars and time changes. They had me at the Bubb Rubb reference.", 'http://www.amazon.com/gp/product/B0078XXG30/ref=as_li_ss_tl?ie=UTF8&tag=micpgerpor-20&linkCode=as2&camp=1789&creative=390957&creativeASIN=B0078XXG30', "http://click.linksynergy.com/fs-bin/click?id=aRh8RAw5tY0&subid=&offerid=146261.1&type=10&tmpid=3909&RD_PARM1=https%3A%2F%2Fitunes.apple.com%2Fus%2Falbum%2Fwhistle-tips%2Fid507606603%3Fuo%3D4"),
            array("Lemolo", "The Kaleidoscope", "lemolo", "On Again, Off Again", "Two female singers in close harmony. Lots of pianos and spacious guitars give this dream pop a longing, deliberate feel.", 'http://www.amazon.com/gp/product/B009ZTKG0Q/ref=as_li_ss_tl?ie=UTF8&tag=micpgerpor-20&linkCode=as2&camp=1789&creative=390957&creativeASIN=B009ZTKG0Q', "http://click.linksynergy.com/fs-bin/click?id=aRh8RAw5tY0&subid=&offerid=146261.1&type=10&tmpid=3909&RD_PARM1=https%3A%2F%2Fitunes.apple.com%2Fus%2Falbum%2Fthe-kaleidoscope%2Fid575354928%3Fuo%3D4", "http://lemolomusic.bandcamp.com/album/the-kaleidoscope"),
            array("Opossum", "Electric Hawaii", "opossum", "Blue Meanies", "This is a great summer record; you can't escape its sun-drenched optimism and happiness. The Beach Boys, but more compressed and a bit more harsh. Short and sweet.", 'http://www.amazon.com/gp/product/B008DL3TPQ/ref=as_li_ss_tl?ie=UTF8&tag=micpgerpor-20&linkCode=as2&camp=1789&creative=390957&creativeASIN=B008DL3TPQ', "http://click.linksynergy.com/fs-bin/click?id=aRh8RAw5tY0&subid=&offerid=146261.1&type=10&tmpid=3909&RD_PARM1=https%3A%2F%2Fitunes.apple.com%2Fus%2Falbum%2Felectric-hawaii%2Fid543882355%3Fuo%3D4"),
            array("Winterpills", "All My Lovely Goners", "winterpills", "Minxy", "Winterpills is beautiful chamber pop. Their songs are exquisitely arranged, with male and female harmonies, and guitar parts that float on top of the songs. They're particularly special to me as they played a <a href='/winterpills'>show at my parents' house this year</a>.", 'http://www.amazon.com/gp/product/B006UFHGDS/ref=as_li_ss_tl?ie=UTF8&tag=micpgerpor-20&linkCode=as2&camp=1789&creative=390957&creativeASIN=B006UFHGDS', "http://click.linksynergy.com/fs-bin/click?id=aRh8RAw5tY0&subid=&offerid=146261.1&type=10&tmpid=3909&RD_PARM1=https%3A%2F%2Fitunes.apple.com%2Fus%2Falbum%2Fall-my-lovely-goners%2Fid499959277%3Fuo%3D4", "http://music.winterpills.com/album/all-my-lovely-goners-2012"),
            array("WhoMadeWho", "Brighter", "whomadewho", "The Sun", "On this list for the second year in a row, Brighter is the more upbeat counterpart to last year's Knee Deep. While more playful, they still create suspense and drama in their songs. Infectuous, catchy Danish electro-pop.", 'http://www.amazon.com/gp/product/B006ICUJYG/ref=as_li_ss_tl?ie=UTF8&tag=micpgerpor-20&linkCode=as2&camp=1789&creative=390957&creativeASIN=B006ICUJYG', "http://click.linksynergy.com/fs-bin/click?id=aRh8RAw5tY0&subid=&offerid=146261.1&type=10&tmpid=3909&RD_PARM1=https%3A%2F%2Fitunes.apple.com%2Fus%2Falbum%2Fbrighter%2Fid499491799%3Fuo%3D4"),
            array('Beach House', 'Bloom', "beachhouse", "Other People", "Synthesizers, high voices, electronic drums. Beach House is a dream: a slowly moving, cloud-filled haze. The album is beautiful and captivating as it brings you into its own world.", 'http://www.amazon.com/gp/product/B007LNJ4YW/ref=as_li_ss_tl?ie=UTF8&tag=micpgerpor-20&linkCode=as2&camp=1789&creative=390957&creativeASIN=B007LNJ4YW', "http://click.linksynergy.com/fs-bin/click?id=aRh8RAw5tY0&subid=&offerid=146261.1&type=10&tmpid=3909&RD_PARM1=https%3A%2F%2Fitunes.apple.com%2Fus%2Falbum%2Fbloom%2Fid509665145%3Fuo%3D4", "http://www.beachhousebaltimore.com/shop/cds"),
          );
        ?>
        <ul id='albums'>
          <?php
            $i = 1;

            foreach($albums as $album) {
              $artist = $album[0];
              $title = $album[1];
              $image = $album[2];
              $song = $album[3];
              $text = $album[4];
              $amazon = $album[5];
              $itunes = $album[6];
              $personal = $album[7];
              $root = preg_replace('/\/index.php\/?/', '', $_SERVER['PHP_SELF']);

              $html = "
                <li>
                  <span class='count count$i'>$i</span>
                  <img src='$root/images/$image.jpg'>
                  <div class='content'>
                    <h1>$title</h1>
                    <h2>by <span>$artist</span></h2>
                    <div class='text'>$text</div>
                    <div class='song_wrapper'>
                      <audio controls>
                        <source src='$root/music/$image.ogg'></source>
                        <source src='$root/music/$image.mp3'></source>
                        <p>Your browser does not support html5 audio, <a href='$root/music/$artist.mp3'>download the file</a>.</p>
                      </audio>
                      <a class='control' href='#'></a>
                      <span>$song</span>
                    </div>
                    <div class='buy-links'>
                      <a class='link amazon' href='$amazon' target='_blank'><span>amazon</span></a>
                      <a class='link itunes' href='$itunes' target='_blank'><span>itunes</span></a>";

                      if ($personal) {
                        $html .= "<a class='link personal' href='$personal' target='_blank'>$artist'";
                        if (substr($artist, strlen($artist) - 1) != 's') { $html .= 's'; }
                        $html .=" store</a>";
                      }

                    $html .= "</div>
                  </div>
                </li>
              ";

              echo $html;

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
