import styles from "./Card.module.css";
import Icon from "../../assets/lcon.svg";
import MoodEmoji from "../../assets/MoodEmoji.svg";
import ProfilePic from "../../assets/dummyProfilePic.jpg";
import Like from "../../assets/like.png";

const Card = ({ caption, image, name, id, handleLike, handleUnlike, like }) => {
	return (
		<div className={styles.card}>
			<div className={styles.cardHeader}>
				<div className={styles.cardProfileImage}>
					<img src={ProfilePic} alt="profile" height={50} width={50} />
				</div>
				<h5>{name}</h5>
			</div>

			<div className={styles.cardImage}>
				<div>
					<img src={image} alt="postImage" height={300} />
				</div>
			</div>

			<div className={styles.cardContent}>
				<div className={styles.reactionContent}>
					<div className={styles.likeContent}>
						{like?.length > 0 ? (
							<>
								<span
									className={styles.liked}
									onClick={() => {
										handleUnlike(id);
									}}>
									<img src={Like} alt="like" />
								</span>
								<p>{like.length} Like</p>
							</>
						) : (
							<>
								<span
									className={styles.like}
									onClick={() => {
										handleLike(id);
									}}>
									<img src={Icon} alt="like" width={35} height={35} />
								</span>
								<p>{like.length} Like</p>
							</>
						)}
					</div>
				</div>
				<p className={styles.caption}>{caption}</p>
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
