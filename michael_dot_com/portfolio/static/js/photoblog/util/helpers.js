/* global history */

import { URLS } from "./constants.js";


/*
 * Determine what page a given url is (home, a photo, or a tag), and return
 * pertinent information about that url.
 *
 * @param {string} url - the current page url
 * @param {object} state - the current application state
 *
 * @returns {obejct} - keys page, the current page, and data, additional info
 */
export function parseUrl(url, initialData = {}) {
	if (url.match(/photography\/blog\/[0-9]+\/?$/)) {
		let id = url.replace("/photography/blog/", "").replace(/\/$/, "");
		id = parseInt(id, 10);

		return {
			page: URLS.photo,
			data: id,
		};
	} else if (url.match("/photography/blog/browse/")) {
		const slug = url.replace("/photography/blog/browse/", "");

		// this kind of sucks, but the tag action expects to be called with its
		// name and slug. so let's just try to find it from the initial data
		// load.
		let res;
		let data = {};

		initialData.order.forEach((id) => {
			initialData.images[id].tags.forEach((tag) => {
				if (tag.slug === slug) {
					res = tag;
				}
			});
		});

		if (res.name && res.slug) {
			data = res;
		}

		return {
			page: URLS.tag,
			data: data,
		};
	} else if (url.match(/\/photography\/blog\/?/)) {
		return {
			page: URLS.home,
			data: null,
		};
	}

	return null;
}


/*
 * Get the filtered images, falling back to all of the images
 *
 * @param {object} state - the whole application state
 *
 * @returns {array} order - an ordered list of photo ids that are visible
 */
export function getVisibleImages(state) {
	// get the current set of images
	let order = state.order;

	if (state.filteredOrder && state.filteredOrder.length) {
		order = state.filteredOrder;
	}

	return order;
}


/*
 * Given an index and a set of images, decide if the image is at the start or
 * end of the set.
 *
 * @param {integer} index - the position of the image in the set
 * @param {array} images - a set of images that the index is theoretically in
 *
 * @returns {object} - a dict with the booleans atBeginning and atEnd
 */
export function getPositionMeta(params) {
	if (typeof(params.index) === "undefined" || params.index === null) {
		return {};
	}

	if (!params.images || params.images.length === 0) {
		return {};
	}

	let atBeginning = false;
	let atEnd = false;

	if (params.index === 0) {
		atBeginning = true;
	}

	if (params.index + 1 === params.images.length) {
		atEnd = true;
	}

	return {
		atBeginning,
		atEnd,
	};
}


/*
 * Set the history, if available
 *
 * @param {string} url - the url to set
 *
 * @returns {boolean} - whether or not the page history was updated
 */
export function setHistory(url) {
	if (typeof(history) === "undefined" || history === null) {
		return false;
	}

	history.pushState(null, null, url);

	return true;
}

export default {};
