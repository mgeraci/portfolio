<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html>
	<?php
		// // H E A D // //
		$title = 'Michael P. Geraci - Web Design, Graphic Design, User Experience';

		// gets the location of the page and assigns it to $location
		// format is /page.php
		$location = $_SERVER['PHP_SELF'];

		include("includes/head.php");
	?>
	<body>
		<div id="outer">
			<ul id="index">
				<li class="index1">
					<a class="bio" href="/bio">Bio/Resume</a>
				</li>
				<li class="index4">
					<a class="composition" href="/composition">Compositions</a>
				</li>
				<li class="index3">
					<a class="recordings" href="/recordings">Recordings</a>
				</li>
				<li class="index6">
					<a class="graphic" href="/graphic">Graphic Design</a>
				</li>
				<li class="index7">
					<a class="photo" href="/photography">Photography</a>
				</li>
				<li class="index2">
					<a class="web" href="/web">Web Design</a>
				</li>
				<li class="index5">
					<a class="links" href="/links">Links</a>
				</li>
			</ul>
		</div>
		<?php include('includes/googleAnalytics.php'); ?>
	</body>
</html>