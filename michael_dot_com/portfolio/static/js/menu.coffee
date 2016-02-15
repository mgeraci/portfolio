module.exports = {
	menuClass: "nav-mobile-menu"

	init: ->
		$("body").on("click", ".nav-mobile-menu-trigger", (e) =>
			e.preventDefault()
			@toggleMenu()
		)

	toggleMenu: ->
		$(".#{@menuClass}").toggleClass("#{@menuClass}--show")
}
