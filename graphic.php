<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html>
	<?php
		// // H E A D // //
		$title = 'Michael P. Geraci - Graphic Design';

		// gets the location of the page and assigns it to $location
		// format is /page.php
		$location = $_SERVER['PHP_SELF'];

		include("includes/head.php");

    include('includes/galleryFunctions.php');
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
			<div id="pageGraphic">
				<?php
					// connect to the database
					include('includes/connect.php');
					
					// // // Get the piece number of the most current photo (assigned to $max) // // //

					$query = "SELECT max(number) as max FROM `graphic`";

					if ($query) {
						$result = mysql_query($query);
						if (!$result) {
							echo 'Could not run query: ' . mysql_error();
							exit;
						}
					}
			
					while ($row = mysql_fetch_assoc($result)){
						$max = $row["max"];
					}

					$section = $_GET["section"];
					$piece = $_GET["piece"];

					// if there's no piece, set it to max
					if (!$piece) {
						$piece = $max;
					}

					// get the page number based on the piece number, subtract 1 because they start with 0
					$page = ceil(($max + 1 - $piece)/12) - 1;
					$limit = $page * 12;


					// // // Thumbnail Section // // //

					echo '<div id="galleryThumbs">';
            // validate input
						if (is_numeric($page) && $page >= 0 && $page < ($max/12)) {
							$query = "SELECT id, number FROM graphic ORDER BY number DESC LIMIT $limit, 12";	// retrieve thumbnails based on section and page

							if ($query) {
								$result = mysql_query($query);
								if (!$result) {
									echo 'Could not run query: ' . mysql_error();
									exit;
								}
							}

						} else {
							echo 'Please click <a href="/graphic/' . $max . '">here</a> to return to Graphic Design';
							exit;
						}
			
						// Thumbnail Navigation
            thumbnailPages('graphic', $page, $max, '');

						// Display Thumbnails
            displayThumbs('graphic', $piece, $result, '');

					echo '</div>';
			
					// // // Content // // //

					if (is_numeric($piece) && $piece > 0 && $piece <= $max) {	// validate input
	
						// Get picture info and assign to variables
						$query = "SELECT id, title, year, width, height, info FROM graphic WHERE number=$piece";
		
						if ($query) {
							$result = mysql_query($query);
							if (!$result) {
								echo 'Could not run query: ' . mysql_error();
								exit;
							}
						}
	
						while ($row = mysql_fetch_assoc($result)){
							$theId = $row["id"];
							$theTitle = $row["title"];
							$theYear = $row["year"];
							$theWidth = $row["width"];
							$theHeight = $row["height"];
							$info = $row["info"];
						}

						echo '<div id="galleryContent" style="width: ' . $theWidth . 'px;">';
              // left and right arrows
              pictureArrows('graphic', $piece, $max, '');

							// The picture
              imageLoader('graphic', $theId, $theWidth, $theHeight, $theTitle, '');

							// picture information
							echo '<div id="pictureInfo">';
								echo $theTitle . '
									<br>' . $info . '
									<br><i>' . $theYear . '</i>';
							echo '<div>';
						echo '</div>';
		
					} else {
						echo '
							<div id="pieceContent">
								<br><br><span id="clickThumbnail">Please Click a Thumbnail to the Left</span>
							</div>
						';
					}
				?>
			</div>
		</div>
		<?php include('includes/googleAnalytics.php'); ?>
  </body>
</html>