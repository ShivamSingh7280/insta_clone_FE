import React, { useContext, useState } from "react";
import styles from "./SignIn.module.css";

import SignInLogo from "../../assets/signLogo.svg";
import { useNavigate } from "react-router-dom";

import {
	EmailRegex,
	notifyError,
	notifySuccess,
	notifyWarn,
} from "../../config";
import { API } from "../../config/Api";
import { InstaCloneContext } from "../../context/InstaCloneContext";

const SignIn = () => {
	const { updateJWT } = useContext(InstaCloneContext);

	const navigate = useNavigate();

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const _redirectTo = (param) => {
		navigate(param);
	};

	const _handlePostSignIn = async (e) => {
		try {
			e.preventDefault();
			if (!email || !password) {
				notifyWarn("Please fill in all the required fields");
				return;
			}

			// Email Validation :
			if (!EmailRegex.test(email)) {
				notifyError("Invalid Email, Please enter a valid email");
				return;
			}

			const response = await fetch(`${API}/auth/signin`, {
				method: "POST",

				headers: {
					"Content-Type": "application/json",
				},

				body: JSON.stringify({
					email: email,
					password: password,
				}),
			});

			if (response.ok) {
				const data = await response.json();
				const { message, token } = data;

				localStorage.setItem("jwt", token);

				updateJWT(token);

				notifySuccess(message);
				_redirectTo("/home");
				return;
			} else {
				notifyError("Credentials do not match");
				return;
			}
		} catch (error) {
			console.log(`Error found in _handlePostSignIN ${error}`);
		}
	};

	return (
		<div className={styles.signin}>
			<form onSubmit={_handlePostSignIn}>
				<div className={styles.signInForm}>
					<img
						src={SignInLogo}
						alt="logo-signIn"
						className={styles.signupLogo}
					/>

					<div>
						<input
							type="email"
							placeholder="Email"
							value={email}
							onChange={(e) => {
								setEmail(e?.target?.value);
							}}
						/>
					</div>

					<div>
						<input
							type="password"
							placeholder="Password"
							autoComplete="on"
							value={password}
							onChange={(e) => {
								setPassword(e?.target?.value);
							}}
						/>
					</div>

					<div>
						<input type="submit" value="SIGN IN" className={styles.signInBtn} />
					</div>
				</div>

				<div className={styles.form2}>
					Don't have an account?{" "}
					<span
						className={styles.link}
						onClick={() => {
							_redirectTo("/auth/signup");
						}}>
						Sign Up
					</span>
				</div>
			</form>
		</div>
	);
};

export default SignIn;
