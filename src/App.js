import "./App.css";
import { Route, Routes } from "react-router-dom";
import HomePage from "./components/HomePage/HomePage";
import SignIn from "./components/SignIn/SignIn.jsx";
import SignUp from "./components/SignUp/SignUp.jsx";
import Profile from "./components/Profile/Profile";
import Header from "./components/Header/Header.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CreatePost from "./components/CreatePost/CreatePost.jsx";

function App() {
	return (
		<div className="App">
			<Header />

			<Routes>
				<Route path="/" element={<SignIn />} />
				<Route path="/auth/signup" element={<SignUp />} />

				<Route path="/home" element={<HomePage />} />
				<Route path="/profile" element={<Profile />} />
				<Route path="/user/post" element={<CreatePost />} />

				<Route path="/*" element={<SignIn />} />
			</Routes>
			<ToastContainer />
		</div>
	);
}

export default App;
