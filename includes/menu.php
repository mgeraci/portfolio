<ul id="menu">
  <li>
    <a class="bio<?php if (preg_match('/.+index.+/', $location)) { echo '_on'; } ?>" href="/">Bio/Resume</a>
  </li>
  <li>
    <a class="web<?php if (preg_match('/.+web.+/', $location)) { echo "_on"; } ?>" href="/web">Web Design</a>
  </li>
  <li>
    <a class="photo<?php if (preg_match('/.+photo.+/', $location)) { echo "_on"; } ?>" href="/photography">Photography</a>
  </li>
  <li>
    <a class="graphic<?php if (preg_match('/.+graphic.+/', $location)) { echo "_on"; } ?>" href="/graphic">Graphic Design</a>
  </li>
  <li>
    <a class="composition<?php if (preg_match('/.+composition.+/', $location)) { echo "_on"; } ?>" href="/composition">Compositions and Multimedia</a>
  </li>
  <li>
    <a class="recordings<?php if (preg_match('/.+recordings.+/', $location)) { echo "_on"; } ?>" href="/recordings">Recordings</a>
  </li>
  <li>
    <a class="links<?php if (preg_match('/.+links.+/', $location)) { echo "_on"; } ?>" style="margin-right: 0px;" href="/links">Links</a>
  </li>
</ul>