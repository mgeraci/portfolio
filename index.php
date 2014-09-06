<?php
  // // H E A D // //
  $title = 'Michael P. Geraci - Web Design, User Experience Design';

  // gets the location of the page and assigns it to $location
  // format is /page.php
  $location = $_SERVER['PHP_SELF'];

  include("includes/head.php");
?>
  <body id="index">
    <div id="menuWrapper" class="wrapOut">
      <div class="wrapIn">
        <?php
          // // M E N U // //
          include("includes/menu.php");
        ?>
      </div>
    </div>
    <div id="indexTop" class="wrapOut">
      <div class="wrapIn">
        <table>
          <tr>
            <td id="headshot"></td>
            <td id="indexRight">
              <div id="wrapper">
                <h1>I&rsquo;m Michael P. Geraci</h1>
                <div class="text">
                  I&rsquo;m a front-end web developer based in New York, NY. I like helping startups with the life cycle of front-end work, from wireframes and mockups to implementation. I hack in SASS/ CSS, CoffeeScript/jQuery, and HAML/HTML.
                  <br>
                  <br>Here, you&rsquo;ll find my <a href="/web">web design portfolio</a>, my <a href="/photography/blog">photoblog</a>, and the rest of my work.
                  <br>
                  <br><a href="/media/documents/Geraci_Resume_Web.pdf">Resume (PDF)</a>
                  <br><a href="mailto:me@mgeraci.com">&#109;&#101;&#64;&#109;&#103;&#101;&#114;&#97;&#99;&#105;&#46;&#99;&#111;&#109;</a>
                </div>
                <div class="socialLinks">
									<a class="github" title="github" href="http://www.github.com/mgeraci">view my github page</a>
									<a class="newsblur" title="newsblur" href="http://mgeraci.newsblur.com/">view my shared items on newsblur</a>
                </div>
              </div>
            </td>
          </tr>
        </table>
      </div>
    </div>
    <div id="indexBottom" class="wrapOut">
      <div class="wrapIn">
        <h1>Last Updated: 9.6.14</h1>
        <?php
          $recent = array(
            array('https://www.youtube.com/watch?v=UaLBILfJ5ag', '/images/recent_thumbs/casym-2014.jpg', "New Steel Drum Performance<br>CASYM - Big People Party", 'new-window'),
            array('/photography/blog/427', '/media/photography/blog/thumbs/7352.jpg', "New Photos:<br>Summer Trip to Duluth", ''),
            array('/web/dtime2', '/images/recent_thumbs/dtime2.jpg', "New Web Design:<br>Dtime Version 2", ''),
            array('/graphic/51', '/media/graphic/thumbs/pumptrain.jpg', "New Graphic Design:<br>Pump Train", ''),
          );

          function recent_item($array){
            echo "
              <div class='group'>
                <a href='$array[0]' class='$array[3]'>
                  <img src='$array[1]'>
                  <div class='text'>$array[2]</div>
                </a>
              </div>
            ";
          }
        ?>
        <div class="row">
          <?php
            echo recent_item($recent[0]);
            echo recent_item($recent[1]);
          ?>
        </div>
        <div class="row">
          <?php
            echo recent_item($recent[2]);
            echo recent_item($recent[3]);
          ?>
        </div>
        <div class="copyright">This website and its contents are &copy; Michael P. Geraci, 2006-<?php echo date("Y") ?></div>
      </div>
    </div>
    <?php include('includes/googleAnalytics.php'); ?>
  </body>
</html>
