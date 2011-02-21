# ===================================================
# =
# =       Javascript for michaelgeraci.com
# =              (c) Michael P. Geraci
# =
# ===================================================

stylesheets = ->
  if jQuery.browser.safari
    $('head').append("<link type='text/css' rel='stylesheet' href='/style/safari.css'>")

  if jQuery.browser.chrome
    $('head').append("<link type='text/css' rel='stylesheet' href='/style/chrome.css'>")

  if jQuery.browser.opera
    $('head').append("<link type='text/css' rel='stylesheet' href='/style/opera.css'>")


# Open links with class 'new-window' in a new window
newWindow = ->
  $('a.new-window').live('click', ->
    window.open(this.href)
    return false
  )

# Program Notes Handler
programNotes = ->
  $('.programNotesOpen').click ->
    $(this).prevAll('.programNotes').slideDown('medium')
    $(this).html('').animate({marginBottom: "0px"}, 'medium')
    
    return false

  $('.programNotesClose').click ->
    $(this).parent().slideUp('medium')
    $(this).parent().nextAll('.programNotesOpen').html('[+]&nbsp;Program Notes').animate({marginBottom: "30px"}, 'medium')
    
    return false

# Handle thumbnail opacity in galleries
thumbnails = ->
  offOp = 0.4

  # on hovering over a thumbnail, reduce its opacity
  $('#galleryThumbs').find('img:not(img.on)').mouseover(->
    $(this).animate({opacity: 1}, 200)
  ).mouseout(->
    $(this).animate({opacity: offOp}, 200)
  )

# handles loading image for photos
photoLoader = ->
  if $('#photoLoaderInfo').length != 0
    # get the image parameters
    siteSection = $('#photoLoaderSiteSection').html()
    section = $('#photoLoaderSection').html()
    id = $('#photoLoaderID').html()
    width = $('#photoLoaderWidth').html()
    height = $('#photoLoaderHeight').html()
    title = $('#photoLoaderTitle').html()

    if siteSection == 'photography'
      srcString = '/media/' + siteSection + '/' + section + '/' + id + '.jpg'
    else
      srcString = '/media/' + siteSection + '/' + id + '.jpg'

    $(->
      img = new Image()
      $(img).load(->
        # hide the target
        $(this).hide()
        
        # remove the spinner and add the image
        $('#pictureDiv').removeClass('loading').append(this)

        # fade in the image
        $(this).fadeIn()
      ).attr('src', srcString).attr('width', width).attr('height', height).attr('alt', title)
    )

# Map Left and Right Keys to Navigation in Photo and Graphic
keys = ->
  # don't run on web section
  unless $('#pageWeb').length > 0
    if $('a#previous').length != 0
      $(document).bind('keydown', 'left', ->
        window.location = $('a#previous').attr('href')
      )

    if $('a#next').length != 0
      $(document).bind('keydown', 'right', ->
        window.location = $('a#next').attr('href')
      )

# handle showing/hiding piecelist and ajax loading image
web = ->
  if $('#pageWeb').length > 0
    # size of pieceContent's left attr pluss margin-left
    containerSize = 320
    
    # onload, preload first image
    webPreload("/media/web/#{$('#piece').text()}/1.jpg") unless $('#piece').html() == ''

    # clicking a piece link
    $('#pieceList a').click ->
      # get the url
      url = $(this).attr('href')

      # hide the piecelist on clicking a piece
      $('#pieceListContainer').stop().animate({width: 100, opacity: 0.6}, 200)
      $('#webFade').stop().animate({width: 20}, 200, ->
        # go to link on end animation
        window.location = url
      )
      
      return false

    # hide and show the piece list on hover
    $('#pieceList').hover ->
      # only run if collapsed
      if $('#pieceListContainer').attr('class').match(/collapsed/)
        # expand the container
        $('#pieceListContainer').stop().animate({width: containerSize, opacity: 1}, 200)

        # expand the fade
        $('#webFade').stop().animate({width: 40}, 200)
        
        # remove the collapsed class
        $('#pieceListContainer').removeClass('collapsed')
    , ->
      # only hide on mouseout if you've clicked on something (check the url for #)
      if !$('#pieceListContainer').attr('class').match(/collapsed/)
        # collapse the container
        $('#pieceListContainer').stop().animate({width: 100, opacity: 0.6}, 200)

        # collapse the fade
        $('#webFade').stop().animate({width: 20}, 200)
        
        # add the collapsed class
        $('#pieceListContainer').addClass('collapsed')

  # handle the 'next' button
  $('#next').live('click', ->
    webNext()
    
    return false
  )
  
  # keyboard shortcut if more than 1 image
  if $('a#next').length != 0
    $(document).bind('keydown', 'right', ->
      webNext()
    )

webNext = ->
  # get the image number
  number = parseInt($('#current').text(), 10)
  
  # how many images?
  images = parseInt($('#images').text(), 10)
  
  # get the next number
  next = if number + 1 > images then 1 else number + 1
  
  # make the next url
  url = $('#pieceContent img').attr('src').replace(/\d{1}.jpg/, "#{next}.jpg")
  
  # replace the image
  webPreload(url)
  
  # set the count
  $('#current').html(next)

webPreload = (url) ->
  # remove the content and add the spinner
  $('#webImage').html('').addClass('loading')

  img = new Image()
  $(img).load(->
    # hide the target
    $(this).hide()

    # remove the spinner and add the image
    $('#webImage').removeClass('loading').append(this)

    # fade in the image
    $(this).fadeIn()
  ).attr('src', url).attr('width', 750)#.attr('height', height).attr('alt', title)

# Load these functions when the document is ready:
$(->
  stylesheets()
  newWindow()
  programNotes()
  thumbnails()
  photoLoader()
  keys()
  web()
)