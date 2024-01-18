import React, { useEffect, useState } from "react";
import Card from "../Card/Card";
import { API } from "../../config/Api";

const HomePage = () => {
	const [allPosts, setAllPosts] = useState([]);

	const _fetchAllPosts = async () => {
		try {
			const token = localStorage.getItem("jwt");

			const response = await fetch(`${API}/user/allpost`, {
				headers: {
					Authorization: "Bearer " + token,
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
			const token = localStorage.getItem("jwt");

			const response = await fetch(`${API}/user/like`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
					Authorization: "Bearer " + token,
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
				console.error("Error liking post:", result.error);
				// Handle error as needed
			}
		} catch (error) {
			console.error("Error in _handleLike:", error);
			// Handle error as needed
		}
	};

	const _handleUnlike = async (id) => {
		try {
			const token = localStorage.getItem("jwt");

			const response = await fetch(`${API}/user/unlike`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
					Authorization: "Bearer " + token,
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
				// Handle error as needed
			}
		} catch (error) {
			console.error("Error in _handleUnlike:", error);
			// Handle error as needed
		}
	};

	useEffect(() => {
		_fetchAllPosts();
	}, []);

	return (
		<div>
			{allPosts.map((post, index) => (
				<Card
					key={index}
					caption={post?.caption}
					image={post?.images}
					name={post?.postedBy?.fullName}
					id={post?._id}
					handleLike={() => {
						_handleLike(post?._id);
					}}
					handleUnlike={() => {
						_handleUnlike(post?._id);
					}}
					like={post?.likes}
				/>
			))}
		</div>
	);
};

export default HomePage;
