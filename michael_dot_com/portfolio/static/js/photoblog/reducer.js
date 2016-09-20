/* global history */

// constants and helpers
// ----------------------------------------------------------------------------

import { DIRECTIONS } from "./util/constants.js";

const getVisibleImages = function getVisibleImages(state) {
	// get the current set of images
	let order = state.order;

	if (state.filteredOrder && state.filteredOrder.length) {
		order = state.filteredOrder;
	}

	return order;
};

const getPositionMeta = function getPositionMeta(params) {
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
};

const setHistory = function setHistory(url, data) {
	if (typeof(history) === "undefined" || history === null) {
		return false;
	}

	history.pushState(data, null, url);

	return true;
};


// action types
// ----------------------------------------------------------------------------

export const SET_ACTIVE_IMAGE = "PHOTOBLOG.SET_ACTIVE_IMAGE";
export const CLEAR_ACTIVE_IMAGE = "PHOTOBLOG.CLEAR_ACTIVE_IMAGE";
export const NAVIGATE = "PHOTOBLOG.NAVIGATE";
export const FILTER_TAG = "PHOTOBLOG.FILTER_TAG";
export const CLEAR_FILTER_TAG = "PHOTOBLOG.CLEAR_FILTER_TAG";


// reducer
// ----------------------------------------------------------------------------

export default function reducer(state, action) {
	switch (action.type) {
		case SET_ACTIVE_IMAGE: {
			if (!action.id) {
				return state;
			}

			const order = getVisibleImages(state);
			const index = order.indexOf(action.id);
			const positionMeta = getPositionMeta({
				index: index,
				images: order,
			});

			setHistory(`/photography/blog/${action.id}`);

			return {
				...state,
				activeImage: action.id,
				...positionMeta,
			};
		}

		case CLEAR_ACTIVE_IMAGE: {
			setHistory("/photography/blog");

			return {
				...state,
				activeImage: null,
			};
		}

		case NAVIGATE: {
			if (!state.activeImage) {
				return state;
			}

			const order = getVisibleImages(state);
			const currentIndex = order.indexOf(state.activeImage);
			let nextIndex;

			if (action.direction === DIRECTIONS.prev)	{
				nextIndex = currentIndex - 1;
			} else if (action.direction === DIRECTIONS.next) {
				nextIndex = currentIndex + 1;
			} else {
				return state;
			}

			if (nextIndex < 0) {
				return {
					...state,
				};
			}

			if (nextIndex + 1 > order.length) {
				return {
					...state,
				};
			}

			const positionMeta = getPositionMeta({
				index: nextIndex,
				images: order,
			});

			const nextId = state.order[nextIndex];

			setHistory(`/photography/blog/${nextId}`);

			return {
				...state,
				activeImage: nextId,
				...positionMeta,
			};
		}

		case FILTER_TAG: {
			if (!action.tag) {
				return state;
			}

			const filteredOrder = [];

			state.order.forEach((id) => {
				state.images[id].tags.forEach((tag) => {
					if (tag.slug === action.tag.slug) {
						filteredOrder.push(id);
					}
				});
			});

			setHistory(`/photography/blog/browse/${action.tag.slug}`);

			return {
				...state,
				activeImage: null,
				filteredOrder,
				filteredTerm: action.tag.name,
			};
		}

		case CLEAR_FILTER_TAG: {
			setHistory("/photography/blog");

			return {
				...state,
				activeImage: null,
				filteredOrder: null,
				filteredTerm: null,
			};
		}

		default: {
			return state;
		}
	}
}


// action creators
// ----------------------------------------------------------------------------

export function setActiveImage(id) {
	return {
		type: SET_ACTIVE_IMAGE,
		id,
	};
}

export function clearActiveImage() {
	return {
		type: CLEAR_ACTIVE_IMAGE,
	};
}

export function navigatePrev() {
	return {
		type: NAVIGATE,
		direction: DIRECTIONS.prev,
	};
}

export function navigateNext() {
	return {
		type: NAVIGATE,
		direction: DIRECTIONS.next,
	};
}

export function filterTag(tag) {
	return {
		type: FILTER_TAG,
		tag,
	};
}

export function clearFilterTag() {
	return {
		type: CLEAR_FILTER_TAG,
	};
}
