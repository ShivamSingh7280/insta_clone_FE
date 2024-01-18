import React, { useReducer, useEffect } from "react";
import { InstaCloneContext } from "./InstaCloneContext";
import { instaCloneReducer } from "./InstaCloneReducer";

const initialState = {
	jwt: localStorage.getItem("jwt") || null,
};

const InstaCloneProvider = ({ children }) => {
	const [state, dispatch] = useReducer(instaCloneReducer, initialState);

	useEffect(() => {
		// Store JWT token in localStorage when it changes
		localStorage.setItem("jwt", state.jwt);
	}, [state.jwt]);

	const updateJWT = (newJWT) => {
		dispatch({ type: "UPDATE_JWT", payload: newJWT });
	};

	const removeJWT = () => {
		dispatch({ type: "REMOVE_JWT" });
	};

	return (
		<InstaCloneContext.Provider
			value={{
				jwt: state?.jwt,
				updateJWT,
				removeJWT,
			}}>
			{children}
		</InstaCloneContext.Provider>
	);
};

export default InstaCloneProvider;
