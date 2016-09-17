$ = require("jquery")

module.exports = {
	init: ->
		audiojs = require("./vendor/audio.js")("audiojs", "audiojsInstance", this)
		audiojs = this.audiojs

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
