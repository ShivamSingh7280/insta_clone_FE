export const instaCloneReducer = (state, action) => {
	switch (action.type) {
		case "UPDATE_JWT":
			return {
				jwt: action.payload,
			};

		case "REMOVE_JWT":
			return {
				jwt: null,
			};

		default:
			break;
	}
};
