/* global window, document */

import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore } from "redux";

import App from "./components/App.jsx";
import reducer, {
	setActiveImage,
	filterTag,
	clearActiveImage,
	appInitialize,
} from "./reducer";
import { URLS } from "./util/constants";
import { parseUrl } from "./util/helpers";

import "../../css/styles.scss";

window.Photoblog = {
	init(data) {
		const initialState = { ...data };
		const parsedUrl = parseUrl(window.location.pathname, initialState);

		if (parsedUrl.page === URLS.photo) {
			initialState.activeImage = parsedUrl.data;
		}

		this.store = createStore(
			reducer,
			initialState,
		);

		ReactDOM.render(
			<Provider store={this.store}>
				<App />
			</Provider>,
			document.getElementById("react-root")
		);

		// the app is initialized now!
		this.store.dispatch(appInitialize());

		// add a watcher for the browser back buttons
		window.addEventListener("popstate", () => this._navigate());
	},

	_navigate() {
		const parsedUrl = parseUrl(window.location.pathname, this.store.getState());

		if (parsedUrl.page === URLS.photo) {
			this.store.dispatch(
				setActiveImage(parsedUrl.data)
			);
		} else if (parsedUrl.page === URLS.tag) {
			this.store.dispatch(
				filterTag(parsedUrl.data)
			);
		} else if (parsedUrl.page === URLS.home) {
			this.store.dispatch(
				clearActiveImage()
			);
		}
	},
};
