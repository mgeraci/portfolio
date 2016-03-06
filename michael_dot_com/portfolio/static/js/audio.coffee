audiojs = require("./vendor/audio.min.js")
$ = require("jquery")

module.exports = {
	init: ->
		audiojs = audiojs.audiojs

		audiojs.events.ready(=>
			audioElements = audiojs.createAll({
				css: false
			})

			# pause all other players on click of a play button
			$("body").on("click", ".audiojs .play-pause", ->
				thisIndex = $(@).parents(".audiojs").index(".audiojs")

				$.each(audioElements, (index,val) =>
					if index != thisIndex && audioElements[index].playing
						audioElements[index].pause()
				)
			)
		)
}
