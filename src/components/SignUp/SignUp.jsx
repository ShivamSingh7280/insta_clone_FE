import React, { useState } from "react";
import styles from "./SignUp.module.css";
import signUpLogo from "../../assets/signLogo.svg";
import { useNavigate } from "react-router-dom";
import {
	EmailRegex,
	PasswordRegex,
	notifyError,
	notifySuccess,
	notifyWarn,
} from "../../config";
import { API } from "../../config/Api";

const SignUp = () => {
	const navigate = useNavigate();

	const [email, setEmail] = useState("");
	const [name, setName] = useState("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const _redirectTo = (params) => {
		navigate(params);
	};

	const _handlePostSignUp = async (e) => {
		try {
			e?.preventDefault();
			if (!email || !name || !username || !password) {
				notifyWarn("Please fill in all the fields");
				return;
			}

			// Validation Email & Password :

			if (!EmailRegex.test(email)) {
				notifyError("Invalid Email, Please enter a valid email");
				return;
			} else if (!PasswordRegex.test(password)) {
				notifyError(
					"Password must contain atleast 8 characters, including atleast 1 number and 1 includes both lower and uppercase letters and special characters for example #,?,!"
				);
				return;
			}

			const response = await fetch(`${API}/auth/signup`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					email: email,
					fullName: name,
					username: username,
					password: password,
				}),
			});
			const data = await response.json();
			const { message } = data;
			if (response.ok) {
				notifySuccess(message);
				navigate("/auth/signin");
				return;
			} else {
				notifyError("Please fill the valid Details");
				return;
			}
		} catch (error) {
			console.log(`Error found in _handlePostSignup ${error}`);
		}
	};

	return (
		<div className={styles.signup}>
			<form onSubmit={_handlePostSignUp} className={styles.formContainer}>
				<div className={styles.form}>
					<img
						src={signUpLogo}
						alt="logo-signUp"
						className={styles.signupLogo}
					/>

					<p className={styles.signupPara}>
						Sign up to see photos and videos <br /> from your friends.
					</p>

					<div>
						<input
							type="email"
							name="email"
							id="email"
							placeholder="Email"
							value={email}
							onChange={(e) => {
								setEmail(e?.target?.value);
							}}
						/>
					</div>

					<div>
						<input
							type="text"
							name="name"
							id="name"
							placeholder="Full Name"
							value={name}
							onChange={(e) => {
								setName(e?.target?.value);
							}}
						/>
					</div>

					<div>
						<input
							type="text"
							name="username"
							id="username"
							placeholder="Username"
							value={username}
							onChange={(e) => {
								setUsername(e?.target?.value);
							}}
						/>
					</div>

					<div>
						<input
							type="password"
							name="password"
							placeholder="Password"
							autoComplete="off"
							value={password}
							onChange={(e) => {
								setPassword(e?.target?.value);
							}}
						/>
					</div>

					<p className={(styles.signupPara, styles.para)}>
						People who use our service may have uploaded <br />
						your contact information to Instagram.{" "}
						<span className={styles.link}>
							Learn <br /> More
						</span>
					</p>

					<p className={(styles.signupPara, styles.para)}>
						By signing up, you agree to our{" "}
						<span className={styles.link}>
							Terms , Privacy <br /> Policy
						</span>{" "}
						and <span className={styles.link}>Cookies Policy </span>.
					</p>

					<input
						type="submit"
						id="submit-btn"
						className={styles.submitBtn}
						value="SIGN UP"
					/>
				</div>

				<div className={styles.form2}>
					Have an account?{" "}
					<span
						className={styles.link}
						onClick={() => {
							_redirectTo("/");
						}}>
						Sign In
					</span>
				</div>
			</form>
		</div>
	);
};

export default SignUp;
