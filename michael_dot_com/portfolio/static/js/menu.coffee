module.exports = {
	headerClass: "nav-mobile"

	init: ->
		$("body").on("click", ".nav-mobile-menu-trigger", (e) =>
			e.preventDefault()
			@toggleMenu()
		)

	toggleMenu: ->
		$(".#{@headerClass}").toggleClass("#{@headerClass}--has-menu")
}
