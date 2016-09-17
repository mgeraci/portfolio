/* global window, document */

import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore } from "redux";

import App from "./components/App";
import reducer from "./reducer";

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
			document.body.appendChild(document.getElementById("react-root"))
		);
	},
};
