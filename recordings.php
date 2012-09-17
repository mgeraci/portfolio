<?php
  $piece = $_GET['piece'];

  // // H E A D // //
  $title = 'Michael P. Geraci - Recordings';

  switch ($piece) {
    case: 'me-and-jonah':
      $title .= ' - Me and Jonah';
    case 'dri':
      $title .= ' - dancerockinfinity';
      break;
    case 'dhh':
      $title .= ' - Death\'s Head Hearth';
      break;
    case 'obertones':
      $title .= ' - The Obertones';
      break;
    case 'amos':
      $title .= ' - Amos Payne';
      break;
    case 'guilty':
      $title .= ' - The Guilty Pleasures';
      break;
    case 'osteel':
      $title .= ' - Oberlin Steel';
      break;
    case 'icharge':
      $title .= ' - I Charge a Mile';
      break;
    case 'cellar':
      $title .= ' - Cellar Door';
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
      <div id="pageRecordings">
        <div id="pieceList">
          <ul>
            <li>
              <a <?php if ($piece == 'me-and-jonah') echo 'class="on"'?> href="/recordings/me-and-jonah">
                <h1>Me and Jonah, 2012</h1>
                <br>Playing Music in a Basement
              </a>
            </li>
            <li>
              <a <?php if ($piece == 'dri') echo 'class="on"'?> href="/recordings/dri">
                <h1>dancerockinfinity, 2007</h1>
                <br>An Electronic Duo
              </a>
            </li>
            <li>
              <a <?php if ($piece == 'dhh') echo 'class="on"'?> href="/recordings/dhh">
                <h1>Death's Head Hearth, 2007</h1>
                <br>Celtic + Metal + Waits
              </a>
            </li>
            <li>
              <a <?php if ($piece == 'obertones') echo 'class="on"'?> href="/recordings/obertones">
                <h1>The Obertones, 2006</h1>
                <br>12-Member A Capella Ensemble
              </a>
            </li>
            <li>
              <a <?php if ($piece == 'amos') echo 'class="on"'?> href="/recordings/amos">
                <h1>Amos Payne, 2006</h1><br>
                A 4-Piece with Some Extras
              </a>
            </li>
            <li>
              <a <?php if ($piece == 'guilty') echo 'class="on"'?> href="/recordings/guilty">
                <h1>The Guilty Pleasures, 2006</h1>
                <br>3-Piece Pop-Rock
              </a>
            </li>
            <li>
              <a <?php if ($piece == 'osteel') echo 'class="on"'?> href="/recordings/osteel">
                <h1>Oberlin Steel, 2005</h1>
                <br>A 16-Member Steel Drum Band
              </a>
            </li>
            <li>
              <a <?php if ($piece == 'icharge') echo 'class="on"'?> href="/recordings/icharge">
                <h1>I Charge a Mile, 2005-2006</h1>
                <br>A Solo Artist, Multitracked
              </a>
            </li>
            <li>
              <a <?php if ($piece == 'cellar') echo 'class="on"'?> href="/recordings/cellar">
                <h1>Cellar Door, 2005</h1>
                <br>3-Piece Rock
              </a>
            </li>
          </ul>
        </div>
        <?php if ($piece == 'me-and-jonah') { ?>
          <div id='pieceContent'>
            <h1>Me and Jonah, 2012</h1>
            <div class='clearBreak'><br></div>
            <div id='rImage'>
              <img class='recordings' src='/images/recordings/me-and-jonah.jpg' alt='Me and Jonah'>
            </div>
            <div id='rInfo'>
              Recorded in my Basement
              <br>
              <br><span class='song'>Old Stanky</span>
              <br><object type='application/x-shockwave-flash' data='/js/player.swf' id='audioplayer1' height='24' width='290'>
                <param name='movie' value='/js/player.swf'>
                <param name='FlashVars' value='playerID=1&amp;bg=0xbbd199&amp;leftbg=0xf3f4d3&amp;lefticon=0x444444&amp;rightbg=0xf3f4d3&amp;rightbghover=0xdedfb5&amp;righticon=0x444444&amp;righticonhover=0x444444&amp;text=0x666666&amp;slider=0x666666&amp;track=0xFFFFFF&amp;border=0x666666&amp;loader=0xf3f4d3&amp;loop=no&amp;autostart=no&amp;soundFile=/media/music/OldStanky.mp3'>
                <param name='quality' value='high'>
                <param name='menu' value='false'>
                <param name='wmode' value='transparent'>
              </object>
            </div>
          </div>
        <?php elseif ($piece == 'dri') { ?>
          <div id='pieceContent'>
            <h1>dancerockinfinity, 2007</h1>
            <div class='clearBreak'><br></div>
            <div id='rImage'>
              <a class='new-window' href='http://www.myspace.com/dancerockinfinity'><img src='/images/recordings/dancerockinfinity.jpg' alt='dancerockinfinity'></a>
            </div>
            <div id='rInfo'>
              <span class='line'>Recorded in The Cacatbox Cacommune with John Bohnert</span>
              <br>Mixed and edited in the Timara Studios, Oberlin Conservatory of Music
              <br>
              <br><span class='song'>Come to the Show<br></span>
              <object type='application/x-shockwave-flash' data='/js/player.swf' id='audioplayer1' height='24' width='290'>
                <param name='movie' value='/js/player.swf'>
                <param name='FlashVars' value='playerID=1&amp;bg=0xbbd199&amp;leftbg=0xf3f4d3&amp;lefticon=0x444444&amp;rightbg=0xf3f4d3&amp;rightbghover=0xdedfb5&amp;righticon=0x444444&amp;righticonhover=0x444444&amp;text=0x666666&amp;slider=0x666666&amp;track=0xFFFFFF&amp;border=0x666666&amp;loader=0xf3f4d3&amp;loop=no&amp;autostart=no&amp;soundFile=/media/music/ComeToTheShow.mp3'>
                <param name='quality' value='high'>
                <param name='menu' value='false'>
                <param name='wmode' value='transparent'>
              </object>
              <br>
              <br><span class='song'>Grind<br></span>
              <object type='application/x-shockwave-flash' data='/js/player.swf' id='audioplayer2' height='24' width='290'>
                <param name='movie' value='/js/player.swf'>
                <param name='FlashVars' value='playerID=2&amp;bg=0xbbd199&amp;leftbg=0xf3f4d3&amp;lefticon=0x444444&amp;rightbg=0xf3f4d3&amp;rightbghover=0xdedfb5&amp;righticon=0x444444&amp;righticonhover=0x444444&amp;text=0x666666&amp;slider=0x666666&amp;track=0xFFFFFF&amp;border=0x666666&amp;loader=0xf3f4d3&amp;loop=no&amp;autostart=no&amp;soundFile=/media/music/Grind.mp3'>
                <param name='quality' value='high'>
                <param name='menu' value='false'>
                <param name='wmode' value='transparent'>
              </object>
            </div>
            <div class='clearBreak'><br></div>
            <div class='programNotes'>
              <br><div class='aboutThePiece'>About These Recordings</div>
              <br>
              <br>Studios: The Cacatbox Cacommune, Timara Studio 1, Oberlin Conservatory of Music
              <br>Engineer: Michael P. Geraci
              <br>Hardware: Pro Tools HD with Icon D-Control Board through Dynaudio BM 6A MKIIs, Pro Tools LE with 002 interface, Presonus Firepod, Electrix WarpFactory Vocoder
              <br>Software: Pro Tools HD, Pro Tools LE,  Fruity Loops, Buzz, and Ableton Live
              <br>
              <br>We began this process by individually tracking our parts at the Cacatbox Cacommune.
              <br>
              <br>Bass:
              <br>Direct in to the 002, processed in Pro Tools LE
              <br>
              <br>Vocals:
              <br>Tracked by John Bohnert with a Marshall Electronics MXL 2001 into the Firepod
              <br>Vocoded in Fruity Loops and with the WarpFactory
              <br>
              <br>We then individually bounced the instrumental tracks from Buzz and Live, and brought the sessions to the Timara Studio for mixing and mastering.
              <br>
              <br><a class='nou programNotesClose' href='#'>[&#8211;]&nbsp;Close</a>
            </div>
            <a class='nou programNotesOpen' href='#'>[+]&nbsp;About These Recordings</a>
          </div>
        <?php } elseif ($piece == 'dhh') { ?>
          <div id='pieceContent'>
            <h1>Death's Head Hearth, 2007</h1>
            <div class='clearBreak'><br></div>
            <div id='rImage'>
              <a class='new-window' href='http://profile.myspace.com/deathsheadhearth'><img src='/images/recordings/dhh.jpg' alt='Deaths Head Hearth'></a>
            </div>
            <div id='rInfo'>
              <span class='line'>Drums recorded in the Timara Studios, Oberlin Conservatory of Music</span>
              <span class='line'>Other instruments and vocals recorded by Jordan Bartee in his home studio</span>
              <br>Mixed and edited with Jordan Bartee in the Timara Studios
              <br>
              <br><span class='song'>Beneath the Bow</span>
              <br><object type='application/x-shockwave-flash' data='/js/player.swf' id='audioplayer1' height='24' width='290'>
                <param name='movie' value='/js/player.swf'>
                <param name='FlashVars' value='playerID=1&amp;bg=0xbbd199&amp;leftbg=0xf3f4d3&amp;lefticon=0x444444&amp;rightbg=0xf3f4d3&amp;rightbghover=0xdedfb5&amp;righticon=0x444444&amp;righticonhover=0x444444&amp;text=0x666666&amp;slider=0x666666&amp;track=0xFFFFFF&amp;border=0x666666&amp;loader=0xf3f4d3&amp;loop=no&amp;autostart=no&amp;soundFile=/media/music/BeneathTheBow.mp3'>
                <param name='quality' value='high'>
                <param name='menu' value='false'>
                <param name='wmode' value='transparent'>
              </object>
              <br>  
              <br><span class='song'>Repeat</span>
              <br><object type='application/x-shockwave-flash' data='/js/player.swf' id='audioplayer2' height='24' width='290'>
                <param name='movie' value='/js/player.swf'>
                <param name='FlashVars' value='playerID=2&amp;bg=0xbbd199&amp;leftbg=0xf3f4d3&amp;lefticon=0x444444&amp;rightbg=0xf3f4d3&amp;rightbghover=0xdedfb5&amp;righticon=0x444444&amp;righticonhover=0x444444&amp;text=0x666666&amp;slider=0x666666&amp;track=0xFFFFFF&amp;border=0x666666&amp;loader=0xf3f4d3&amp;loop=no&amp;autostart=no&amp;soundFile=/media/music/Repeat.mp3'>
                <param name='quality' value='high'>
                <param name='menu' value='false'>
                <param name='wmode' value='transparent'>
              </object>
            </div>
            <div class='clearBreak'><br></div>
            <div class='programNotes'>
              <br><div class='aboutThePiece'>About These Recordings</div>
              <br>
              <br><i>this information is applicable to the drums and mix/master process only</i>
              <br>
              <br>Studio: Timara Studios 1 &amp; 2, Oberlin Conservatory of Music
              <br>Engineer: Michael P. Geraci
              <br>Hardware: Pro Tools HD with Icon D-Control Board through Dynaudio BM 6A MKIIs
              <br>Software: Pro Tools HD
              <br>
              <br>The Ayotte drum kit was set up in the center of the live room and surrounded by tall gobos at the front diagonal edges and behind, and short ones in front and on the back right side to cut down on the room sound.  All gobos were 3-4' away from the kit.
              <br>
              <br>The mic array was as follows:
              <br>
              <br>Bass: Groove Tube GT67, 2' off axis
              <br>Snare: Shure SM57, 4' away from top at 45°
              <br>Hi-Hat: Shure SM81 with Cardioid Head, 5' at 45°
              <br>Hi, Mid, and Floor Toms: 3 Sennheiser MD 421 IIs, each 5' at 45°
              <br>Overheads: Neumann KM183 stereo pair in the Recorderman configuration*
              <br>Room Mics: Oktava MK 012 stereo pair in ORTF, 10' away, 4.5' high, pointed slightly down
              <br>
              <br>Aesthetics called for heavy drum processing in the mixdown.
              <br>
              <br>
              <br>* <i>The first mic is placed so that it is directly above the snare drum and pointing directly at it, then the second mic is placed where it the distances to the snare and kick are the same as with the first mic.  This puts the second mic around the drummer's right shoulder, pointing towards the toms.  This setup is very well balanced and ensures that the drum mics are in phase.</i>
              <br>
              <br><a class='nou programNotesClose' href='#'>[&#8211;]&nbsp;Close</a>
            </div>
            <a class='nou programNotesOpen' href='#'>[+]&nbsp;About These Recordings</a>
          </div>
        <?php } elseif ($piece == 'obertones') { ?>
          <div id='pieceContent'>
            <h1>The Obertones, 2007</h1>
            <div class='clearBreak'><br></div>
            <div id='rImage'>
              <a class='new-window' href='http://www.oberlin.edu/stuorg/obertone/'><img src='/images/recordings/obertones.jpg' alt='The Obertones'></a>
            </div>
            <div id='rInfo'>
              Recorded in the Timara Studios, Oberlin Conservatory of Music
              <br>
              <br><span class='song'>Africa</span>
              <br><object type='application/x-shockwave-flash' data='/js/player.swf' id='audioplayer1' height='24' width='290'>
                <param name='movie' value='/js/player.swf'>
                <param name='FlashVars' value='playerID=1&amp;bg=0xbbd199&amp;leftbg=0xf3f4d3&amp;lefticon=0x444444&amp;rightbg=0xf3f4d3&amp;rightbghover=0xdedfb5&amp;righticon=0x444444&amp;righticonhover=0x444444&amp;text=0x666666&amp;slider=0x666666&amp;track=0xFFFFFF&amp;border=0x666666&amp;loader=0xf3f4d3&amp;loop=no&amp;autostart=no&amp;soundFile=/media/music/Africa.mp3'>
                <param name='quality' value='high'>
                <param name='menu' value='false'>
                <param name='wmode' value='transparent'>
              </object>
              <br>  
              <br><span class='song'>Babylon</span>
              <br><object type='application/x-shockwave-flash' data='/js/player.swf' id='audioplayer2' height='24' width='290'>
                <param name='movie' value='/js/player.swf'>
                <param name='FlashVars' value='playerID=2&amp;bg=0xbbd199&amp;leftbg=0xf3f4d3&amp;lefticon=0x444444&amp;rightbg=0xf3f4d3&amp;rightbghover=0xdedfb5&amp;righticon=0x444444&amp;righticonhover=0x444444&amp;text=0x666666&amp;slider=0x666666&amp;track=0xFFFFFF&amp;border=0x666666&amp;loader=0xf3f4d3&amp;loop=no&amp;autostart=no&amp;soundFile=/media/music/Babylon.mp3'>
                <param name='quality' value='high'>
                <param name='menu' value='false'>
                <param name='wmode' value='transparent'>
              </object>
            </div>
            <div class='clearBreak'><br></div>
            <div class='programNotes'>
                <br><div class='aboutThePiece'>About These Recordings</div>
              <br>
              <br>Studio: Timara Studios 1 &amp; 2, Oberlin Conservatory of Music
              <br>Engineer: Michael P. Geraci
              <br>Hardware: Pro Tools HD with Icon D-Control Board through Dynaudio BM 6A MKIIs
              <br>Software: Pro Tools HD
              <br>
              <br>The 12-person ensemble was recorded together for a result which had as few edits and most resembled hearing the group live.  The group stood in their typical semicircle arrangement, and was miked with a pair of Oktava MK 012s in an ORTF configuration at head level, about 15' away from the group.  This resulted in a very natural sound.  The soloist stood at the front of the semicircle and was miked with a Groove Tube GT67 and pop guard.  The vocal percussionist stood on one end of the semicircle was miked with an Audio Technica 4041 and pop filter.
              <br>
              <br>In the mixdown, slight compression was added to the ensemble track, and a more pronounced compression to the solo.  The vocal percussion got some eq and compression to even the sibilance.  The whole mix was processed with RVerb to mimic the sound of the small churches and chapels in which the Obertones usually perform.
              <br>
              <br><a class='nou programNotesClose' href='#'>[&#8211;]&nbsp;Close</a>
            </div>
            <a class='nou programNotesOpen' href='#'>[+]&nbsp;About These Recordings</a>
          </div>
        <?php } elseif ($piece == 'amos') { ?>
          <div id='pieceContent'>
            <h1>Amos Payne, 2006</h1>
            <div class='clearBreak'><br></div>
            <div id='rImage'>
              <a class='new-window' href='http://profile.myspace.com/amospayne'><img src='/images/recordings/amospayne.jpg' alt='Amos Payne'></a>
            </div>
            <div id='rInfo'>
              Recorded in the Timara Studios, Oberlin Conservatory of Music
              <br>
              <br><span class='song'>Maze Song</span>
              <br><object type='application/x-shockwave-flash' data='/js/player.swf' id='audioplayer1' height='24' width='290'>
                <param name='movie' value='/js/player.swf'>
                <param name='FlashVars' value='playerID=1&amp;bg=0xbbd199&amp;leftbg=0xf3f4d3&amp;lefticon=0x444444&amp;rightbg=0xf3f4d3&amp;rightbghover=0xdedfb5&amp;righticon=0x444444&amp;righticonhover=0x444444&amp;text=0x666666&amp;slider=0x666666&amp;track=0xFFFFFF&amp;border=0x666666&amp;loader=0xf3f4d3&amp;loop=no&amp;autostart=no&amp;soundFile=/media/music/MazeSong.mp3'>
                <param name='quality' value='high'>
                <param name='menu' value='false'>
                <param name='wmode' value='transparent'>
              </object>
              <br>  
              <br><span class='song'>Red and Blue</span>
              <br><object type='application/x-shockwave-flash' data='/js/player.swf' id='audioplayer2' height='24' width='290'>
                <param name='movie' value='/js/player.swf'>
                <param name='FlashVars' value='playerID=2&amp;bg=0xbbd199&amp;leftbg=0xf3f4d3&amp;lefticon=0x444444&amp;rightbg=0xf3f4d3&amp;rightbghover=0xdedfb5&amp;righticon=0x444444&amp;righticonhover=0x444444&amp;text=0x666666&amp;slider=0x666666&amp;track=0xFFFFFF&amp;border=0x666666&amp;loader=0xf3f4d3&amp;loop=no&amp;autostart=no&amp;soundFile=/media/music/RedAndBlue.mp3'>
                <param name='quality' value='high'>
                <param name='menu' value='false'>
                <param name='wmode' value='transparent'>
              </object>
              <br>
            </div>
            <div class='clearBreak'><br></div>
            <div class='programNotes'>
                <br><div class='aboutThePiece'>About These Recordings</div>
              <br>
              <br>Studios: Timara Studios 1 and 2, Oberlin Conservatory of Music
              <br>Engineer: Michael P. Geraci
              <br>Hardware: Pro Tools HD, Icon D-Control Board
              <br>Software: Pro Tools HD
              <br>
              <br>The main ensemble of drums, bass, and guitar were recorded together:
              <br>
              <br>Guitar 1:
              <br>Audio Technica AT 4033 on axis, 4' from cabinet
              <br>
              <br>Guitar 2:
              <br>Oktava MK 012 with Cardioid Head off axis, 2' from cabinet
              <br>
              <br>Bass:
              <br>Oktava MK 012 with Omni Head on axis, 4' from cabinet
              <br>
              <br>Drums:
              <br>Shure Beta 52 A on Kick
              <br>Shure SM 57 on Snare
              <br>AT 4033 on Hat
              <br>2x Sennheiser MD 421 II on Toms
              <br>2x Neumann KM 183 as Overheads
              <br>
              <br>After this ensemble recording, selecting the takes, and doing a few edits to get a rough version of the final ensemble cut we tracked instrumental overdubs like the electric piano on Red and Blue and Maze Song (AT 4033 on axis, 2' from cabinet) and Saxophone on Maze Song (Neumann KM 183 off axis from bell, 1' away).
              <br>
              <br>Finally,the vocals were tracked in a gobo booth set up in the live room with a Groove Tube GT 67 tube condenser, 1.5' away, on axis with pop filter.
              <br>
              <br><a class='nou programNotesClose' href='#'>[&#8211;]&nbsp;Close</a>
            </div>
            <a class='nou programNotesOpen' href='#'>[+]&nbsp;About These Recordings</a>
          </div>
        <?php } elseif ($piece == 'guilty') { ?>
          <div id='pieceContent'>
            <h1>The Guilty Pleasures, 2007</h1>
            <div class='clearBreak'><br></div>
            <div id='rImage'>
              <a class='new-window' href='http://profile.myspace.com/theguiltypleasuresband'><img class='recordings' src='/images/recordings/guiltypleasures.jpg' alt='The Guilty Pleasures'></a>
            </div>
            <div id='rInfo'>
              Recorded in the Timara Studios, Oberlin Conservatory of Music
              <br>
              <br><span class='song'>California</span>
              <br><object type='application/x-shockwave-flash' data='/js/player.swf' id='audioplayer1' height='24' width='290'>
                <param name='movie' value='/js/player.swf'>
                <param name='FlashVars' value='playerID=1&amp;bg=0xbbd199&amp;leftbg=0xf3f4d3&amp;lefticon=0x444444&amp;rightbg=0xf3f4d3&amp;rightbghover=0xdedfb5&amp;righticon=0x444444&amp;righticonhover=0x444444&amp;text=0x666666&amp;slider=0x666666&amp;track=0xFFFFFF&amp;border=0x666666&amp;loader=0xf3f4d3&amp;loop=no&amp;autostart=no&amp;soundFile=/media/music/California.mp3'>
                <param name='quality' value='high'>
                <param name='menu' value='false'>
                <param name='wmode' value='transparent'>
              </object>
            </div>
          </div>
        <?php } elseif ($piece == 'osteel') { ?>
          <div id='pieceContent'>
            <h1>Oberlin Steel, 2006</h1>
            <div class='clearBreak'><br></div>
            <div id='rImage'>
              <a class='new-window' href='http://www.oberlin.edu/stuorg/osteel/'><img class='recordings' src='/images/recordings/osteel.jpg' alt='Oberlin Steel'></a>
            </div>
            <div id='rInfo'>
              Recorded on site in the Oberlin Steel Panyard
              <br>
              <br><span class='song'>Woman is Boss</span>
              <br><object type='application/x-shockwave-flash' data='/js/player.swf' id='audioplayer1' height='24' width='290'>
                <param name='movie' value='/js/player.swf'>
                <param name='FlashVars' value='playerID=1&amp;bg=0xbbd199&amp;leftbg=0xf3f4d3&amp;lefticon=0x444444&amp;rightbg=0xf3f4d3&amp;rightbghover=0xdedfb5&amp;righticon=0x444444&amp;righticonhover=0x444444&amp;text=0x666666&amp;slider=0x666666&amp;track=0xFFFFFF&amp;border=0x666666&amp;loader=0xf3f4d3&amp;loop=no&amp;autostart=no&amp;soundFile=/media/music/WomanIsBoss.mp3'>
                <param name='quality' value='high'>
                <param name='menu' value='false'>
                <param name='wmode' value='transparent'>
              </object>
              <br>  
              <br><span class='song'>Guitar Pan</span>
              <br><object type='application/x-shockwave-flash' data='/js/player.swf' id='audioplayer2' height='24' width='290'>
                <param name='movie' value='/js/player.swf'>
                <param name='FlashVars' value='playerID=2&amp;bg=0xbbd199&amp;leftbg=0xf3f4d3&amp;lefticon=0x444444&amp;rightbg=0xf3f4d3&amp;rightbghover=0xdedfb5&amp;righticon=0x444444&amp;righticonhover=0x444444&amp;text=0x666666&amp;slider=0x666666&amp;track=0xFFFFFF&amp;border=0x666666&amp;loader=0xf3f4d3&amp;loop=no&amp;autostart=no&amp;soundFile=/media/music/GuitarPan.mp3'>
                <param name='quality' value='high'>
                <param name='menu' value='false'>
                <param name='wmode' value='transparent'>
              </object>
            </div>
            <div class='clearBreak'><br></div>
            <div class='programNotes'>
                <br><div class='aboutThePiece'>About These Recordings</div>
              <br>
              <br>Studio: On Site in the Oberlin Steel Panyard
              <br>Engineer: Michael P. Geraci
              <br>Hardware: Digidesign 002 Interface
              <br>Software: Pro Tools LE
              <br>
              <br>Recording a 16 person steel band was an interesting challenge.  Many of the best recordings of bands from Trinidad are done outside with very simple microphone arrays.  I originally planned to emulate this by finding a suitable outside space, but the weather, wind, and noise would not cooperate to that end. I ended up doing the recording in the Oberlin Steel panyard, their practice space, which is a 50' x 30' concrete room with a thin carpet on the floor. I put up some acoustic foam and blankets to help dampen the very loud sound of the room, and put the percussion section in the back in a small fort of blankets and foam to help lower their volume.
              <br>
              <br>I began with a stereo pair of Audio Techina 4041s in an ORTF configuration, about 7' away from the band, raised about 8.5' off the ground, and angled down towards the back of the group.  This sounded great for the bass and percussion which are towards the back, but the front line of the group was not present enough. I then added another stereo pair of 4041s in ORTFF, the same distance from the band, but raised only 3.5' and pointed straight forward.
              <br>
              <br>These recordings were mastered by Paul Zinman at SoundByte Productions, Inc.
              <br>
              <br><a class='nou programNotesClose' href='#'>[&#8211;]&nbsp;Close</a>
            </div>
            <a class='nou programNotesOpen' href='#'>[+]&nbsp;About These Recordings</a>
          </div>
        <?php } elseif ($piece == 'icharge') { ?>
          <div id='pieceContent'>
            <h1>I Charge a Mile, 2005-2006</h1>
            <div class='clearBreak'><br></div>
            <div id='rImage'>
              <img class='recordings' src='/images/recordings/icharge.jpg' alt='I Charge a Mile'>
            </div>
            <div id='rInfo'>
              Recorded in my home studio
              <br>
              <br><span class='song'>Traveling</span>
              <br><object type='application/x-shockwave-flash' data='/js/player.swf' id='audioplayer1' height='24' width='290'>
                <param name='movie' value='/js/player.swf'>
                <param name='FlashVars' value='playerID=1&amp;bg=0xbbd199&amp;leftbg=0xf3f4d3&amp;lefticon=0x444444&amp;rightbg=0xf3f4d3&amp;rightbghover=0xdedfb5&amp;righticon=0x444444&amp;righticonhover=0x444444&amp;text=0x666666&amp;slider=0x666666&amp;track=0xFFFFFF&amp;border=0x666666&amp;loader=0xf3f4d3&amp;loop=no&amp;autostart=no&amp;soundFile=/media/music/Traveling.mp3'>
                <param name='quality' value='high'>
                <param name='menu' value='false'>
                <param name='wmode' value='transparent'>
              </object>
              <br>  
              <br><span class='song'>We'll Be It</span>
              <br><object type='application/x-shockwave-flash' data='/js/player.swf' id='audioplayer2' height='24' width='290'>
                <param name='movie' value='/js/player.swf'>
                <param name='FlashVars' value='playerID=2&amp;bg=0xbbd199&amp;leftbg=0xf3f4d3&amp;lefticon=0x444444&amp;rightbg=0xf3f4d3&amp;rightbghover=0xdedfb5&amp;righticon=0x444444&amp;righticonhover=0x444444&amp;text=0x666666&amp;slider=0x666666&amp;track=0xFFFFFF&amp;border=0x666666&amp;loader=0xf3f4d3&amp;loop=no&amp;autostart=no&amp;soundFile=/media/music/WellBeIt.mp3'>
                <param name='quality' value='high'>
                <param name='menu' value='false'>
                <param name='wmode' value='transparent'>
              </object>
              <br>
              <br><span class='song'>Shadow Dancing</span>
              <br><object type='application/x-shockwave-flash' data='/js/player.swf' id='audioplayer3' height='24' width='290'>
                <param name='movie' value='/js/player.swf'>
                <param name='FlashVars' value='playerID=3&amp;bg=0xbbd199&amp;leftbg=0xf3f4d3&amp;lefticon=0x444444&amp;rightbg=0xf3f4d3&amp;rightbghover=0xdedfb5&amp;righticon=0x444444&amp;righticonhover=0x444444&amp;text=0x666666&amp;slider=0x666666&amp;track=0xFFFFFF&amp;border=0x666666&amp;loader=0xf3f4d3&amp;loop=no&amp;autostart=no&amp;soundFile=/media/music/ShadowDancing.mp3'>
                <param name='quality' value='high'>
                <param name='menu' value='false'>
                <param name='wmode' value='transparent'>
              </object>
            </div>
            <div class='clearBreak'><br></div>
            <div class='programNotes'>
                <br><div class='aboutThePiece'>About Recording Traveling</div>
              <br>
              <br>Studio: My Basement
              <br>Engineer: Michael P. Geraci
              <br>Hardware: Digidesign 002
              <br>Software: Pro Tools LE
              <br>
              <br>Since I Charge a Mile is just me, I recorded all the parts separately, multi-tracking and building up.  Here's what I used:
              <br>
              <br>Drums:
              <br>Shure SM 57 on Kick
              <br>Marshall Electronics MXL 2001 on Snare
              <br>2x Oktava MK 012 with omni heads as Overheads, in the Recorderman configuration *.
              <br>
              <br>Bass:
              <br>Oktava MK 012 with omni head, on axis and 3' away from cabinet
              <br>
              <br>Acoustic Guitars:
              <br>2x Oktava MK 012 with cardioid heads in ORTF configuration, 2' away from the body
              <br>
              <br>Electric Guitars:
              <br>Marshall Electronics MXL 2001, on axis 4' away from cabinet for rhythm and 5' away for solo
              <br>
              <br>Vocals
              <br>Marshall Electronics MXL 2001, on axis 1' away, in a closet
              <br>
              <br>
              <br>* <i>The first mic is placed so that it is directly above the snare drum and pointing directly at it, then the second mic is placed where it the distances to the snare and kick are the same as with the first mic.  This puts the second mic around the drummer's right shoulder, pointing towards the toms.  This setup is very well balanced and ensures that the drum mics are in phase.</i>
              <br>
              <br><a class='nou programNotesClose' href='#'>[&#8211;]&nbsp;Close</a>
            </div>
            <a class='nou programNotesOpen' href='#'>[+]&nbsp;About These Recordings</a>
          </div>
        <?php } elseif ($piece == 'cellar') { ?>
          <div id='pieceContent'>
            <h1>Cellar Door, 2005</h1>
            <div class='clearBreak'><br></div>
            <div id='rImage'>
              <img class='recordings' src='/images/recordings/cellardoor.jpg' alt='Cellar Door'>
            </div>
            <div id='rInfo'>
              Recorded in the Timara Studios, Oberlin Conservatory of Music
              <br>
              <br><span class='song'>Watching the Sky</span>
              <br><object type='application/x-shockwave-flash' data='/js/player.swf' id='audioplayer1' height='24' width='290'>
                <param name='movie' value='/js/player.swf'>
                <param name='FlashVars' value='playerID=1&amp;bg=0xbbd199&amp;leftbg=0xf3f4d3&amp;lefticon=0x444444&amp;rightbg=0xf3f4d3&amp;rightbghover=0xdedfb5&amp;righticon=0x444444&amp;righticonhover=0x444444&amp;text=0x666666&amp;slider=0x666666&amp;track=0xFFFFFF&amp;border=0x666666&amp;loader=0xf3f4d3&amp;loop=no&amp;autostart=no&amp;soundFile=/media/music/WatchingTheSky.mp3'>
                <param name='quality' value='high'>
                <param name='menu' value='false'>
                <param name='wmode' value='transparent'>
              </object>
            </div>
          </div>
        <?php }  ?>
      </div>
      <div class='pieceBottomSpacer'>&nbsp;</div>
    </div>
    <?php include('includes/googleAnalytics.php'); ?>
  </body>
</html>
