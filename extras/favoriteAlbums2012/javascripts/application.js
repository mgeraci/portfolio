$(function(){
  // only allow one audio to play at a time
  $("a.play").click(function(e){
    e.preventDefault();
    audio = $(this).prev()[0];
    if (audio.paused) {
      audio.play();
      $("audio").not(audio).each(function(){$(this)[0].pause()});
    } else {
      audio.pause();
    }
  });
});
