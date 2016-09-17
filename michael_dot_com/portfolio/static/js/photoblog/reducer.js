// action types
// ----------------------------------------------------------------------------

export const SET_ACTIVE_IMAGE = "PHOTOBLOG.SET_ACTIVE_IMAGE";
export const CLEAR_ACTIVE_IMAGE = "PHOTOBLOG.CLEAR_ACTIVE_IMAGE";


// reducer
// ----------------------------------------------------------------------------

export default function reducer(state, action) {
	console.log(action);

	switch (action.type) {
		case SET_ACTIVE_IMAGE:
			return {
				...state,
				activeImage: action.id,
			};

		case CLEAR_ACTIVE_IMAGE:
			return {
				...state,
				activeImage: null,
			};

		default:
			return state;
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
