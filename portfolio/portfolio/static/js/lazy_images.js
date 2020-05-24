/* global window, document, Image */

import throttle from "./vendor/throttle";
import getScroll from "./util/getScroll";

const LazyImages = {
	buffer: 350,

	search() {
		// load images onscreen at init
		this.checkScroll();

		// load additional images on scroll
		const lazyScroll = throttle(this.checkScroll.bind(this), 300);

		document.addEventListener("scroll", lazyScroll);
	},

	checkScroll() {
		document.querySelectorAll("[data-lazy-image]").forEach((lazyImage) => {
			if (this.elementIsOnScreen(lazyImage)) {
				this.loadImage(lazyImage);
			}
		});
	},

	loadImage(el) {
		const src = el.getAttribute("data-lazy-image");
		const alt = el.getAttribute("data-lazy-image-alt");
		const img = new Image();
		let maxWidth = el.getAttribute("data-lazy-max-width");

		if (maxWidth) {
			maxWidth = `${maxWidth}px`;
		} else {
			maxWidth = "auto";
		}

		// remove the data attribute to keep it from loading again
		el.removeAttribute("data-lazy-image");
		el.removeAttribute("data-lazy-image-alt");
		el.removeAttribute("data-lazy-image-max-width");

		img.setAttribute("src", src);
		img.setAttribute("alt", alt);
		img.style.maxWidth = maxWidth;

		img.addEventListener("load", () => {
			el.append(img);
		});
	},

	elementIsOnScreen(el) {
		if (!el) {
			return false;
		}

		const buffer = this.buffer || 0;
		const windowTop = getScroll();
		const windowBottom = windowTop + window.innerHeight;
		const rect = el.getBoundingClientRect();
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
	},
};

export default LazyImages;
