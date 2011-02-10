// ===================================================
// =
// =               Javascript for
// =  michaelgeraci.com - (c) Michael P. Geraci
// =
// ===================================================

// Load these functions when the document is ready:
$(function(){
  stylesheets();
  newWindow();
  programNotes();
  thumbnails();
  photoLoader();
  keys();
});

function stylesheets(){
  if(jQuery.browser.safari){
    $('head').append("<link type='text/css' rel='stylesheet' href='/style/safari.css'>");
  }
  if(jQuery.browser.chrome){
    $('head').append("<link type='text/css' rel='stylesheet' href='/style/chrome.css'>");
  }
  if(jQuery.browser.opera){
    $('head').append("<link type='text/css' rel='stylesheet' href='/style/opera.css'>");
  }
}

// Open links with class 'new-window' in a new window
function newWindow(){
   $('a.new-window').click(function(){
     window.open(this.href);
     return false;
   });
}

// Program Notes Handler
function programNotes(){
  $('.programNotesOpen').click(function(){
    $(this).prevAll('.programNotes').slideDown('medium');
    $(this).html('').animate({marginBottom: "0px"}, 'medium');
  });
  
  $('.programNotesClose').click(function(){
    $(this).parent().slideUp('medium');
    $(this).parent().nextAll('.programNotesOpen').html('[+]&nbsp;Program Notes').animate({marginBottom: "30px"}, 'medium');
  });
}

// Handle thumbnail opacity in galleries
function thumbnails(){
  offOp = 0.4;

  // on hovering over a thumbnail, reduce its opacity
  $('#galleryThumbs').find('img:not(img.on)').mouseover(function(){
    $(this).animate({opacity: 1}, 200);
  }).mouseout(function(){
    $(this).animate({opacity: offOp}, 200);
  });
}

// handles loading image for photos
function photoLoader(){
  if ($('#photoLoaderInfo').length !== 0){
    siteSection = $('#photoLoaderSiteSection').html();
    section = $('#photoLoaderSection').html();
    id = $('#photoLoaderID').html();
    width = $('#photoLoaderWidth').html();
    height = $('#photoLoaderHeight').html();
    title = $('#photoLoaderTitle').html();

    if (siteSection == 'photography') {
      srcString = '/media/' + siteSection + '/' + section + '/' + id + '.jpg';
    } else {
      srcString = '/media/' + siteSection + '/' + id + '.jpg';
    }

    $(function () {
      var img = new Image();
      $(img).load(function () {
        //$(this).css('display', 'none'); // .hide() doesn't work in Safari when the element isn't on the DOM already
        $(this).hide();
        $('#pictureDiv').removeClass('loading').append(this);
        $(this).fadeIn();
      }).attr('src', srcString).attr('width', width).attr('height', height).attr('alt', title);
    });
  }
}

// Map Left and Right Keys to Navigation in Photo and Graphic
function keys(){
  if($('a#previous').length !== 0) {
    $(document).bind('keydown', 'left', function(){
      location = $('a#previous').attr('href');
    });
  }

  if($('a#next').length !== 0) {
    $(document).bind('keydown', 'right', function(){
      location = $('a#next').attr('href');
    });
  }
}

// ===========================
// = Audio Player Javascript =
// ===========================

var ap_instances = new Array();

function ap_stopAll(playerID) {
	for(var i = 0;i<ap_instances.length;i++) {
		try {
			if(ap_instances[i] != playerID) document.getElementById("audioplayer" + ap_instances[i].toString()).SetVariable("closePlayer", 1);
			else document.getElementById("audioplayer" + ap_instances[i].toString()).SetVariable("closePlayer", 0);
		} catch( errorObject ) {
			// stop any errors
		}
	}
}

function ap_registerPlayers() {
	var objectID;
	var objectTags = document.getElementsByTagName("object");
	for(var i=0;i<objectTags.length;i++) {
		objectID = objectTags[i].id;
		if(objectID.indexOf("audioplayer") == 0) {
			ap_instances[i] = objectID.substring(11, objectID.length);
		}
	}
}

var ap_clearID = setInterval( ap_registerPlayers, 100 );