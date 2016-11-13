$(function(){
  preloadImages();
  audioPlayer();
});

preloadImages = function(){
  $(".image").each(function(){
    var container = $(this);
    var img = $("<img>");

    img.load(function() {
      container.html(img);
    }).attr("src", container.data("src"));
  });
}

audioPlayer = function(){
	var colors = {
		green: "bbd199",
		cream: "f3f4d3",
		text: "444444",
		green_light: "c8d9ac",
		cream_light: "dedfb5",
		text_light: "666666"
	}

  // documentation: http://wpaudioplayer.com/standalone/
  AudioPlayer.setup(window.location.protocol + "//albums-static.michaelgeraci.com/player.swf", {
    width: 290,
    transparentpagebg: "yes",
    noinfo: "yes",
    bg: colors.green,
    leftbg: colors.cream,
    lefticon: colors.text,
    rightbg: colors.cream,
    rightbghover: colors.cream_light,
    righticon: colors.text,
    righticonhover: colors.text,
    text: colors.text_light,
    slider: colors.text_light,
    track: colors.green_light,
    tracker: colors.cream,
    border: colors.green,
    loader: colors.cream
  });

  $(".audioplayer").each(function(){
    AudioPlayer.embed($(this).attr("id"), {
			soundFile: $(this).data("src")
		});
  });
}
