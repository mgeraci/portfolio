import $ from "jquery";

const Menu = {
	headerClass: "nav-mobile",

	init() {
		$("body").on("click", ".nav-mobile-menu-trigger", (e) => {
			e.preventDefault();
			this.toggleMenu();
		});
	},

	toggleMenu() {
		$(`.${this.headerClass}`).toggleClass(`${this.headerClass}--has-menu`);
	},
};

export default Menu;
