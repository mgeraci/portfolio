<?php
  // // H E A D // //
  $title = 'Michael P. Geraci - My Top Albums of 2011';
  
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
        <h1>My Top Records of 2011</h1>
        <?php
          $albums = array(
            // artist, title, image, rambling, link
            array('James Blake', 'James Blake', "james_blake.jpg", 'This record makes me want to be an alcoholic. It\'s is crushingly beautiful. Sometimes when I listen to it I can\'t do anything else, I just have to sit there.', 'http://www.amazon.com/gp/product/B004CR5TD0/ref=as_li_qf_sp_asin_tl?ie=UTF8&tag=micpgerpor-20&linkCode=as2&camp=1789&creative=9325&creativeASIN=B004CR5TD0'),
            array('Wye Oak', 'Civilian', "wye_oak.jpg", 'A duo that sounds like so much more. Jenn plays guitar and sings with this great, deep voice. Andy plays drums and some keyboard with his left hand. They\'re just great. Fun fact: I saw Wye Oak more than any other band this year, 6 times.', 'http://www.amazon.com/gp/product/B004I65E4O/ref=as_li_qf_sp_asin_tl?ie=UTF8&tag=micpgerpor-20&linkCode=as2&camp=1789&creative=9325&creativeASIN=B004I65E4O'),
            array('Peter Bjorn and John', 'Gimme Some', "pbj.jpg", 'More uptempo than their previous work. High energy, and quite fun. Go see these guys when they come to your town.', 'http://www.amazon.com/gp/product/B004L5D5JI/ref=as_li_qf_sp_asin_tl?ie=UTF8&tag=micpgerpor-20&linkCode=as2&camp=1789&creative=9325&creativeASIN=B004L5D5JI'),
            array('WhoMadeWho', 'Knee Deep', "whomadewho.jpg", 'Dark instruments along with sometimes uplifting lyrics about the beauty of music, with an almost disaffected attitude. Danish.', 'http://www.amazon.com/gp/product/B004R0N114/ref=as_li_qf_sp_asin_tl?ie=UTF8&tag=micpgerpor-20&linkCode=as2&camp=1789&creative=9325&creativeASIN=B004R0N114'),
            array('les animaux', 'les animaux', "les_animaux.jpg", 'My friend Eric made this record. I guess he was having some rough times with his lady. Don\'t worry, though, he\'s just fine. Go buy it now.', 'http://lesanimauxlesanimaux.bandcamp.com'),
            array('Deerhoof', 'Deerhoof vs. Evil', "deerhoof_vs_evil.jpg", 'I was sold at the opening. There\'s some really fascinating guitar work, and the poppy sections are charming as ever with Satomi\'s vocals.', 'http://www.amazon.com/gp/product/B004CRP9J4/ref=as_li_qf_sp_asin_tl?ie=UTF8&tag=micpgerpor-20&linkCode=as2&camp=1789&creative=9325&creativeASIN=B004CRP9J4'),
            array('Stephen Malkmus & the Jicks', 'Mirror Traffic', "malkmus.jpg", 'I\'ve listened to Malkmus forever, and I\'m a bit of a Beck fan, so I was pretty excited to hear that he produced this record, but it made it a little soft for my tastes. The songwriting is really great, though, and it sounds fantastic. Just don\'t go in expecting anything too harsh.', 'http://www.amazon.com/gp/product/B0057OOQEU/ref=as_li_qf_sp_asin_tl?ie=UTF8&tag=micpgerpor-20&linkCode=as2&camp=1789&creative=9325&creativeASIN=B0057OOQEU')
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
              $root = preg_replace('/index.php/', '', $_SERVER['PHP_SELF']);
              
              echo "
                <li>
                  <span class='count'>$i</span>
                  <img src='$root/images/$image'>
                  <div class='content'>
                    <h1>$title</h1>
                    <h2>by <span>$artist</span></h2>
                    <div class='text'>$text<br><br><a href='$link' target='_blank'>buy it because you like music</a></div>
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