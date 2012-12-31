$(function(){
  preloadImages()

  // only allow one audio to play at a time
  $('.song_wrapper').click(function(e){
    e.preventDefault();
    audio = $(this).find('audio')[0];
    if (audio.paused) {
      // control
      $('.control').removeClass('playing')
      $(this).find('.control').addClass('playing')

      // audio
      $("audio").not(audio).each(function(){$(this)[0].pause()});
      audio.currentTime = 0
      audio.play();
    } else {
      $(this).find('.control').removeClass('playing')
      audio.pause();
    }
  });
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
