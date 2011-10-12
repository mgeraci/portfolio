<?php
  // // H E A D // //
  $title = 'Michael P. Geraci - Bio/Resume';

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
        <div id="headshot">
          <img src="/images/headshot.png" width="300" height="478" alt="Michael P. Geraci">
        </div>
        <div id="indexRight">
          <h1>I'm Michael P. Geraci</h1>
          <div class="text">
            I'm a web and user experience designer based in New York, NY. I like helping startups with the life cycle of front-end work, from wireframes and mockups to implementation. I hack in SASS/ CSS, CoffeeScript/jQuery, and HAML/HTML.
            <br>
            <br>You can see my <a href="/web">web design portfolio</a>, my <a href="/photography/blog">hobby photoblog</a>, and the rest of my work.
            <br>
            <br><a href="/media/documents/GeraciResume.pdf">Resume (PDF)</a>
            <br><a href="mailto:mgeraci@gmail.com">&#109;&#103;&#101;&#114;&#97;&#99;&#105;&#64;&#103;&#109;&#97;&#105;&#108;&#46;&#99;&#111;&#109;</a>
          </div>
          <div class="socialLinks">
            <ul>
              <li>
                <a class="github" href="http://www.github.com/mgeraci">view my github page</a>
              </li>
              <li>
                <a class="twitter" href="http://www.twitter.com/mgeraci">view my twitter stream</a>
              </li>
              <li>
                <a class="linked_in" href="http://www.linkedin.com/in/mpgeraci">view my linked in profile</a>
              </li>
              <li>
                <a class="facebook" href="http://www.facebook.com/michaelgeraci">view my facebook page</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div id="indexBottom" class="wrapOut">
      <div class="wrapIn">
        <h1>Last Updated: 10.9.11</h1>
        <div class="row">
          <div class="group">
            <a href="http://vimeo.com/28989090" class="new-window">
              <img src="/images/recent_thumbs/showtime.jpg">
              <div class="text">
                New Steel Drum Performance:
                <br>It's Showtime
              </div>
            </a>
          </div>
          <div class="group">
            <a href="/photography/blog">
              <img src="/media/photography/blog/thumbs/3937.jpg">
              <div class="text">
                New Photos:
                <br>Costa Rica
              </div>
            </a>
          </div>
        </div>
        <div class="row">
          <div class="group">
            <a href="/web/conservatoryChallenge">
              <img src="/images/recent_thumbs/con_challenge.jpg">
              <div class="text">
                New Web Design:
                <br>Oberlin Conservatory Challenge
              </div>
            </a>
          </div>
          <div class="group">
            <a href="/web/life">
              <img src="/images/recent_thumbs/life.jpg">
              <div class="text">
                New Web Design:
                <br>Conway's Game of Life in jQuery/Canvas
              </div>
            </a>
          </div>
        </div>
        <div class="copyright">This website and its contents are &copy; Michael P. Geraci, 2006-<?php echo date("Y") ?></div>
      </div>
    </div>
    <?php include('includes/googleAnalytics.php'); ?>
  </body>
</html>