$ = require("jquery")

module.exports = {
	search: ->
		self = @

		$("[data-lazy-image]").each(->
			self.loadImage($(@))
		)

	loadImage: (el) ->
		src = el.attr("data-lazy-image")
		alt = el.attr("data-lazy-image-alt")
		img = new Image()

		$(img).load(=>
			el.append(img)
		).attr("src", src).attr("alt", alt)
}
