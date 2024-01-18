import styles from "./Card.module.css";
import Icon from "../../assets/lcon.svg";
import MoodEmoji from "../../assets/MoodEmoji.svg";
import ProfilePic from "../../assets/dummyProfilePic.jpg";
import Like from "../../assets/like.png";

const Card = ({ post, userData, handleLike, handleUnlike }) => {
	const _handleLike = (postId) => {
		handleLike(postId);
	};

	const _handleUnlike = (postId) => {
		handleUnlike(postId);
	};

	const _hasUserLikedPost = (likesArr) => {
		const hasUserLikedPost = likesArr?.find((each) => each === userData?._id);

		return hasUserLikedPost ? true : false;
	};

	return (
		<div className={styles.card}>
			<div className={styles.cardHeader}>
				<div className={styles.cardProfileImage}>
					<img src={ProfilePic} alt="profile" height={50} width={50} />
				</div>
				<h5>{post?.postedBy?.fullName}</h5>
			</div>

			<div className={styles.cardImage}>
				<div>
					<img src={post?.images} alt="postImage" height={300} />
				</div>
			</div>

			<div className={styles.cardContent}>
				<div className={styles.reactionContent}>
					<div className={styles.likeContent}>
						{_hasUserLikedPost(post?.likes) ? (
							<span
								className={styles.liked}
								onClick={() => {
									_handleUnlike(post?._id);
								}}>
								<img src={Like} alt="like" />
							</span>
						) : (
							<span
								className={styles.like}
								onClick={() => {
									_handleLike(post?._id);
								}}>
								<img src={Icon} alt="like" width={35} height={35} />
							</span>
						)}
						<p>{post?.likes.length} Like</p>
					</div>
				</div>
				<p className={styles.caption}>{post?.caption}</p>
			</div>

			<div className={styles.addComment}>
				<span>
					<img src={MoodEmoji} alt="emoji" width={30} height={30} />
				</span>
				<input type="text" placeholder="Add a comment" />
				<button className={styles.comment}>POST</button>
			</div>
		</div>
	);
};

export default Card;
