$(function(){
  // only allow one audio to play at a time
  $('.control').click(function(e){
    e.preventDefault();
    audio = $(this).prev()[0];
    if (audio.paused) {
      // control
      $('.control').removeClass('playing')
      $(this).addClass('playing')

      // audio
      $("audio").not(audio).each(function(){$(this)[0].pause()});
      audio.currentTime = 0
      audio.play();
    } else {
      $(this).removeClass('playing')
      audio.pause();
    }
  });
});
