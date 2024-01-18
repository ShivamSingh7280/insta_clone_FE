import React, { useEffect, useState } from "react";
import styles from "./Profile.module.css";
import { API } from "../../config/Api";

const Profile = () => {
	const [myAllPosts, setMyAllPosts] = useState([]);
	const [name, setName] = useState("Instagram User");

	const _fetchMyAllPosts = async () => {
		try {
			const token = localStorage.getItem("jwt");

			const response = await fetch(`${API}/user/myposts`, {
				headers: {
					Authorization: "Bearer " + token,
				},
			});

			const posts = await response.json();

			if (response.ok) {
				setMyAllPosts(posts);
				setName(posts?.[0]?.postedBy?.fullName);
			} else {
				setMyAllPosts([]);
			}
		} catch (error) {
			console.log(`Error found in _fetchMyAllPosts ${error}`);
		}
	};

	useEffect(() => {
		_fetchMyAllPosts();
	}, []);

	return (
		<div className={styles.profile}>
			<div className={styles.profileFrame}>
				<div className={styles.profilePic}>
					<img
						src="https://images.unsplash.com/photo-1528979684622-edd7f8ce4156?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
						alt="profile"
					/>
				</div>
				<div className={styles.profileData}>
					<h1>{name}</h1>

					<span className={styles.profileInfo}>
						<span>81 Posts</span>
						<span>260 Followers</span>
						<span>40 Following</span>
					</span>
				</div>
			</div>

			<hr className={styles.line} />

			<div className={styles.gallery}>
				{myAllPosts.map((image, index) => (
					<img src={image?.images} alt="profile" key={index} />
				))}
			</div>
		</div>
	);
};

export default Profile;
