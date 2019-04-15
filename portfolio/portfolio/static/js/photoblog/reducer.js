
import {
	DIRECTIONS,
	BAD_TAGS,
} from "./util/constants";

import {
	getVisibleImages,
	getPositionMeta,
	setHistory,
} from "./util/helpers";


// action types
// ----------------------------------------------------------------------------

export const SET_ACTIVE_IMAGE = "PHOTOBLOG.SET_ACTIVE_IMAGE";
export const CLEAR_ACTIVE_IMAGE = "PHOTOBLOG.CLEAR_ACTIVE_IMAGE";
export const NAVIGATE = "PHOTOBLOG.NAVIGATE";
export const FILTER_TAG = "PHOTOBLOG.FILTER_TAG";
export const CLEAR_FILTER_TAG = "PHOTOBLOG.CLEAR_FILTER_TAG";
export const APP_INITIALIZE = "PHOTOBLOG.APP_INITIALIZE";
export const GENERATE_TAGS_LIST = "PHOTOBLOG.GENERATE_TAGS_LIST";


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
			if (state.filteredTerm && state.filteredTerm.slug) {
				setHistory(`/photography/blog/browse/${state.filteredTerm.slug}`);
			} else {
				setHistory("/photography/blog");
			}

			return {
				...state,
				activeImage: null,
			};
		}

		case NAVIGATE: {
			if (!state.activeImage) {
				return state;
			}

			const currentOrder = getVisibleImages(state);
			const currentIndex = currentOrder.indexOf(state.activeImage);
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

			if (nextIndex + 1 > currentOrder.length) {
				return {
					...state,
				};
			}

			const positionMeta = getPositionMeta({
				index: nextIndex,
				images: currentOrder,
			});


			const nextId = currentOrder[nextIndex];

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
			const isYear = !!`${action.tag.slug}`.match(/2\d{3}/);
			let year;

			if (isYear) {
				year = parseInt(action.tag.slug, 10);
			}

			state.order.forEach((id) => {
				if (isYear) {
					if (state.images[id].year === year) {
						filteredOrder.push(id);
					}
				} else {
					state.images[id].tags.forEach((tag) => {
						if (tag.slug === action.tag.slug) {
							filteredOrder.push(id);
						}
					});
				}
			});

			setHistory(`/photography/blog/browse/${action.tag.slug}`);

			return {
				...state,
				activeImage: null,
				filteredOrder,
				filteredTerm: action.tag,
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

		case GENERATE_TAGS_LIST: {
			const tagsDict = {};
			let tags = [];

			// construct an object of tags and their counts
			Object.keys(state.images).forEach((id) => {
				const image = state.images[id];

				image.tags.forEach((tag) => {
					if (!BAD_TAGS[tag.slug]) {
						if (tagsDict[tag.slug]) {
							const { count } = tagsDict[tag.slug];
							tagsDict[tag.slug].count = count + 1;
						} else {
							tagsDict[tag.slug] = {
								...tag,
								count: 0,
							};
						}
					}
				});
			});

			// get the object into an alphabetically sorted array
			Object.keys(tagsDict).forEach((slug) => {
				tags.push(tagsDict[slug]);
			});

			tags = tags.sort((a, b) => {
				const aName = a.name.toLowerCase();
				const bName = b.name.toLowerCase();
				if (aName < bName) return -1;
				if (aName > bName) return 1;
				return 0;
			});

			return {
				...state,
				tags,
			};
		}

		case APP_INITIALIZE: {
			return {
				...state,
				appInitialized: true,
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

export function generateTagsList() {
	return {
		type: GENERATE_TAGS_LIST,
	};
}

export function appInitialize() {
	return {
		type: APP_INITIALIZE,
	};
}
