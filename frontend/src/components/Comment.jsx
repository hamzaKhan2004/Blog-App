import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import { FaThumbsUp } from "react-icons/fa";
import { useSelector } from "react-redux";

const Comment = ({ comment, onLike }) => {
  const [user, setUser] = useState(null); // changed to null to avoid default empty object
  const [loading, setLoading] = useState(true); // new loading state
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await fetch(`/api/user/${comment.userId}`);
        const data = await res.json();
        if (res.ok) {
          setUser(data);
        }
      } catch (error) {
        console.log(error.message);
      } finally {
        setLoading(false); // Set loading false once data is fetched
      }
    };
    getUser();
  }, [comment]);

  // Check for `comment.likes` being an array
  const likes = Array.isArray(comment.likes) ? comment.likes : [];

  return (
    <div className="flex p-4 border-b dark:border-gray-600 text-sm">
      <div className="flex-shrink-0 mr-3">
        <img
          className="w-10 h-10 rounded-full bg-gray-200"
          src={user?.profilePicture || "default-profile-pic.jpg"} // fallback to default picture
          alt={user?.username || "anonymous"}
        />
      </div>
      <div className="flex-1">
        <div className=" flex items-center mb-1">
          <span className="font-bold mr-1 text-xs truncate">
            {user ? `@${user.username}` : "anonymous user"}
          </span>
          <span className="text-gray-500 text-xs">
            {moment(comment.createdAt).fromNow()}
          </span>
        </div>
        <p className="text-gray-500 pb-2">{comment.content}</p>
        {loading ? ( // Loading state for the user info
          <p>Loading user...</p>
        ) : (
          <div className="flex items-center pt-2 text-xs gap-2 border-t dark:border-gray-700 max-w-fit">
            <button
              type="button"
              onClick={() => onLike(comment._id)}
              className={`hover:text-blue-500 ${
                currentUser &&
                likes.includes(currentUser._id) &&
                "!text-blue-500"
              }`}
            >
              <FaThumbsUp className="text-sm" />
            </button>

            <p className="text-gray-400">
              {comment.numberOfLikes > 0 &&
                comment.numberOfLikes +
                  " " +
                  (comment.numberOfLikes === 1 ? "like" : "likes")}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

Comment.propTypes = {
  comment: PropTypes.shape({
    userId: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    numberOfLikes: PropTypes.string.isRequired,
    _id: PropTypes.string.isRequired,
    likes: PropTypes.arrayOf(PropTypes.string), // PropType validation for likes
  }).isRequired,
  onLike: PropTypes.func.isRequired, // PropTypes for onLike
};

export default Comment;
