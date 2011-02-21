(function() {
  var keys, newWindow, photoLoader, programNotes, stylesheets, thumbnails, web, webNext, webPreload;
  stylesheets = function() {
    if (jQuery.browser.safari) {
      $('head').append("<link type='text/css' rel='stylesheet' href='/style/safari.css'>");
    }
    if (jQuery.browser.chrome) {
      $('head').append("<link type='text/css' rel='stylesheet' href='/style/chrome.css'>");
    }
    if (jQuery.browser.opera) {
      return $('head').append("<link type='text/css' rel='stylesheet' href='/style/opera.css'>");
    }
  };
  newWindow = function() {
    return $('a.new-window').live('click', function() {
      window.open(this.href);
      return false;
    });
  };
  programNotes = function() {
    $('.programNotesOpen').click(function() {
      $(this).prevAll('.programNotes').slideDown('medium');
      $(this).html('').animate({
        marginBottom: "0px"
      }, 'medium');
      return false;
    });
    return $('.programNotesClose').click(function() {
      $(this).parent().slideUp('medium');
      $(this).parent().nextAll('.programNotesOpen').html('[+]&nbsp;Program Notes').animate({
        marginBottom: "30px"
      }, 'medium');
      return false;
    });
  };
  thumbnails = function() {
    var offOp;
    offOp = 0.4;
    return $('#galleryThumbs').find('img:not(img.on)').mouseover(function() {
      return $(this).animate({
        opacity: 1
      }, 200);
    }).mouseout(function() {
      return $(this).animate({
        opacity: offOp
      }, 200);
    });
  };
  photoLoader = function() {
    var height, id, section, siteSection, srcString, title, width;
    if ($('#photoLoaderInfo').length !== 0) {
      siteSection = $('#photoLoaderSiteSection').html();
      section = $('#photoLoaderSection').html();
      id = $('#photoLoaderID').html();
      width = $('#photoLoaderWidth').html();
      height = $('#photoLoaderHeight').html();
      title = $('#photoLoaderTitle').html();
      if (siteSection === 'photography') {
        srcString = '/media/' + siteSection + '/' + section + '/' + id + '.jpg';
      } else {
        srcString = '/media/' + siteSection + '/' + id + '.jpg';
      }
      return $(function() {
        var img;
        img = new Image();
        return $(img).load(function() {
          $(this).hide();
          $('#pictureDiv').removeClass('loading').append(this);
          return $(this).fadeIn();
        }).attr('src', srcString).attr('width', width).attr('height', height).attr('alt', title);
      });
    }
  };
  keys = function() {
    if (!($('#pageWeb').length > 0)) {
      if ($('a#previous').length !== 0) {
        $(document).bind('keydown', 'left', function() {
          return window.location = $('a#previous').attr('href');
        });
      }
      if ($('a#next').length !== 0) {
        return $(document).bind('keydown', 'right', function() {
          return window.location = $('a#next').attr('href');
        });
      }
    }
  };
  web = function() {
    var containerSize;
    if ($('#pageWeb').length > 0) {
      containerSize = 320;
      if ($('#piece').html() !== '') {
        webPreload("/media/web/" + ($('#piece').text()) + "/1.jpg");
      }
      $('#pieceList a').click(function() {
        var url;
        url = $(this).attr('href');
        $('#pieceListContainer').stop().animate({
          width: 100,
          opacity: 0.6
        }, 200);
        $('#webFade').stop().animate({
          width: 20
        }, 200, function() {
          return window.location = url;
        });
        return false;
      });
      $('#pieceList').hover(function() {
        if ($('#pieceListContainer').attr('class').match(/collapsed/)) {
          $('#pieceListContainer').stop().animate({
            width: containerSize,
            opacity: 1
          }, 200);
          $('#webFade').stop().animate({
            width: 40
          }, 200);
          return $('#pieceListContainer').removeClass('collapsed');
        }
      }, function() {
        if (!$('#pieceListContainer').attr('class').match(/collapsed/)) {
          $('#pieceListContainer').stop().animate({
            width: 100,
            opacity: 0.6
          }, 200);
          $('#webFade').stop().animate({
            width: 20
          }, 200);
          return $('#pieceListContainer').addClass('collapsed');
        }
      });
    }
    $('#next').live('click', function() {
      webNext();
      return false;
    });
    if ($('a#next').length !== 0) {
      return $(document).bind('keydown', 'right', function() {
        return webNext();
      });
    }
  };
  webNext = function() {
    var images, next, number, url;
    number = parseInt($('#current').text(), 10);
    images = parseInt($('#images').text(), 10);
    next = number + 1 > images ? 1 : number + 1;
    url = $('#pieceContent img').attr('src').replace(/\d{1}.jpg/, "" + next + ".jpg");
    webPreload(url);
    return $('#current').html(next);
  };
  webPreload = function(url) {
    var img;
    $('#webImage').html('').addClass('loading');
    img = new Image();
    return $(img).load(function() {
      $(this).hide();
      $('#webImage').removeClass('loading').append(this);
      return $(this).fadeIn();
    }).attr('src', url).attr('width', 750);
  };
  $(function() {
    stylesheets();
    newWindow();
    programNotes();
    thumbnails();
    photoLoader();
    keys();
    return web();
  });
}).call(this);
