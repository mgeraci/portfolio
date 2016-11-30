/* global window, document, Image */

import $ from "jquery";
import throttle from "./vendor/throttle";

const LazyImages = {
	buffer: 200,

	search() {
		// load images onscreen at init
		this.checkScroll();

		// load additional images on scroll
		const lazyScroll = throttle(this.checkScroll.bind(this), 300);

		$(document).on("scroll", () => {
			lazyScroll();
		});
	},

	checkScroll() {
		$("[data-lazy-image]:onScreen").each(function onScreen() {
			LazyImages.loadImage($(this));
		});
	},

	loadImage(el) {
		const src = el.attr("data-lazy-image");
		const alt = el.attr("data-lazy-image-alt");
		const img = new Image();
		let maxWidth = el.attr("data-lazy-max-width");

		if (maxWidth) {
			maxWidth = `${maxWidth}px`;
		} else {
			maxWidth = "auto";
		}

		// remove the data attribute to keep it from loading again
		el.removeAttr("data-lazy-image");

		$(img).load(() => {
			el.append(img);
		}).attr("src", src)
			.attr("alt", alt)
			.css("maxWidth", maxWidth);
	},
};

// add an onScreen selector to jQuery
$.expr[":"].onScreen = (elem) => {
	const $window = $(window);

	if (!LazyImages.windowHeight) {
		LazyImages.windowHeight = $window.height();
	}

	const buffer = LazyImages.buffer || 0;
	const windowTop = $window.scrollTop();
	const windowBottom = windowTop + LazyImages.windowHeight;
	const rect = elem.getBoundingClientRect();
	const top = rect.top + windowTop;
	const bottom = rect.bottom + windowTop;

	const topIsVisible = top >= (windowTop - buffer) &&
		top < (windowBottom + buffer);

	const bottomIsVisible = bottom > (windowTop - buffer) &&
		bottom <= (windowBottom + buffer);

	const isBiggerThanScreen = (rect.height != null) &&
		rect.height > LazyImages.windowHeight &&
		top <= (windowTop - buffer) &&
		bottom >= (windowBottom + buffer);

	return topIsVisible || bottomIsVisible || isBiggerThanScreen;
};

export default LazyImages;
