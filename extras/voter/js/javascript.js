$(function(){
	setVote();
});

function setVote(){
	$('.voter').click(function(){
		$('#voteElement').val($(this).attr('id'));
		$('#voteForm').submit();
	})
}