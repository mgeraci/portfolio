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

export default {};
