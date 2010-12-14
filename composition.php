<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html>
  <?php
    $piece = $_GET['piece'];

    // // H E A D // //
    $title = 'Michael P. Geraci - Composition';

    switch ($piece) {
      case 'ascension':
        $title .= ' - Ascension';
        break;
      case 'heptadecality':
        $title .= ' - Heptadecality';
        break;
      case 'futility':
        $title .= ' - Futility';
        break;
      case 'firstflesh':
        $title .= ' - First Flesh';
        break;
      case 'stolen':
        $title .= ' - Stolen Thoughts';
        break;
      case 'abstractToExact':
        $title .= ' - Abstract to Exact';
        break;
      case 'home':
        $title .= ' - Home is a Visuacoustic Space';
        break;
      case 'hollow':
        $title .= ' - Hollow Earth';
        break;
      case 'blood':
        $title .= ' - There is No Blood in a Dying World';
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
      <div id="pageComposition">
        <div id="pieceList">
          <ul>
            <li>
              <a <?php if ($piece == 'ascension') echo 'class="on"'?> href="/composition/ascension">
                <h1>Ascension, 2007</h1>
                <br>For Organ and Tape
              </a>
            </li>
            <li>
              <a <?php if ($piece == 'heptadecality') echo 'class="on"'?> href="/composition/heptadecality">
                <h1>Heptadecality, 2007</h1>
                <br>For Videotaped and Processed Dance
              </a>
            </li>
            <li>
              <a <?php if ($piece == 'futility') echo 'class="on"'?> href="/composition/futility">
                <h1>Futility, 2007</h1>
                <br>For Three Videos and Monophonic Sound Sources
              </a>
            </li>
            <li>
              <a <?php if ($piece == 'firstFlesh') echo 'class="on"'?> href="/composition/firstFlesh">
                <h1>First Flesh, 2007</h1>
                <br>For DVD and Stereo Audio
              </a>
            </li>
            <li>
              <a <?php if ($piece == 'stolen') echo 'class="on"'?> href="/composition/stolen">
                <h1>Stolen Thoughts, 2006</h1>
                <br>For Three Steel Drums and Tape
              </a>
            </li>
            <li>
              <a <?php if ($piece == 'abstractToExact') echo 'class="on"'?> href="/composition/abstractToExact">
                <h1>Abstract to Exact, 2006</h1>
                <br>For Tape
              </a>
            </li>
            <li>
              <a <?php if ($piece == 'home') echo 'class="on"'?> href="/composition/home">
                <h1>Home is a Visuacoustic Space, 2006</h1>
                <br>For DVD and Stereo Audio
              </a>
            </li>
            <li>
              <a <?php if ($piece == 'hollow') echo 'class="on"'?> href="/composition/hollow">
                <h1>Hollow Earth, 2006</h1>
                <br>For Tape
              </a>
            </li>
            <li>
              <a <?php if ($piece == 'blood') echo 'class="on"'?> href="/composition/blood">
                <h1>There is No Blood in a Dying World, 2004</h1>
                <br><span>For DVD and Stereo Audio</span>
              </a>
            </li>
          </ul>
        </div>
        <?php if ($piece == 'ascension') { ?>
          <div id='pieceContent'>
            <h1>Ascension, 2007</h1>
            <br>For Organ and Tape, 8:53"
            <br>With Kate Pearson, Organ
            <br>Recorded Live on April 29, 2007
            <br>in Warner Concert Hall, Oberlin Conservatory, OH
            <br>&nbsp;
            <br>&nbsp;
            <object type='application/x-shockwave-flash' data='/js/player.swf' id='audioplayer4' height='24' width='290'>
              <param name='movie' value='/js/player.swf'>
              <param name='FlashVars' value='playerID=4&amp;bg=0xbbd199&amp;leftbg=0xf3f4d3&amp;lefticon=0x444444&amp;rightbg=0xf3f4d3&amp;rightbghover=0xdedfb5&amp;righticon=0x444444&amp;righticonhover=0x444444&amp;text=0x666666&amp;slider=0x666666&amp;track=0xFFFFFF&amp;border=0x666666&amp;loader=0xf3f4d3&amp;loop=no&amp;autostart=no&amp;soundFile=/media/composition/ascension.mp3'>
              <param name='quality' value='high'>
              <param name='menu' value='false'>
              <param name='wmode' value='transparent'>
            </object>
            <br>
            <br><a href='/media/composition/Geraci_Ascension_Score.pdf'>Click Here to See the Score (PDF)</a>
          </div>
        <?php } elseif ($piece == 'heptadecality') { ?>
          <div id="pieceContent">
            <h1>Heptadecality, 2007</h1>
            <br>For Videotaped and Processed Dance, 5:40"
            <br>With Hannah Verril
            <br>&nbsp;
            <br>&nbsp;
            <iframe src="http://player.vimeo.com/video/3194292?title=0&amp;byline=0&amp;portrait=0&amp;color=bbd199" width="400" height="267" frameborder="0"></iframe>
            <br>&nbsp;
            <br>&nbsp;
          </div>
        <?php } elseif ($piece == 'futility') { ?>
          <div id="pieceContent">
            <h1>Futility, 2007</h1>
            <br>For Three Videos and Monophonic Sound Sources, 11:21"
            <br>With Rebecca Shaykin
            <br>&nbsp;
            <br>&nbsp;
            <iframe src="http://player.vimeo.com/video/3194557?title=0&amp;byline=0&amp;portrait=0&amp;color=bbd199" width="400" height="300" frameborder="0"></iframe>
            <br>&nbsp;
            <br>&nbsp;
          </div>
        <?php } elseif ($piece == 'firstFlesh') { ?>
          <div id='pieceContent'>
            <h1>First Flesh, 2007</h1>
            <br>For DVD and Stereo Audio, 9:56"
            <br>With LC, JD, and Kate Ewald
            <br>&nbsp;
            <br>&nbsp;
            <iframe src="http://player.vimeo.com/video/3194071?title=0&amp;byline=0&amp;portrait=0&amp;color=bbd199" width="400" height="302" frameborder="0"></iframe>
            <div class='programNotes'>
              <div class='aboutThePiece'>About the Piece</div>
              <br>The idea for <i>First Flesh</i> began with the simple concept of pairing myself talking about the first time I had sex with the visual image of gutting a fish.  One of the reasons that this idea appealed to me was that my "first time" was my first serious experience with the female genitalia, and in the piece I wanted to play with the awful stereotype of female genitals being compared to fish.  But the main idea which appealed to me in concept was the contradiction of the discovery of new flesh paired with the destruction of flesh.  The discovery of flesh could be epitomized by the first time a person has sexual intercourse; even if the participants came into the experience with a handy knowledge of their own and their partner's genitals, seeing this new use for their combined person would have been an incredible discovery. The destruction of flesh is a fear hard-wired in everybody; having a physicality predisposed towards being injured easily combined with the unavoidable mortality faced by all people makes the destruction of bodies (and especially flesh, our outermost layer of protection and means through which we feel the world) a very effecting concept.
              <br>
              <br>I would like to think that everybody's first sexual experience was a pleasant and exciting one, but realistically I know that is not true. This piece will end up contrasting not only discovery with destruction, but also pleasure with pain, trust with mistrust, and certainty with confusion.
              <br>
              <br><a class='nou programNotesClose' href='#'>[&#8211;]&nbsp;Close</a>
            </div>
            <a class='nou programNotesOpen' href='#'>[+]&nbsp;Program Notes</a>
          </div>
        <?php } elseif ($piece == 'stolen') { ?>
          <div id='pieceContent'>
            <h1>Stolen Thoughts, 2007</h1>
            <br>For Three Steel Drums and Tape, 7:54"
            <br>&nbsp;
            <br><object type='application/x-shockwave-flash' data='/js/player.swf' id='audioplayer1' height='24' width='290'>
              <param name='movie' value='/js/player.swf'>
              <param name='FlashVars' value='playerID=1&amp;bg=0xbbd199&amp;leftbg=0xf3f4d3&amp;lefticon=0x444444&amp;rightbg=0xf3f4d3&amp;rightbghover=0xdedfb5&amp;righticon=0x444444&amp;righticonhover=0x444444&amp;text=0x666666&amp;slider=0x666666&amp;track=0xFFFFFF&amp;border=0x666666&amp;loader=0xf3f4d3&amp;loop=no&amp;autostart=no&amp;soundFile=/media/composition/stolenthoughts.mp3'>
              <param name='quality' value='high'>
              <param name='menu' value='false'>
              <param name='wmode' value='transparent'>
            </object>
            <br>
            <br>Selected and recorded for Aural Capacity 2007, The Oberlin
            <br>Conservatory's bi-annual CD of student works
            <br>
            <br><a class='new-window' href='http://www.oberlin.edu/wwwcomm/ats/ats_jan02/profile.html'>Click here to read a press release about Aural Capacity</a>
            <br>
            <br><a href='/media/composition/Geraci_StolenThoughts_Score.pdf'>Click Here to See the Score (PDF)</a>
          </div>
        <?php } elseif ($piece == 'abstractToExact') { ?>
          <div id='pieceContent'>
            <h1>Abstract to Exact, 2006</h1>
            <br>For Tape, 1:00"
            <br>&nbsp;
            <br><object type='application/x-shockwave-flash' data='/js/player.swf' id='audioplayer1' height='24' width='290'>
              <param name='movie' value='/js/player.swf'>
              <param name='FlashVars' value='playerID=1&amp;bg=0xbbd199&amp;leftbg=0xf3f4d3&amp;lefticon=0x444444&amp;rightbg=0xf3f4d3&amp;rightbghover=0xdedfb5&amp;righticon=0x444444&amp;righticonhover=0x444444&amp;text=0x666666&amp;slider=0x666666&amp;track=0xFFFFFF&amp;border=0x666666&amp;loader=0xf3f4d3&amp;loop=no&amp;autostart=no&amp;soundFile=/media/composition/abstracttoexact.mp3'>
              <param name='quality' value='high'>
              <param name='menu' value='false'>
              <param name='wmode' value='transparent'>
            </object>
            <br>
            <br>Composed for the 2006 <a class='new-window' href='http://www.voxnovus.com/60x60.htm'>60x60 Festival</a>,
            <br>selected for the <a class='new-window' href='http://www.voxnovus.com/60x60/2006_Midwest_Minutes_Concert_Program.htm'>Midwest Minutes Mix</a>
          </div>
        <?php } elseif ($piece == 'home') { ?>
          <div id="pieceContent">
            <h1>Home is a Visuacoustic Space, 2006</h1>
            <br>for DVD and Stereo Audio, 10:48"
            <br>&nbsp;
            <br>&nbsp;
            <iframe src="http://player.vimeo.com/video/3194629?title=0&amp;byline=0&amp;portrait=0&amp;color=bbd199" width="400" height="307" frameborder="0"></iframe>
            <br>&nbsp;
            <br>&nbsp;
          </div>
        <?php } elseif ($piece == 'hollow') { ?>
          <div id='pieceContent'>
            <h1>Hollow Earth, 2006</h1>
            <br>For Tape, 5:59"
            <br>&nbsp;
            <br>&nbsp;
            <br><object type='application/x-shockwave-flash' data='/js/player.swf' id='audioplayer1' height='24' width='290'>
              <param name='movie' value='/js/player.swf'>
              <param name='FlashVars' value='playerID=1&amp;bg=0xbbd199&amp;leftbg=0xf3f4d3&amp;lefticon=0x444444&amp;rightbg=0xf3f4d3&amp;rightbghover=0xdedfb5&amp;righticon=0x444444&amp;righticonhover=0x444444&amp;text=0x666666&amp;slider=0x666666&amp;track=0xFFFFFF&amp;border=0x666666&amp;loader=0xf3f4d3&amp;loop=no&amp;autostart=no&amp;soundFile=/media/composition/hollowearth.mp3'>
              <param name='quality' value='high'>
              <param name='menu' value='false'>
              <param name='wmode' value='transparent'>
            </object>
            <br>
            <div class='programNotes'>
              <div class='aboutThePiece'>About the Piece</div>
              <br>On April 10, 1918, in a small town called Hamilton, Ohio, a man named John Symmes sent a pamphlet to every college and scholar whose address he could find.  This pamphlet outlined his theory of the earth, known officially as the Symmes Theory of Concentric Spheres and Polar Voids, which stated, "I declare the earth is hollow, and habitable within; containing a number of solid concentrick [sic] spheres, one within the other, and that it is open at the poles..."  He proclaimed in this short manifesto, and later throughout America while giving lectures, that near the north and south poles the ground gradually curved inwards towards the center of the earth and revealed within a series of smaller and smaller earths on which grew lush vegetation and was possibly even home to other races of humankind.  He used this theory to explain earthly phenomenon like weather patterns and tides (water pours in one hole and leaves the other, creating currents).  Though he lived by this theory for the rest of his life, and even gained enough momentum towards an expedition to the poles to submit a proposal to Congress in 1823 (voted down 56 to 46), relatively soon after his death in 1829 it vanished into obscurity.  This piece attempts to take the listener on a journey through one of the polar openings into the worlds within ours and back out through the crust of the earth.
              <br>
              <br><a class='nou programNotesClose' href='#'>[&#8211;]&nbsp;Close</a>
            </div>
            <a class='nou programNotesOpen' href='#'>[+]&nbsp;Program Notes</a>
          </div>
        <?php } elseif ($piece == 'blood') { ?>
          <div id="pieceContent">
            <h1>There is No Blood in a Dying World, 2004</h1>
            <br>for DVD and Stereo Audio, 16:06"
            <br>Concept and Music by John Bohnert
            <br>&nbsp;
            <br>&nbsp;
            <iframe src="http://player.vimeo.com/video/6657539?title=0&amp;byline=0&amp;portrait=0&amp;color=bbd199" width="400" height="300" frameborder="0"></iframe>
            <br>&nbsp;
            <br>&nbsp;
        <?php }  ?>
      </div>
      <div class='pieceBottomSpacer'>&nbsp;</div>
    </div>
    <?php include('includes/googleAnalytics.php'); ?>
  </body>
</html>