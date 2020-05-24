/* global document */

const Menu = {
	menuClass: "nav-mobile-menu",

	init() {
		const mobileMenuTrigger = document.querySelector(".nav-mobile-header-title");

		if (!mobileMenuTrigger) {
			return;
		}

		mobileMenuTrigger.addEventListener("click", (e) => {
			e.preventDefault();
			this.openMenu();
		});

		document.querySelector(".nav-mobile-menu-close").addEventListener("click", (e) => {
			e.preventDefault();
			this.closeMenu();
		});
	},

	openMenu() {
		document.querySelector(`.${this.menuClass}`).classList.add(`${this.menuClass}--show`);
		document.body.classList.add("no-scroll");
	},

	closeMenu() {
		document.querySelector(`.${this.menuClass}`).classList.remove(`${this.menuClass}--show`);
		document.body.classList.remove("no-scroll");
	},
};

export default Menu;
