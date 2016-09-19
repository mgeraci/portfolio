/* global window, document */

import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore } from "redux";

import App from "./components/App";
import reducer, { setActiveImage, filterTag } from "./reducer";

require("../../css/styles.sass");

window.Photoblog = {
	init(data) {
		const store = createStore(
			reducer,
			data
		);

		ReactDOM.render(
			<Provider store={store}>
				<App />
			</Provider>,
			document.getElementById("react-root")
		);

		// initial navigation
		const url = window.location.pathname;

		if (url.match(/photography\/blog\/[0-9]+\/?$/)) {
			let id = url.replace("/photography/blog/", "").replace(/\/$/, "");
			id = parseInt(id, 10);

			store.dispatch(setActiveImage(id));
		} else if (url.match("/photography/blog/browse/")) {
			const slug = url.replace("/photography/blog/browse/", "");

			// this kind of sucks, but the tag action expects to be called with its
			// name and slug. so let's just try to find it from the initial data
			// load.
			let res;

			data.order.forEach((id) => {
				data.images[id].tags.forEach((tag) => {
					if (tag.slug === slug) {
						res = tag;
					}
				});
			});

			if (res.name && res.slug) {
				store.dispatch((filterTag(res)));
			}
		}
	},
};
