export const instaCloneReducer = (state, action) => {
	console.log(state, action);

	switch (action.type) {
		case "UPDATE_USERDATA": {
			return {
				...state,
				userData: { ...action.payload },
			};
		}

		case "CLEAR_USERDATA": {
			return {
				...state,
				userData: {},
			};
		}

		default:
			break;
	}
};
