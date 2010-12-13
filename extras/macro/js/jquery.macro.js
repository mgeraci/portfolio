$(function() {
	// install the event handler for #debug #output
	$('textarea').keydown(update);
	
	$('#compose').focus();
});

var word = '';
var range = '';
var split = '';

function update() {
	// get the text range object
	range = $(this).getSelection();
	
	// assign the last letter typed to lastLetter
	lastLetter = $('#compose').val().substring(range.start-1, range.start);

	// $('#output').html(lastLetter);
	// if the last letter is a break character, run checkWord
	switch (lastLetter) {
		case ' ': split = 'space'; checkWord(word, range.start, split); word = ''; break;
		case '\r': split = 'return'; checkWord(word, range.start, split); word = ''; break;
		case '\n': split = 'return'; checkWord(word, range.start, split); word = ''; break;
		case '.': split = 'period'; checkWord(word, range.start, split); word = ''; break;
		case '\?': split = 'question'; checkWord(word, range.start, split); word = ''; break;
		case '\!': split = 'exclamation'; checkWord(word, range.start, split); word = ''; break;
		case '\;': split = 'semicolon'; checkWord(word, range.start, split); word = ''; break;
		case '\:': split = 'colon'; checkWord(word, range.start, split); word = ''; break;
		default: word += lastLetter;
	}
	$('#output').html(word);
}

function checkWord(str, endOfWord, split) {
	str = str.replace(/^[ \t\r\n]+|[ \t\r\n]+$/, '');
	var textarea = $('#compose');
	var startOfWord = endOfWord - str.length - 1;
	var lengthOfText = textarea.val().length;
	switch (str){
		case 'dear': replacement = "Dear Almanac User,"; replace(startOfWord, endOfWord, lengthOfText, replacement, split); break;
		case 'pe': replacement = "Product Encyclopedia"; replace(startOfWord, endOfWord, lengthOfText, replacement, split); break;
		case 'mg': replacement = "Best,\n\nMichael Geraci\nCo-Founder, The Almanac\nmichael@thealmanac.org\n914.316.7247"; replace(startOfWord, endOfWord, lengthOfText, replacement, split); break;
		case 'jbj': replacement = "Best,\n\nJonah Bloch-Johnson\nCo-Founder, The Almanac\njonah@thealmanac.org\n917.370.3051"; replace(startOfWord, endOfWord, lengthOfText, replacement, split); break;
		case 'gener': replacement = "Thanks so much for using The Almanac, we hope you enjoy it. Feel free to let us know any other thoughts you have!\n\nBest Wishes,\n\nThe Almanac\ninfo@thealmanac.org"; replace(startOfWord, endOfWord, lengthOfText, replacement, split); break;
	}
}

function replace(startOfWord, endOfWord, lengthOfText, replacement, split){
	switch (split){
		case 'space': splitCharacter = ' '; break;
		case 'return': splitCharacter = '\n'; break;
		case 'period': splitCharacter = '.'; break;
		case 'question': splitCharacter = '\?'; break;
		case 'exclamation': splitCharacter = '\!'; break;
		case 'semicolon': splitCharacter = '\;'; break;
		case 'colon': splitCharacter = '\:'; break;
	}
	var textarea = $('#compose');
	textarea.val(textarea.val().substring(0, startOfWord) + replacement + splitCharacter + textarea.val().substring(endOfWord, lengthOfText));
}