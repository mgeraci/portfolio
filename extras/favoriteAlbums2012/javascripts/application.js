$(function(){
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
