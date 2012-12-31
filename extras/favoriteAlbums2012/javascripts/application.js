$(function(){
  preloadImages()
  audioPlayer()
});

preloadImages = function(){
  $('.image').each(function(){
    var container, img;
    container = $(this);
    img = $('<img>');
    img.load(function() {
      container.html(img);
    }).attr('src', container.data('src'));
  });
}

audioPlayer = function(){
  // http://wpaudioplayer.com/standalone/
  AudioPlayer.setup(window.location.origin + "/extras/favoriteAlbums2012/javascripts/player.swf", {
    width: 290,
    transparentpagebg: 'yes',
    noinfo: 'yes',
    bg: 'bbd199',
    leftbg: 'f3f4d3',
    lefticon: '444444',
    rightbg: 'f3f4d3',
    rightbghover: 'dedfb5',
    righticon: '444444',
    righticonhover: '444444',
    text: '666666',
    slider: '666666',
    track: 'c8d9ac',
    tracker: 'f3f4d3',
    border: 'bbd199',
    loader: 'f3f4d3'
  });

  $('.audioplayer').each(function(){
    AudioPlayer.embed($(this).attr('id'), {soundFile: $(this).data('src')});
  });
}
