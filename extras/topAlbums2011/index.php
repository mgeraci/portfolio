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
            // artist, title, image, rambling
            array('James Blake', 'James Blake', "james_blake.jpg", 'This record is crushingly beautiful. Sometimes when I listen to it I can\'t do anything else, I just have to sit there. This record makes me want to be an alcoholic.'),
            array('Wye Oak', 'Civilian', "wye_oak.jpg", 'poop'),
            array('Peter Bjorn and John', 'Gimme Some', "pbj.jpg", 'snicjerksdf')
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
              
              echo "
                <li>
                  <span class='count'>$i</span>
                  <img src='./images/$image'>
                  <div class='content'>
                    <h1>$title</h1>
                    <h2>by <span>$artist</span></h2>
                    <div class='text'>$text</div>
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