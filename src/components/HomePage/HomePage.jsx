import React, { useContext, useEffect, useState } from "react";
import Card from "../Card/Card";
import { API } from "../../config/Api";
import { InstaCloneContext } from "../../context/InstaCloneContext";

const HomePage = () => {
	const { userData } = useContext(InstaCloneContext);

	const [allPosts, setAllPosts] = useState([]);

	const _fetchAllPosts = async () => {
		try {
			const response = await fetch(`${API}/user/allpost`, {
				headers: {
					Authorization: "Bearer " + userData?.token,
				},
			});

			const posts = await response.json();
			setAllPosts(posts);
		} catch (error) {
			console.log(`Error found in _fetchAllPosts ${error}`);
		}
	};

	const _handleLike = async (id) => {
		try {
			console.log("id", id);
			const response = await fetch(`${API}/user/like`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
					Authorization: "Bearer " + userData?.token,
				},
				body: JSON.stringify({
					postId: id,
				}),
			});

			const result = await response.json();
			console.log("resutlttt", result);
			if (response.ok) {
				const newData = allPosts.map((posts) => {
					if (posts?._id === result?._id) {
						return result;
					} else {
						return posts;
					}
				});

				setAllPosts(newData);
			} else {
				console.error("Error liking post:", result.error);
			}
		} catch (error) {
			console.error("Error in _handleLike:", error);
		}
	};

	const _handleUnlike = async (id) => {
		try {
			const response = await fetch(`${API}/user/unlike`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
					Authorization: "Bearer " + userData?.token,
				},
				body: JSON.stringify({
					postId: id,
				}),
			});

			const result = await response.json();

			if (response.ok) {
				const newData = allPosts.map((posts) => {
					if (posts._id === result._id) {
						return result;
					} else {
						return posts;
					}
				});

				setAllPosts(newData);
			} else {
				console.error("Error unliking post:", result.error);
			}
		} catch (error) {
			console.error("Error in _handleUnlike:", error);
		}
	};

	useEffect(() => {
		_fetchAllPosts();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div>
			{allPosts.map((post) => (
				<Card
					key={post?._id}
					post={post}
					userData={userData}
					handleLike={_handleLike}
					handleUnlike={_handleUnlike}
				/>
			))}
		</div>
	);
};

export default HomePage;
