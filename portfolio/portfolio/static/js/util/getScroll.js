/* global window, document */

export default () => {
	if (!window || !document) {
		return 0;
	}

	return window.pageYOffset ||
		document.documentElement.scrollTop ||
		document.body.scrollTop ||
		0;
};
