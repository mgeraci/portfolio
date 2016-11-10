import $ from "jquery";

const Menu = {
	menuClass: "nav-mobile-menu",

	init() {
		$("body").on("click", ".nav-mobile-header-title", (e) => {
			e.preventDefault();
			this.openMenu();
		});

		$("body").on("click", ".nav-mobile-menu-close", (e) => {
			e.preventDefault();
			this.closeMenu();
		});
	},

	openMenu() {
		$(`.${this.menuClass}`).addClass(`${this.menuClass}--show`);
		$("body").addClass("no-scroll");
	},

	closeMenu() {
		$(`.${this.menuClass}`).removeClass(`${this.menuClass}--show`);
		$("body").removeClass("no-scroll");
	},
};

export default Menu;
