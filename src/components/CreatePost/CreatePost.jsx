import React, { useContext, useState } from "react";
import styles from "./CreatePost.module.css";
import AltImage from "../../assets/altImage.svg";
import { notifyError, notifySuccess, notifyWarn } from "../../config";
import { API } from "../../config/Api";
import { useNavigate } from "react-router-dom";
import { InstaCloneContext } from "../../context/InstaCloneContext";

const CreatePost = () => {
	const { userData } = useContext(InstaCloneContext);

	const [selectedImages, setSelectedImages] = useState([]);
	const [caption, setCaption] = useState("");

	const navigate = useNavigate();

	const _postImageToCloudinary = async () => {
		try {
			const data = new FormData();

			// Use map instead of forEach to create a new array
			selectedImages.forEach((image, index) => {
				// Append each image with a unique key to the FormData
				data.append("file", image);
			});

			data.append("upload_preset", "insta-clone2808");
			data.append("cloud_name", "instagramclone2808");

			const response = await fetch(
				"https://api.cloudinary.com/v1_1/instagramclone2808/image/upload",
				{
					method: "POST",
					body: data,
				}
			);

			const cloudinaryData = await response.json();
			const url = cloudinaryData?.url;
			return url;
		} catch (error) {
			console.error("Error posting image to Cloudinary:", error);
			notifyError("Error posting image to Cloudinary");
		}
	};

	const _handleSharePost = async () => {
		if (!caption || !selectedImages.length > 0) {
			notifyError("Please add all the required fields");
			return;
		}

		if (selectedImages.length > 1) {
			notifyWarn("Please add only 1 image for the post");
			return;
		}

		const cloudinaryURL = await _postImageToCloudinary();

		try {
			const response = await fetch(`${API}/user/post`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: "Bearer " + userData?.token,
				},
				body: JSON.stringify({
					caption: caption,
					images: cloudinaryURL,
				}),
			});

			const data = await response.json();
			const { message } = data;

			if (response.ok) {
				notifySuccess(message);
				navigate("/home");
			}
		} catch (error) {
			console.log("Error found in _handleSharePost", error);
		}
	};

	const _handleImageChange = (e) => {
		const files = e?.target?.files;

		if (files && files.length > 0) {
			const imagesArray = Array.from(files);
			setSelectedImages(imagesArray);
		}
	};

	return (
		<div className={styles.createPost}>
			<div className={styles.postHeader}>
				<h4>Create New Post</h4>
				<button onClick={_handleSharePost}>Share</button>
			</div>

			<div className={styles.mainContent}>
				<input
					type="file"
					accept="image/*"
					multiple
					onChange={_handleImageChange}
				/>

				<button
					className={styles.clearBtn}
					onClick={() => {
						setSelectedImages([]);
						setCaption("");
					}}>
					clear
				</button>
			</div>

			<div className={styles.details}>
				<div className={styles.cardHeader}>
					<div className={styles.cardPic}>
						{selectedImages.length > 0 ? (
							selectedImages.map((image, index) => (
								<img
									src={URL.createObjectURL(image)}
									alt={`previewImage-${index}`}
									height={300}
									key={index}
								/>
							))
						) : (
							<img src={AltImage} alt="noImageSelected" height={300} />
						)}
					</div>
					<div className={styles.cardImage}>
						<img
							src="https://images.unsplash.com/photo-1528979684622-edd7f8ce4156?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
							alt="profilePic"
							width={40}
							height={40}
						/>
						<h5>Shivam Singh</h5>
					</div>
				</div>

				<textarea
					type="text"
					value={caption}
					onChange={(e) => {
						setCaption(e?.target?.value);
					}}
					placeholder="Write a caption"></textarea>
			</div>
		</div>
	);
};

export default CreatePost;
