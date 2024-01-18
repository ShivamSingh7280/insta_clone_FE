import React, { useContext, useEffect, useState } from "react";
import styles from "./Profile.module.css";
import { API } from "../../config/Api";
import { InstaCloneContext } from "../../context/InstaCloneContext";

const Profile = () => {
	const { userData } = useContext(InstaCloneContext);

	const [myAllPosts, setMyAllPosts] = useState([]);

	const _fetchMyAllPosts = async () => {
		try {
			const response = await fetch(`${API}/user/myposts`, {
				headers: {
					Authorization: "Bearer " + userData?.token,
				},
			});

			const posts = await response.json();

			setMyAllPosts(posts?.length ? posts : []);
		} catch (error) {
			console.log(`Error found in _fetchMyAllPosts ${error}`);
		}
	};

	useEffect(() => {
		_fetchMyAllPosts();
		// eslint-disable-next-line react-hooks/exhaustive-deps
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
					<h1>{userData?.fullName}</h1>

					<span className={styles.profileInfo}>
						<span>{myAllPosts?.length} Posts</span>
						<span>0 Followers</span>
						<span>0 Following</span>
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
