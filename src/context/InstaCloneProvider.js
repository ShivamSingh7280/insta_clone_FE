import React, { useReducer, useEffect } from "react";
import { InstaCloneContext } from "./InstaCloneContext";
import { instaCloneReducer } from "./InstaCloneReducer";

const initialState = {
	userData:
		localStorage.getItem("userData") === "null"
			? null
			: JSON.parse(localStorage.getItem("userData")) || null,
};

const InstaCloneProvider = ({ children }) => {
	const [state, dispatch] = useReducer(instaCloneReducer, initialState);

	useEffect(() => {
		// Store JWT token in localStorage when it changes
		localStorage.setItem("userData", JSON.stringify(state.userData));
	}, [state.userData]);

	const updateUserData = (userData) => {
		dispatch({ type: "UPDATE_USERDATA", payload: userData });
	};

	const clearUserData = () => {
		dispatch({ type: "CLEAR_USERDATA" });
	};

	return (
		<InstaCloneContext.Provider
			value={{
				userData: state?.userData,
				updateUserData,
				clearUserData,
			}}>
			{children}
		</InstaCloneContext.Provider>
	);
};

export default InstaCloneProvider;
