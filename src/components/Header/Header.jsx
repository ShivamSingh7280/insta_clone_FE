import styles from "./Header.module.css";
import logo from "../../assets/logo.png";
import { notifySuccess } from "../../config";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { InstaCloneContext } from "../../context/InstaCloneContext";

function Header() {
	const { userData, clearUserData } = useContext(InstaCloneContext);

	const navigate = useNavigate();

	const _redirectTo = (param) => {
		navigate(param);
	};

	const _handleSignOut = () => {
		localStorage.removeItem("userData");
		clearUserData();
		notifySuccess("Signed OUT Successfully");
		navigate("/");
	};

	return (
		<div className={styles.header}>
			<img
				src={logo}
				alt="instagram-logo"
				className={styles.logo}
				onClick={() =>
					userData?.token ? _redirectTo("/home") : _redirectTo("/")
				}
			/>

			<ul className={styles.menu}>
				{userData?.token ? (
					<>
						<li onClick={() => _redirectTo("/home")}>HOME</li>
						<li onClick={() => _redirectTo("/profile")}>PROFILE</li>
						<li onClick={() => _redirectTo("/user/post")}>CREATE POST</li>
						<li onClick={() => _handleSignOut()}>SIGN OUT</li>
					</>
				) : (
					<>
						<li onClick={() => _redirectTo("/auth/signup")}>SIGN UP</li>
						<li onClick={() => _redirectTo("/auth/signin")}>SIGN IN</li>
					</>
				)}
			</ul>
		</div>
	);
}

export default Header;
