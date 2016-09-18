const DIRECTIONS = {
	prev: "prev",
	next: "next",
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
			return {
				...state,
				activeImage: action.id,
			};
		}

		case CLEAR_ACTIVE_IMAGE: {
			return {
				...state,
				activeImage: null,
			};
		}

		case NAVIGATE: {
			if (!state.activeImage) {
				return state;
			}

			// get the current set of images
			let order = state.order;

			if (state.filteredOrder && state.filteredOrder.length) {
				order = state.filteredOrder;
			}

			const currentIndex = order.indexOf(state.activeImage);
			let nextIndex;

			if (action.direction === DIRECTIONS.prev)	{
				nextIndex = currentIndex - 1;
			} else if (action.direction === DIRECTIONS.next) {
				nextIndex = currentIndex + 1;
			} else {
				return state;
			}

			if (nextIndex < 0 || nextIndex + 1 > state.order.length) {
				return state;
			}

			return {
				...state,
				activeImage: state.order[nextIndex],
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

			return {
				...state,
				activeImage: null,
				filteredOrder,
				filteredTerm: action.tag.name,
			};
		}

		case CLEAR_FILTER_TAG: {
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
		type: SET_ACTIVE_IMAGE,
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
