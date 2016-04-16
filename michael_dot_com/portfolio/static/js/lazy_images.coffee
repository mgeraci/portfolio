$ = require("jquery")
throttle = require("./throttle")

# add an onScreen selector to jQuery
$.expr[':'].onScreen = (elem) =>
	$window = $(window)

	if !LazyImages.windowHeight
		LazyImages.windowHeight = $window.height()

	buffer = LazyImages.buffer || 0
	windowTop = $window.scrollTop()
	windowBottom = windowTop + LazyImages.windowHeight
	rect = elem.getBoundingClientRect()
	top = rect.top + windowTop
	bottom = rect.bottom + windowTop
	topIsVisible = top >= (windowTop - buffer) && top < (windowBottom + buffer)
	bottomIsVisible = bottom > (windowTop - buffer) && bottom <= (windowBottom + buffer)
	isBiggerThanScreen = (rect.height != null) && rect.height > LazyImages.windowHeight && top <= (windowTop - buffer) && bottom >= (windowBottom + buffer)

	return topIsVisible || bottomIsVisible || isBiggerThanScreen

LazyImages = {
	buffer: 200

	search: ->
		# load images onscreen at init
		@checkScroll()

		# load additional images on scroll
		lazyScroll = throttle(@checkScroll.bind(@), 300)
		$(document).on("scroll", =>
			lazyScroll()
		)

	checkScroll: ->
		$("[data-lazy-image]:onScreen").each(->
			LazyImages.loadImage($(@))
		)

	loadImage: (el) ->
		src = el.attr("data-lazy-image")
		alt = el.attr("data-lazy-image-alt")
		img = new Image()

		$(img).load(=>
			el.append(img)

			# remove the data attribute to keep it from loading again
			el.removeAttr("data-lazy-image")
		).attr("src", src).attr("alt", alt)
}

module.exports = LazyImages
